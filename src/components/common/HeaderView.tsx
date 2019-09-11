import * as React from "react";
import {Logger} from "@kartikrao/lib-logging";
import {NavigationView} from "./NavigationView";
import { appStoreContext } from "../../stores/AppStoreProvider";
import { useObserver, useLocalStore } from "mobx-react-lite";
import { withRouter, RouteComponentProps } from "react-router";
import API, { graphqlOperation } from "@aws-amplify/api";
import * as queries from '../../graphql/queries';
import { toJS } from "mobx";
import { Breadcrumb, Menu, Icon, Tag } from "antd";
import { Link } from "react-router-dom";
import { ProgressView } from "../partials/ProgressView";


const logger = Logger.getInstance(['HeaderView'], Logger.severity.info);

let withFirstUpper = function(str: string) : string {
    return str[0].toUpperCase() + str.substring(1);
}
const Header : React.FC<RouteComponentProps<any>> = (props) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        currentPath : props.location.pathname,
        loading: true as boolean,
        account: {} as any,
        get currentContext() : string {
            let context = this.currentPath;
            context = context.replace(/\//g, " / ");
            if (store.view.userContextId) {
                return context.replace(store.view.userContextId, this.account.name);
            } else {
                return context;
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
                let account: any = await API.graphql(graphqlOperation(queries.getAccount, {accountId: store.view.userContextId}));
                store.view.userContextData = account.data.getAccount;
                localStore.account = account.data.getAccount;
            } catch (error) {
                logger.error(`Header.useEffect.getAccount(${store.view.userContextId})`, error);
            }
            localStore.loading = false;
        }

        let contextId;
        if(!store.auth.isAdmin) {
            contextId = store.auth.tenant;
        } else {
            let matches = props.location.pathname.match(/account\/(.+)\//);
            if(matches && matches.length > 1) {
                contextId = matches[1];
            }
        }
        if(contextId && (contextId != store.view.userContextId || !store.view.userContextData)) {
            store.view.userContextId = contextId;
            fetch();
        } else {
            store.view.userContextId = null;
            store.view.userContextData = null;
        }
    }, []);

    return useObserver(() => {
        return <><Menu mode="horizontal" theme="light">
            <Menu.Item key="formsli-brand" disabled={true}><h2 style={{margin: 0, fontVariant: "tabular-nums"}}>Forms.li</h2></Menu.Item>
            {!localStore.loading && <Menu.Item key="user-context" disabled={true}><h4 style={{margin: 0, fontVariant: "tabular-nums"}}> {localStore.currentContext} </h4></Menu.Item>}
            <Menu.SubMenu key="usersubmenu" title={store.auth.user && store.auth.attributes ? store.auth.attributes.email : ""} style={{float:"right"}}>
                <Menu.Item key="/profile">
                    <Link to="/profile"><Icon type="user" />Profile</Link>
                </Menu.Item>
                <Menu.Item key="/logout">
                    <a onClick={(e) => store.auth.signOut()}><Icon type="logout"/> Sign out</a>
                </Menu.Item>
            </Menu.SubMenu>
            <span key="progressview" style={{float: "right"}}><ProgressView {...store.view.loading}/></span>
        </Menu>

        </>
    })
}

export default withRouter(Header);