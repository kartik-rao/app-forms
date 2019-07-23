import Amplify from '@aws-amplify/core';
import * as Sentry from '@sentry/browser';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
// import api_config from "./aws-exports";
import { startRouter } from './Router';
import rootStore from "./stores/RootStore";
import Auth from "@aws-amplify/auth";

Sentry.init({
 dsn: "https://765d27482b8b45928f4b12bcaa2f7e32@sentry.io/28557"
});

Amplify.configure({
    'aws_appsync_graphqlEndpoint': 'https://v233t5tzhre2zhzqbmpdwqjzpa.appsync-api.ap-southeast-2.amazonaws.com/graphql',
    'aws_appsync_region': 'ap-southeast-2',
    'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS',
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
    graphql_headers: async () => {
        try {
          const token = (await Auth.currentSession()).getIdToken().getJwtToken();
          return { Authorization: token }
        }
        catch (e) {
          console.error(e);
          return {};
          // Potentially you can retrieve it from local storage
        }
    },
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
