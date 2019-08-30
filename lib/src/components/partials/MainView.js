var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observer } from 'mobx-react';
import * as React from 'react';
import { AccountsView } from "./AccountsView";
import { FormsView } from "./FormsView";
import { AdminView } from './AdminView';
import { AccountAdminView } from './AccountAdminView';
import { Layout } from 'antd';
import { Footer } from "../common/FooterView";
import { Header } from "../common/HeaderView";
import { Canvas } from "@kartikrao/lib-forms/lib/components/canvas/Canvas";
let MainView = class MainView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { viewStore } = this.props.store;
        const view = viewStore.currentView ? viewStore.currentView.name : "home";
        const { group } = this.props.store.authStore;
        const isAdmin = group == 'Admin';
        const isAccountAdmin = group == 'AccountAdmin';
        if (this.props.store.authStore.isSignedIn) {
            return React.createElement("div", null,
                React.createElement(Layout.Header, { className: "fl-header" },
                    React.createElement(Header, { store: this.props.store })),
                React.createElement(Layout.Content, { className: "fl-content" },
                    React.createElement("div", { className: "fl-main" },
                        view == 'canvas' && React.createElement(Canvas, { store: this.props.store.editorStore }),
                        view == 'accounts' && isAdmin && React.createElement(AccountsView, { store: this.props.store }),
                        view == 'forms' && React.createElement(FormsView, { store: this.props.store }),
                        view == 'admin' && isAdmin && React.createElement(AdminView, { store: this.props.store }),
                        view == 'admin' && isAccountAdmin && React.createElement(AccountAdminView, { store: this.props.store }))),
                React.createElement(Layout.Footer, { className: "fl-footer" },
                    React.createElement(Footer, { store: this.props.store })));
        }
        else {
            return React.createElement(React.Fragment, null);
        }
    }
};
MainView = __decorate([
    observer
], MainView);
export { MainView };
;
//# sourceMappingURL=MainView.js.map