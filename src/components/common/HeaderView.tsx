import { BrowserStorageCache as LocalCache } from "@aws-amplify/cache";
import { GetAccount, IGetAccountQuery } from "@kartikrao/lib-forms-api";
import { Logger } from "@kartikrao/lib-logging";
import { Menu } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { withGraphQl } from "../../ApiHelper";
import { appStoreContext } from "../../stores/AppStoreProvider";
import { ProgressView } from "./ProgressView";

const logger = Logger.getInstance(['HeaderView'], Logger.severity.info);

const Header : React.FC<RouteComponentProps<any>> = ({match, location, history}) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        loading: false as boolean,
        get accountId() : string {
            if(!store.auth.isAdmin) {
                return store.auth.attributes["custom:tenantId"];
            } else {
                let matches = store.view.currentPath.match(/account\/([\w|\-]+)/);
                if(matches && matches.length > 1) {
                    return matches[1];
                } else {
                    return null;
                }
            }
        },
    }));

    history.listen((location) => {
        store.view.currentPath = location.pathname;
    });

    React.useEffect(() => {
        let fetchAccount = async function() {
            localStore.loading = true;
            try {
                let account = LocalCache.getItem(localStore.accountId);
                if (!account) {
                    let accountResponse = await withGraphQl<IGetAccountQuery>(GetAccount, {accountId: localStore.accountId});
                    LocalCache.setItem(localStore.accountId, accountResponse.data.getAccount, {priority: 4});
                    account = accountResponse.data.getAccount;
                }
                store.view.idNameMap[localStore.accountId] = account.name;
            } catch (error) {
                logger.error(`Header.useEffect.getAccount(${localStore.accountId})`, error);
            }
            localStore.loading = false;
        }

        if(localStore.accountId) {
            fetchAccount();
        } else {
            store.view.idNameMap[localStore.accountId] = null;
        }
    }, [localStore.accountId]);

    return useObserver(() => {
        return <Menu mode="horizontal" theme="light">
            <Menu.Item key="formsli-brand" disabled={true}><h2 style={{margin: 0, fontVariant: "tabular-nums"}}>Forms.li</h2></Menu.Item>
            {!localStore.loading && <Menu.Item key="breadcrumb" disabled={true}>{!localStore.loading && <h4 style={{margin: 0, fontVariant: "tabular-nums"}}> {store.view.breadcrumb} </h4>}</Menu.Item>}
            <Menu.Item key="user-menu" style={{float:"right"}} disabled={true}>
                <h4 style={{margin: 0, fontVariant: "tabular-nums"}}> {store.auth.user && store.auth.attributes ? store.auth.attributes.email : ""} </h4>
            </Menu.Item>
            <span key="progressview" style={{float: "right"}}><ProgressView {...store.view.loading}/></span>
        </Menu>
    })
}

export default withRouter(Header);