import { Button, Icon, Menu } from 'antd';
import * as React from "react";
import { IRootStore } from '../../stores/RootStore';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export interface IAppMenuProps {
    store: IRootStore;
}

export class AppMenu extends React.Component<IAppMenuProps, any> {
    props: IAppMenuProps;
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    state = {
        current: 'mail',
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }

    logout() {
        this.props.store.authStore.signOut();
    }

    render() {
        let {viewStore} = this.props.store;
        return (
        <Menu selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item key="accounts" onClick={(e) => viewStore.showAccounts()}>
                <Icon type="book" />Accounts
            </Menu.Item>
            <Menu.Item key="users" onClick={(e) => viewStore.showUsers()}>
                <Icon type="team" />Users
            </Menu.Item>
            <Menu.Item key="forms" onClick={(e) => viewStore.showForms()}>
                <Icon type="file-text" />Forms
            </Menu.Item>
            <Menu.Item key="admin" onClick={(e) => viewStore.showAdmin()}>
                <Icon type="setting" />Admin
            </Menu.Item>
            <Menu.Item key="profile" onClick={(e) => viewStore.showProfile()}>
                <Icon type="user" />Profile
            </Menu.Item>
            <Menu.Item key="logout">
                <Button onClick={(e) => this.logout()} type="primary" icon="logout">Sign Out</Button>
            </Menu.Item>
        </Menu>
        );
    }
}