import { Col, Layout, Row } from "antd";
import Amplify from '@aws-amplify/core';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { startRouter } from './Router';
import rootStore from "./stores/RootStore";
import api_config from "./aws-exports";

Amplify.configure({
    oauth: {
        // Domain name
        domain : 'dev-forms-li.auth.ap-southeast-2.amazoncognito.com',
        // Authorized scopes
        scope : ['phone', 'email', 'profile', 'openid'],
        // Callback URL
        redirectSignIn : 'http://localhost:8085/', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'
        // Sign out URL
        redirectSignOut : 'http://localhost:8085/', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'
        responseType: 'code'
    },
    ...api_config,
    Auth: {
        userPoolId: 'ap-southeast-2_Cnjjlmsxh',
        userPoolWebClientId: "5uh5s9bfv5m9gk7ndt9e718da6",
        identityPoolId: "ap-southeast-2:7915bae5-b331-4675-9a3d-95698136c1ca",
        region: 'ap-southeast-2',
        mandatorySignIn: true
    }
});

startRouter(rootStore);

ReactDOM.render( <App store={rootStore}/>, document.getElementById('approot'));
