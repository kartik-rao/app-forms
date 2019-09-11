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

const logger = Logger.getInstance(['HeaderView'], Logger.severity.info);

let withFirstUpper = function(str: string) : string {
    return str[0].toUpperCase() + str.substring(1);
}

const Header : React.FC<RouteComponentProps<any>> = (props) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        loading: false as boolean,
        account: null as any,
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
        currentPath : props.location.pathname,
        get breadcrumb() : string {
            let breadcrumb = this.currentPath;
            if (this.accountId) {
                if (this.account) {
                    breadcrumb = breadcrumb.replace("/account/","");
                    breadcrumb = breadcrumb.replace(/\//g, " / ");
                    return breadcrumb.replace(this.accountId, this.account.name);
                } else {
                    // When this is called on first load before fetch as run
                    return "";
                }
            } else {
                return `All ${breadcrumb.replace("/", "")}`;
            }
        }
    }));

    props.history.listen((location) => {
        localStore.currentPath = location.pathname;
    });

    React.useEffect(() => {
        let fetch = async function() {
            localStore.loading = true;
            try {
                let account: any = await API.graphql(graphqlOperation(queries.getAccount, {accountId: localStore.accountId}));
                localStore.account = account.data.getAccount;
            } catch (error) {
                logger.error(`Header.useEffect.getAccount(${localStore.accountId})`, error);
            }
            localStore.loading = false;
        }

        if(localStore.accountId) {
            fetch();
        } else {
            localStore.account = null;
        }
    }, [localStore.accountId]);

    return useObserver(() => {
        return <Menu mode="horizontal" theme="light">
            <Menu.Item key="formsli-brand" disabled={true}><h2 style={{margin: 0, fontVariant: "tabular-nums"}}>Forms.li</h2></Menu.Item>
            <Menu.Item key="breadcrumb" disabled={true}>{!localStore.loading && <h4 style={{margin: 0, fontVariant: "tabular-nums"}}> {localStore.breadcrumb} </h4>}</Menu.Item>
            <Menu.SubMenu key="user-menu" title={store.auth.user && store.auth.attributes ? store.auth.attributes.email : ""} style={{float:"right"}}>
                <Menu.Item key="/profile">
                    <Link to="/profile"><Icon type="user" />Profile</Link>
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