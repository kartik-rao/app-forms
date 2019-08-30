var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import 'airbnb-browser-shims';
import './app.css';
import { Layout, Row, Col } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { Authenticator, Greetings } from 'aws-amplify-react';
import { MainView } from "./components/partials/MainView";
const signUpConfig = {
    hideAllDefaults: true,
    defaultCountryCode: 61,
    signUpFields: [
        {
            label: 'First Name',
            key: 'given_name',
            required: true,
            placeholder: 'First Name',
            type: 'string',
            displayOrder: 1,
        },
        {
            label: 'Last Name',
            key: 'family_name',
            required: true,
            placeholder: 'Last Name',
            type: 'string',
            displayOrder: 2,
        },
        {
            label: 'Phone Number',
            key: 'phone_number',
            required: false,
            placeholder: 'Phone Number',
            type: 'phone_number',
            displayOrder: 3,
        },
        {
            label: 'Email',
            key: 'username',
            required: true,
            placeholder: 'Email',
            type: 'email',
            displayOrder: 4,
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            placeholder: 'Password',
            type: 'password',
            displayOrder: 5,
        },
        {
            label: 'Account Name',
            key: 'tenantName',
            required: true,
            placeholder: 'Account Name',
            type: 'string',
            displayOrder: 6,
            custom: true
        }
    ],
};
let App = class App extends React.Component {
    constructor(props) {
        super(props);
        this._validAuthStates = ['signedIn'];
        this.props = props;
        props.store.authStore.setAuthData(this.props.authData);
    }
    showComponent(theme) {
        return;
    }
    render() {
        return React.createElement(Layout, { className: "fl-layout" },
            React.createElement(Row, { type: "flex", justify: "center", align: "top" },
                React.createElement(Col, { span: 24 },
                    React.createElement(Authenticator, { hide: [Greetings], signUpConfig: signUpConfig }, this.props.store.authStore.authState == 'signedIn' &&
                        React.createElement(MainView, { store: this.props.store })))));
    }
};
App = __decorate([
    observer
], App);
export { App };
//# sourceMappingURL=App.js.map