var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Icon, Menu, Spin } from 'antd';
import * as React from "react";
import { observer } from 'mobx-react';
let AppMenu = class AppMenu extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        let { store } = this.props;
        let { viewStore, authStore } = store;
        let selected = viewStore.currentView ? [viewStore.currentView.name] : ["home"];
        return (React.createElement(Menu, { selectedKeys: selected, mode: "horizontal", theme: "light" },
            React.createElement(Menu.Item, { disabled: true },
                React.createElement("h2", { style: { margin: 0, fontVariant: "tabular-nums" } }, "Forms.li")),
            React.createElement(Menu.Item, { key: "home", onClick: (e) => viewStore.showHome() },
                React.createElement(Icon, { type: "home" }),
                "Home"),
            authStore.user && authStore.group == 'Admin' && React.createElement(Menu.Item, { key: "accounts", onClick: (e) => viewStore.showAccounts() },
                React.createElement(Icon, { type: "book" }),
                "Accounts"),
            authStore.user && authStore.group == 'Admin' && React.createElement(Menu.Item, { key: "users", onClick: (e) => viewStore.showUsers() },
                React.createElement(Icon, { type: "team" }),
                "Users"),
            React.createElement(Menu.Item, { key: "forms", onClick: (e) => viewStore.showForms() },
                React.createElement(Icon, { type: "file-text" }),
                "Forms"),
            React.createElement(Menu.Item, { key: "canvas", onClick: (e) => viewStore.showCanvas() },
                React.createElement(Icon, { type: "layout" }),
                "Canvas"),
            React.createElement(Menu.Item, { key: "admin", onClick: (e) => viewStore.showAdmin() },
                React.createElement(Icon, { type: "setting" }),
                "Admin"),
            React.createElement(Menu.Item, { disabled: true }, store.isLoading == true && React.createElement("span", null,
                React.createElement("span", { style: { marginRight: '8px' } }, "Loading"),
                React.createElement(Spin, { size: "small" }))),
            React.createElement(Menu.SubMenu, { title: authStore.user ? authStore.user.attributes.email : "", style: { float: "right" } },
                React.createElement(Menu.Item, { key: "profile" },
                    React.createElement("a", { onClick: (e) => viewStore.showProfile() },
                        React.createElement(Icon, { type: "user" }),
                        " Profile")),
                React.createElement(Menu.Item, { key: "logout" },
                    React.createElement("a", { onClick: (e) => authStore.signOut() },
                        React.createElement(Icon, { type: "logout" }),
                        " Sign out")))));
    }
};
AppMenu = __decorate([
    observer
], AppMenu);
export { AppMenu };
//# sourceMappingURL=NavigationView.js.map