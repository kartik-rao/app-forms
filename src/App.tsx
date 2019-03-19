
import 'airbnb-browser-shims';
import './app.css';
import {Layout, Row, Col} from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { Authenticator, Greetings } from 'aws-amplify-react';
import {MainView} from "./components/partials/MainView";
import { IRootStore } from "./stores/RootStore";

export interface IAppProps {
    store: IRootStore;
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

@observer
export class App extends React.Component <IAppProps, any> {
    props : IAppProps;
    _validAuthStates = ['signedIn'];

    constructor(props: IAppProps) {
        super(props);
        this.props = props;
        props.store.authStore.setAuthData(this.props.authData);
    }

    showComponent(theme: any) {
        return
    }

    render() {
        return <Layout className="fl-layout">
        <Row type="flex" justify="center" align="top">
          <Col span={24}>
            <Authenticator hide={[Greetings]} signUpConfig={signUpConfig}>
                {this.props.store.authStore.authState == 'signedIn' &&
                    <MainView store={this.props.store}/>
                }
            </Authenticator>
          </Col>
        </Row>
      </Layout>
    }
}

