import { Col, Layout, Row } from "antd";
import Amplify from 'aws-amplify';
import { Authenticator, Greetings } from 'aws-amplify-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { startRouter } from './Router';
import rootStore from "./stores/RootStore";


Amplify.configure({
    oauth: {
        // Domain name
        domain : 'dev-formsli.auth.ap-southeast-2.amazoncognito.com',
        // Authorized scopes
        scope : ['phone', 'email', 'profile', 'openid'],
        // Callback URL
        redirectSignIn : 'http://localhost:8085/', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'
        // Sign out URL
        redirectSignOut : 'http://localhost:8085/', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'
        responseType: 'code'
    },
    'aws_appsync_graphqlEndpoint': 'https://q6x74cjifbblvmg3dss7t3ukfi.appsync-api.ap-southeast-2.amazonaws.com/graphql',
    'aws_appsync_region': 'ap-southeast-2',
    'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS',
    Auth: {
        userPoolId: 'ap-southeast-2_SttSHpNG3',
        userPoolWebClientId: "24h1tgst915lji221gtc94hok8",
        identityPoolId: 'ap-southeast-2:47352019-4cbc-4dc0-84a2-3a5dbc9658da',
        region: 'ap-southeast-2',
        mandatorySignIn: true
    }
});

startRouter(rootStore);

ReactDOM.render(
  <Layout>
    <Row justify="space-around">
        <Col span={24}>
          <Authenticator hide={[Greetings]}>
            <App store={rootStore}/>
          </Authenticator>
        </Col>
    </Row>
  </Layout>,
  document.getElementById('root')
);
