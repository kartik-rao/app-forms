import Auth from "@aws-amplify/auth";
import 'airbnb-browser-shims';
import { Col, Layout, Row } from "antd";
import { Authenticator, Greetings } from 'aws-amplify-react';
import { useObserver } from "mobx-react-lite";
import * as React from "react";
import './app.css';
import { MainView } from "./components/partials/MainView";
import { createAppStore } from './stores/AppStore';
import { AppStoreProvider } from "./stores/AppStoreProvider";


export interface IAppProps {
    authState?: string;
    authData?: any;
}

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
}

export const App : React.FC<IAppProps> = (props: IAppProps) => {
    const store = createAppStore();

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
                        mandatorySignIn={true}
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