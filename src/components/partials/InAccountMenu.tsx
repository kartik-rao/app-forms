import { Icon, Menu, Layout } from "antd";
import { useObserver } from "mobx-react-lite";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { appStoreContext } from '../../stores/AppStoreProvider';

export interface InAccountMenuViewProps {
    accountId: string;
}

export const InAccountMenuView : React.FC<RouteComponentProps<InAccountMenuViewProps>> = ({match, location}) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    let lastFragment = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
    return useObserver(() => {
        return <Layout.Sider theme="light" trigger={null} collapsible collapsed={store.view.collapseAccountMenu}>
            <Menu mode="inline" defaultSelectedKeys={['home']} selectedKeys={[lastFragment]}>
        <Menu.Item key="home">
            <Link to={`/account/${match.params.accountId}/`}><Icon type="home"/><span>Home</span></Link>
        </Menu.Item>
        <Menu.Item  key="users">
            <Link to={`/account/${match.params.accountId}/users`}><Icon type="team"/><span>Users</span></Link>
        </Menu.Item>
        <Menu.Item key="forms">
            <Link to={`/account/${match.params.accountId}/forms`}><Icon type="file-text"/><span>Forms</span></Link>
        </Menu.Item>
        <Menu.Item key="admin">
            <Link to={`/account/${match.params.accountId}/admin`}><Icon type="tool"/><span>Admin</span></Link>
        </Menu.Item>
        <Menu.Item key="trigger">
            <Icon className="trigger" title=""
                type={store.view.inAccountMenuCollapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={()=>{store.view.toggleAccountMenu()}} />
        </Menu.Item>
    </Menu>
    </Layout.Sider>
    });
}