import { Button, Icon, Menu, Spin } from 'antd';
import * as React from "react";
import { observer, useObserver } from 'mobx-react';
import { appStoreContext } from '../../stores/AppStoreProvider';

export const NavigationView: React.FC<any> = () => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    console.log("NavigationView");
    let selected = store.view.currentView ? [store.view.currentView.name] : ["home"];
    return useObserver(() => {
        return <Menu selectedKeys={selected} mode="horizontal" theme="light">
        <Menu.Item disabled={true}><h2 style={{margin: 0, fontVariant: "tabular-nums"}}>Forms.li</h2></Menu.Item>
        <Menu.Item key="home" onClick={(e) => store.view.showHome()}>
            <Icon type="home" />Home
        </Menu.Item>
        {store.auth.user && store.auth.group == 'Admin' && <Menu.Item key="accounts" onClick={(e) => store.view.showAccounts()}>
            <Icon type="book" />Accounts
        </Menu.Item>}
        {store.auth.user && store.auth.group == 'Admin' && <Menu.Item key="users" onClick={(e) => store.view.showUsers()}>
            <Icon type="team" />Users
        </Menu.Item>}
        <Menu.Item key="forms" onClick={(e) => store.view.showForms()}>
            <Icon type="file-text" />Forms
        </Menu.Item>
        <Menu.Item key="canvas" onClick={(e) => store.view.showCanvas()}>
            <Icon type="layout" />Canvas
        </Menu.Item>
        <Menu.Item key="admin" onClick={(e) => store.view.showAdmin()}>
            <Icon type="setting" />Admin
        </Menu.Item>
        <Menu.Item disabled={true}>
            {store.view.isLoading == true && <span><span style={{marginRight: '8px'}}>Loading</span><Spin size="small"/></span>}
        </Menu.Item>
        <Menu.SubMenu title={store.auth.user ? store.auth.user.attributes.email : ""} style={{float:"right"}}>
            <Menu.Item key="profile">
                <a onClick={(e) => store.view.showProfile()}><Icon type="user"/> Profile</a>
            </Menu.Item>
            <Menu.Item key="logout">
                <a onClick={(e) => store.auth.signOut()}><Icon type="logout"/> Sign out</a>
            </Menu.Item>
        </Menu.SubMenu>
    </Menu>
    })
}

