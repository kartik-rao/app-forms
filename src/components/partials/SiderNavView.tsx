import { Icon, Layout, Menu } from "antd";
import { useObserver, useLocalStore } from "mobx-react-lite";
import * as React from "react";
import { Link, RouteComponentProps, Redirect } from "react-router-dom";
import { appStoreContext } from '../../stores/AppStoreProvider';

export interface SiderNavViewProps {
    accountId: string;
}

export const SiderNavView : React.FC<RouteComponentProps<SiderNavViewProps>> = ({match, location, history}) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const parsePath = (pathname: string) => {
        // remove leading slash
        let path = pathname.substring(1);
        // remove trailing slash
        if(path.lastIndexOf("/") == path.length -1) {
            path = path.substring(0, path.length -1)
        }

        let segments = path.split("/");
        if(segments[0] == "account") {
            // In account pages
            // Account home page
            if (segments.length == 2) {
                return segments[0];
            } else if(segments.length == 3) {
                // entity index page
                let parts = path.match(/(account)\/([\w-]+)\/([\w]+)/)
                return parts[parts.length - 1];
            } else if(segments.length > 3){
                // entity etail page
                let parts = path.match(/(account)\/([\w-]+)\/([\w]+)\/([\w-]+)/)
                return parts[parts.length - 2];
            }
        } else {
            return segments[0];
        }
    }
    const localStore = useLocalStore(() => ({
        currentPath : location.pathname as string,
        get selectedPath() : string[] {
            let lastFragment = parsePath(this.currentPath);
            if(match.params.accountId) {
                lastFragment = `a-${lastFragment}`;
            }
            console.log("lastFragment", lastFragment);
            return [lastFragment];
        }
    }));

    history.listen((location) => {
        localStore.currentPath = location.pathname;
    });

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
            <Menu.Item key="profile">
                <Link to={`/profile/${store.auth.user.getUsername()}`}><Icon type="user" /><span>Profile</span></Link>
            </Menu.Item>
            <Menu.Item key="/logout">
                <a onClick={(e) => store.auth.signOut()}><Icon type="logout"/><span>Sign out</span></a>
            </Menu.Item>
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