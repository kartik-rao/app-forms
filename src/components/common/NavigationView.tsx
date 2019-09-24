import { GetAccount, IGetAccountQuery } from "@kartikrao/lib-forms-api";
import { Icon, Menu, Tag } from 'antd';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { withGraphQl } from "../../ApiHelper";
import { appStoreContext } from '../../stores/AppStoreProvider';
import { ProgressView } from '../partials/ProgressView';

export const NavigationView: React.FC<RouteComponentProps<any>> = ({history, match, location}) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const path = location.pathname;

    const localStore = useLocalStore(() => ({
        account: null as any,
        get accountId() : string {
            let matches = path.match(/account\/(.+)\/.+/);
            let accountId = matches && matches.length > 1 ? matches[1] : null;
            return accountId;
        },
        get selected() : string[] {
            let selected;
            if(path.indexOf("forms") > -1) {
                selected = "/form"
            } else if (path.indexOf("user") > -1) {
                selected = "/users"
            } else if (path.indexOf("/account/") > -1) {
                selected = "/accounts"
            } else if (path.indexOf("/admin") > -1) {
                selected = "/admin"
            } else if (path.indexOf("/profile") > -1) {
                selected = "/profile"
            } else {
                selected = "/home"
            }
            return [selected];
        }
    }));

    let fetch = async function(accountId: string) {
        try {
            let account: any = await withGraphQl<IGetAccountQuery>(GetAccount, {accountId: accountId});
            localStore.account = account.data.getAccount;
        } catch (error) {
            localStore.account = null;
        }
    };

    React.useEffect(() => {
        if(localStore.accountId) {
            fetch(localStore.accountId);
        }
    }, []);

    return useObserver(() => {
        return store.auth.user && <Menu selectedKeys={localStore.selected} mode="horizontal" theme="light">
        <Menu.Item key="formsli-brand" disabled={true}><h2 style={{margin: 0, fontVariant: "tabular-nums"}}>Forms.li</h2></Menu.Item>
        <Menu.Item key="/home">
            <Link to="/"><Icon type="home" />Home</Link>
        </Menu.Item>
        { store.auth.group == 'Admin' &&
            <Menu.Item key="/accounts">
                <Link to="/accounts"><Icon type="book" />Accounts</Link>
            </Menu.Item>
        }
        { (store.auth.group == 'Admin' || store.auth.group == 'AccountAdmin') &&
            <Menu.Item key="/users">
                <Link to="/users"><Icon type="team" />Users</Link>
            </Menu.Item>
        }
        <Menu.Item key="/admin">
            <Link to="/admin"><Icon type="setting" />Admin</Link>
        </Menu.Item>
        <Menu.SubMenu key="usersubmenu" title={store.auth.user && store.auth.attributes ? store.auth.attributes.email : ""} style={{float:"right"}}>
            <Menu.Item key="/profile">
                <Link to="/profile"><Icon type="user" />Profile</Link>
            </Menu.Item>
            <Menu.Item key="/logout">
                <a onClick={(e) => store.auth.signOut()}><Icon type="logout"/> Sign out</a>
            </Menu.Item>
        </Menu.SubMenu>
        {localStore.account && <Menu.Item key="accountname" disabled={true}>
            <Tag color="geekblue">{localStore.account.name}</Tag>
        </Menu.Item>}
        <span key="progressview" style={{float: "right"}}><ProgressView {...store.view.loading}/></span>
    </Menu>
    })
}