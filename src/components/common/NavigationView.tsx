import { Button, Icon, Menu, Spin } from 'antd';
import * as React from "react";
import { IRootStore } from '../../stores/RootStore';
import { observer } from 'mobx-react';

export interface IAppMenuProps {
    store: IRootStore;
}

@observer
export class AppMenu extends React.Component<IAppMenuProps, any> {
    props: IAppMenuProps;

    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render() {
        let {store} = this.props;
        let {viewStore, authStore} = store;
        let selected = viewStore.currentView ? [viewStore.currentView.name] : ["home"];

        return (
        <Menu selectedKeys={selected} mode="horizontal" theme="light">
            <Menu.Item disabled={true}><h2 style={{margin: 0, fontVariant: "tabular-nums"}}>Forms.li</h2></Menu.Item>
            <Menu.Item key="home" onClick={(e) => viewStore.showHome()}>
                <Icon type="home" />Home
            </Menu.Item>
            {authStore.user && authStore.group == 'Admin' && <Menu.Item key="accounts" onClick={(e) => viewStore.showAccounts()}>
                <Icon type="book" />Accounts
            </Menu.Item>}
            {authStore.user && authStore.group == 'Admin' && <Menu.Item key="users" onClick={(e) => viewStore.showUsers()}>
                <Icon type="team" />Users
            </Menu.Item>}
            <Menu.Item key="forms" onClick={(e) => viewStore.showForms()}>
                <Icon type="file-text" />Forms
            </Menu.Item>
            <Menu.Item key="canvas" onClick={(e) => viewStore.showCanvas()}>
                <Icon type="layout" />Canvas
            </Menu.Item>
            <Menu.Item key="admin" onClick={(e) => viewStore.showAdmin()}>
                <Icon type="setting" />Admin
            </Menu.Item>
            <Menu.Item disabled={true}>
                {store.isLoading == true && <span><span style={{marginRight: '8px'}}>Loading</span><Spin size="small"/></span>}
            </Menu.Item>
            <Menu.SubMenu title={authStore.user ? authStore.user.attributes.email : ""} style={{float:"right"}}>
                <Menu.Item key="profile">
                    <a onClick={(e) => viewStore.showProfile()}><Icon type="user"/> Profile</a>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={(e) => authStore.signOut()}><Icon type="logout"/> Sign out</a>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
        );
    }
}