import Auth from "@aws-amplify/auth";
import 'airbnb-browser-shims';
import { Col, Layout, Row } from "antd";
import { Authenticator, Greetings } from 'aws-amplify-react';
import { useObserver } from "mobx-react-lite";
import * as React from "react";
import './app.css';
import { MainView } from "./components/MainView";
import { createAppStore } from './stores/AppStore';
import { AppStoreProvider } from "./stores/AppStoreProvider";
import { AppConfig } from "./config";


export interface IAppProps {
    config : AppConfig
}

const signUpConfig = {
    hideAllDefaults: true,
    defaultCountryCode: 61,
    signUpFields: [
      {
        label: 'Account Name',
        key: 'tenantName',
        required: true,
        placeholder: 'Account Name',
        type: 'string',
        displayOrder: 1,
        custom: true
      },
      {
        label: 'First Name',
        key: 'given_name',
        required: true,
        placeholder: 'First Name',
        type: 'string',
        displayOrder: 2,
      },
      {
        label: 'Last Name',
        key: 'family_name',
        required: true,
        placeholder: 'Last Name',
        type: 'string',
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
        label: 'Phone Number',
        key: 'phone_number',
        required: false,
        placeholder: 'Phone Number',
        type: 'phone_number',
        displayOrder: 5,
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        placeholder: 'Password',
        type: 'password',
        displayOrder: 5,
      }
    ],
}

export const App : React.FC<IAppProps> = (props: IAppProps) => {
    const store = createAppStore(props.config);
    React.useEffect(() => {
      let fetchAuth = function() {
        Auth.currentAuthenticatedUser().then(user => {
          store.auth.handleAuthResponse(user);
        }).catch(e => {
            store.auth.resetAuth();
        });
      }
      fetchAuth();
    }, []);

    return useObserver(() => {
        return <AppStoreProvider store={store}><Layout className="fl-layout">
            <Row type="flex" justify="center" align="top">
            <Col span={24}>
                <AppStoreProvider store={store}>
                    <Authenticator signUpConfig={signUpConfig}
                        authState="signIn"
                        authData={store.auth.user}
                        onStateChange={(authState) => console.log(`Authenticator.authStateChange [${authState}]`)}
                        hide={[Greetings]}>
                        {store.auth.isReady == true && <MainView />}
                    </Authenticator>
                </AppStoreProvider>
            </Col>
            </Row>
        </Layout>
        </AppStoreProvider>
    })
}