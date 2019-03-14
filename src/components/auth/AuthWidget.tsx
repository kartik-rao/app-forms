import * as React from 'react';
import {IRootStore} from '../../stores/RootStore';
import { observer } from 'mobx-react';

import {Authenticator, Greetings, SignIn, ConfirmSignIn, RequireNewPassword, SignUp,
    ConfirmSignUp, VerifyContact, ForgotPassword, TOTPSetup} from "aws-amplify-react";

export interface IAuthProps {
    store: IRootStore;
}

@observer
export class Auth extends React.Component<IAuthProps, any> {
    store: IRootStore
    constructor(props: IAuthProps) {
        super(props);
    }

    render() {
        let {authStore} = this.props.store;
        return (
            <Authenticator
                // Optionally hard-code an initial state
                authState="signIn"
                // Pass in an already authenticated CognitoUser or FederatedUser object
                authData={authStore.user}
                // Fired when Authentication State changes
                onStateChange={(authState) => authStore.setAuthState(authState)}

                hide={
                    [
                        Greetings
                    ]
                }
                // or hide all the default components
                // hideDefault={true}
                // Pass in an aws-exports configuration
                // amplifyConfig={myAWSExports}
                // Pass in a message map for error strings
                // errorMessage={myMessageMap}
            >
                <SignIn />
                <ConfirmSignIn/>
                <RequireNewPassword/>
                <SignUp/>
                <ConfirmSignUp/>
                <VerifyContact/>
                <ForgotPassword/>
                <TOTPSetup/>
            </Authenticator>
        )
    }
}

export default Auth