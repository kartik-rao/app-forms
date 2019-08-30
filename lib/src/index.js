var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Amplify from '@aws-amplify/core';
import * as Sentry from '@sentry/browser';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { startRouter } from './Router';
import rootStore from "./stores/RootStore";
import Auth from "@aws-amplify/auth";
Sentry.init({
    dsn: "https://765d27482b8b45928f4b12bcaa2f7e32@sentry.io/28557"
});
Amplify.configure({
    'aws_appsync_graphqlEndpoint': 'https://ugn2kqey75aolcnah6vtnbuydi.appsync-api.ap-northeast-1.amazonaws.com/graphql',
    'aws_appsync_region': 'ap-northeast-1',
    'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS',
    oauth: {
        // Domain name
        domain: 'dev-auth-formsli.auth.ap-northeast-1.amazoncognito.com',
        // Authorized scopes
        scope: ['phone', 'email', 'profile', 'openid'],
        // Callback URL
        redirectSignIn: 'http://localhost:8085/',
        // Sign out URL
        redirectSignOut: 'http://localhost:8085/',
        responseType: 'code'
    },
    graphql_headers: () => __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (yield Auth.currentSession()).getIdToken().getJwtToken();
            return { Authorization: token };
        }
        catch (e) {
            console.error(e);
            return {};
            // Potentially you can retrieve it from local storage
        }
    }),
    Auth: {
        userPoolId: 'ap-northeast-1_Q798Nsl33',
        userPoolWebClientId: "7pvdgcaflsg9juob60mosafi9d",
        identityPoolId: "ap-northeast-1:5be23074-d96a-4e55-be17-3fe13545156a",
        region: 'ap-northeast-1',
        mandatorySignIn: true
    }
});
startRouter(rootStore);
ReactDOM.render(React.createElement(App, { store: rootStore }), document.getElementById('approot'));
//# sourceMappingURL=index.js.map