import { Icon, Layout, Menu } from "antd";
import { useObserver, useLocalStore } from "mobx-react-lite";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { appStoreContext } from '../../stores/AppStoreProvider';

export interface SiderNavViewProps {
    accountId: string;
}

export const SiderNavView : React.FC<RouteComponentProps<SiderNavViewProps>> = ({match, location, history}) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        currentPath : location.pathname as string,
        get selectedPath() : string[] {
            let lastFragment = this.currentPath.substring(location.pathname.lastIndexOf("/") + 1);
            if (!lastFragment || lastFragment.length == 0) {
                lastFragment = "account";
            }

            if(match.params.accountId) {
                lastFragment = `a-${lastFragment}`;
            }
            return [lastFragment];
        }
    }));

    history.listen((location) => {
        localStore.currentPath = location.pathname;
    });
    console.log(match.params.accountId, store.auth.isAdmin)
    return useObserver(() => {
        return <Layout.Sider theme="light" trigger={null} collapsible collapsed={store.view.collapseAccountMenu}>
            <Menu mode="inline" selectedKeys={localStore.selectedPath}>
            {store.auth.isAdmin && <Menu.Item key="accounts">
                    <Link to="/accounts"><Icon type="book" /><span>All Accounts</span></Link>
                </Menu.Item>
            }
            {store.auth.isAdmin && <Menu.Item key="users">
                    <Link to="/users"><Icon type="team" /><span>All Users</span></Link>
                </Menu.Item>
            }
            {store.auth.isAdmin && !!match.params.accountId && <Menu.Divider key="admin-divider"/>}
            {match.params.accountId && <Menu.Item key="a-account" >
                <Link to={`/account/${match.params.accountId}/`}><Icon type="home"/><span>Account</span></Link>
            </Menu.Item>}
            {match.params.accountId && <Menu.Item  key="a-users">
                <Link to={`/account/${match.params.accountId}/users`}><Icon type="team"/><span>Users</span></Link>
            </Menu.Item>}
            {match.params.accountId && <Menu.Item key="a-forms">
                <Link to={`/account/${match.params.accountId}/forms`}><Icon type="file-text"/><span>Forms</span></Link>
            </Menu.Item>}
            {match.params.accountId && <Menu.Item key="a-admin">
                <Link to={`/account/${match.params.accountId}/admin`}><Icon type="tool"/><span>Admin</span></Link>
            </Menu.Item>}
            <Menu.Divider key="trigger-divider"/>
            <Menu.Item key="trigger" title="Toggle Expand">
                <Icon className="trigger"
                    type={store.view.inAccountMenuCollapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={()=>{store.view.toggleAccountMenu()}} />
            </Menu.Item>
        </Menu>
    </Layout.Sider>
    });
}