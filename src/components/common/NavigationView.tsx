import { Icon, Menu, Spin, Button } from 'antd';
import { useObserver } from 'mobx-react';
import * as React from "react";
import { Views } from "../../RouteNames";
import { appStoreContext } from '../../stores/AppStoreProvider';
import AccountList from '../partials/AccountList';
import { Link, RouteComponentProps } from "react-router-dom";
import {withRouter} from 'react-router-dom';

export const NavigationView: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const selected = [props.location.pathname];

    return useObserver(() => {
        return store.auth.user && <Menu selectedKeys={selected} mode="horizontal" theme="light">
        <Menu.Item disabled={true}><h2 style={{margin: 0, fontVariant: "tabular-nums"}}>Forms.li</h2></Menu.Item>
        <Menu.Item key="/">
            <Link to="/"><Icon type="home" />Home</Link>
        </Menu.Item>
        <Menu.Item key="/forms">
            <Link to="/forms"><Icon type="file-text" />Forms</Link>
        </Menu.Item>
        <Menu.Item key="/canvas">
            <Link to="/canvas/:mode/:formId"><Icon type="layout" />Canvas</Link>
        </Menu.Item>
        <Menu.Item key="/admin">
            <Link to="/admin"><Icon type="setting" />Admin</Link>
        </Menu.Item>
        { store.auth.group == 'Admin' &&
            <Menu.Item key="/accounts">
                <Link to="/accounts"><Icon type="book" />Accounts</Link>
            </Menu.Item>}
        { store.auth.group == 'Admin' &&
            <Menu.Item key="/users">
                <Link to="/users"><Icon type="team" />Users</Link>
            </Menu.Item>
        }
        <Menu.Item disabled={true} style={{verticalAlign: "middle"}}>
            <AccountList/>
        </Menu.Item>
        <Menu.SubMenu title={store.auth.user && store.auth.attributes ? store.auth.attributes.email : ""} style={{float:"right"}}>
            <Menu.Item key="/profile">
                <Link to="/profile"><Icon type="user" />Profile</Link>
            </Menu.Item>
            <Menu.Item key="/logout">
                <a onClick={(e) => store.auth.signOut()}><Icon type="logout"/> Sign out</a>
            </Menu.Item>
        </Menu.SubMenu>
    </Menu>
    })
}

export default withRouter(NavigationView);