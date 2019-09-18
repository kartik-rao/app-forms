import API, { graphqlOperation } from "@aws-amplify/api";
import { Logger } from "@kartikrao/lib-logging";
import { Icon, Menu } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";
import { ProgressView } from "../partials/ProgressView";
import { toJS } from "mobx";

const logger = Logger.getInstance(['HeaderView'], Logger.severity.info);

let withFirstUpper = function(str: string) : string {
    return str[0].toUpperCase() + str.substring(1);
}

const Header : React.FC<RouteComponentProps<any>> = ({match, location, history}) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        loading: false as boolean,
        account: null as any,
        form: null as any,
        user: null as any,
        get accountId() : string {
            if(!store.auth.isAdmin) {
                return store.auth.tenant;
            } else {
                let matches = localStore.currentPath.match(/account\/([\w|\-]+)/);
                if(matches && matches.length > 1) {
                    return matches[1];
                } else {
                    return null;
                }
            }
        },
        get userId() : string {
            let matches = localStore.currentPath.match(/profile\/([\w|\-]+)/);
            if(matches && matches.length > 1) {
                return matches[1];
            } else {
                return null;
            }
        },
        get formId() : string {
            let matches = localStore.currentPath.match(/form\/([\w|\-]+)/);
            if(matches && matches.length > 1) {
                return matches[1];
            } else {
                return null;
            }
        },
        currentPath : location.pathname,
        get breadcrumb() : string {
            let breadcrumb = this.currentPath;
            if (this.accountId) {
                if (this.account) {
                    breadcrumb = breadcrumb.replace("/account/","");
                    breadcrumb = breadcrumb.replace(/\//g, " / ");
                    breadcrumb = breadcrumb.replace(this.accountId, this.account.name);
                    if(this.formId && this.form) {
                        breadcrumb = breadcrumb.replace(this.formId, this.form.name);
                    }
                    return breadcrumb;
                } else {
                    // When this is called on first load before fetch as run
                    return "";
                }
            } else {
                if(this.userId && this.user) {
                    breadcrumb = breadcrumb.replace(this.userId, `${this.user.given_name} ${this.user.family_name}`);
                }
                return this.currentPath.indexOf('profile') == -1 ? `All ${breadcrumb.replace("/", "")}` : breadcrumb.replace("/ profile", "Profile");
            }
        }
    }));

    history.listen((location) => {
        localStore.currentPath = location.pathname;
    });

    React.useEffect(() => {
        let fetchAccount = async function() {
            localStore.loading = true;
            try {
                let account: any = await API.graphql(graphqlOperation(queries.getAccount, {accountId: localStore.accountId}));
                localStore.account = account.data.getAccount;
            } catch (error) {
                logger.error(`Header.useEffect.getAccount(${localStore.accountId})`, error);
            }
            localStore.loading = false;
        }

        let fetchForm = async function() {
            localStore.loading = true;
            try {
                let form: any = await API.graphql(graphqlOperation(queries.getForm, {formId: localStore.formId}));
                localStore.form = form.data.getForm;
            } catch (error) {
                logger.error(`Header.useEffect.getForm(${localStore.formId})`, error);
            }
            localStore.loading = false;
        }

        let fetchUser = async function() {
            localStore.loading = true;
            try {
                let user: any = await API.graphql(graphqlOperation(queries.getUser, {userId: localStore.userId}));
                localStore.user = user.data.getUser;
            } catch (error) {
                logger.error(`Header.useEffect.getUser(${localStore.userId})`, error);
            }
            localStore.loading = false;
        }
        if(localStore.userId) {
            fetchUser();
        } else {
            localStore.user = null;
        }
        if(localStore.accountId) {
            fetchAccount();
        } else {
            localStore.account = null;
        }
        if(localStore.formId) {
            fetchForm();
        } else {
            localStore.form = null;
        }
    }, [localStore.accountId, localStore.formId, localStore.userId]);

    return useObserver(() => {
        return <Menu mode="horizontal" theme="light">
            <Menu.Item key="formsli-brand" disabled={true}><h2 style={{margin: 0, fontVariant: "tabular-nums"}}>Forms.li</h2></Menu.Item>
            <Menu.Item key="breadcrumb" disabled={true}>{!localStore.loading && <h4 style={{margin: 0, fontVariant: "tabular-nums"}}> {localStore.breadcrumb} </h4>}</Menu.Item>
            <Menu.SubMenu key="user-menu" title={store.auth.user && store.auth.attributes ? store.auth.attributes.email : ""} style={{float:"right"}}>
                <Menu.Item key="/profile">
                    <Link to={`/profile/${store.auth.user.getUsername()}`}><Icon type="user" />Profile</Link>
                </Menu.Item>
                <Menu.Item key="/logout">
                    <a onClick={(e) => store.auth.signOut()}><Icon type="logout"/> Sign out</a>
                </Menu.Item>
            </Menu.SubMenu>
            <span key="progressview" style={{float: "right"}}><ProgressView {...store.view.loading}/></span>
        </Menu>
    })
}

export default withRouter(Header);