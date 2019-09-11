import Auth from "@aws-amplify/auth";
import Amplify from '@aws-amplify/core';
import * as Sentry from '@sentry/browser';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';

Sentry.init({
    dsn: "https://765d27482b8b45928f4b12bcaa2f7e32@sentry.io/28557"
});

Amplify.configure({
    'aws_appsync_graphqlEndpoint': 'https://ugn2kqey75aolcnah6vtnbuydi.appsync-api.ap-northeast-1.amazonaws.com/graphql',
    'aws_appsync_region': 'ap-northeast-1',
    'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS',
    // oauth: {
    //     // Domain name
    //     domain: 'dev-auth-formsli.auth.ap-northeast-1.amazoncognito.com',
    //     // Authorized scopes
    //     scope: ['phone', 'email', 'profile', 'openid'],
    //     // Callback URL
    //     redirectSignIn: 'http://localhost:8085/', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'
    //     // Sign out URL
    //     redirectSignOut: 'http://localhost:8085/', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'
    //     responseType: 'code'
    // },
    graphql_headers: async () => {
        try {
            let token = (await Auth.currentSession()).getIdToken().getJwtToken();
            localStorage.setItem("token", token);
            return { Authorization: token }
        }
        catch (e) {
            console.error(e);
            return {};
            // Potentially you can retrieve it from local storage
        }
    },
    Auth: {
        userPoolId: 'ap-northeast-1_Q798Nsl33',
        userPoolWebClientId: "7pvdgcaflsg9juob60mosafi9d",
        // identityPoolId: "ap-northeast-1:5be23074-d96a-4e55-be17-3fe13545156a",
        region: 'ap-northeast-1',
        mandatorySignIn: true
    }
});

ReactDOM.render(<App />, document.getElementById('approot'));
