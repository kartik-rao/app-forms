import Auth from "@aws-amplify/auth";
import Amplify from '@aws-amplify/core';
import * as Sentry from '@sentry/browser';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';

Sentry.init({
    dsn: "https://765d27482b8b45928f4b12bcaa2f7e32@sentry.io/28557"
});

import config from "./config";
const stageConfig = config[config.env];

Amplify.configure({
    ...stageConfig.api.graph,
    graphql_headers: async () => {
        // Get from local storage ?
        try {
            let token = (await Auth.currentSession()).getIdToken().getJwtToken();
            localStorage.setItem("token", token);
            return { Authorization: token }
        }
        catch (e) {
            console.error(e);
            return {};
        }
    },
    Auth: stageConfig.auth
});

ReactDOM.render(<App config={config}/>, document.getElementById('approot'));
