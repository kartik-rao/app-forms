import { Authenticator, ConfirmSignIn, ConfirmSignUp, ForgotPassword, Greetings, RequireNewPassword, SignIn, SignUp, TOTPSetup, VerifyContact } from "aws-amplify-react";
import { useObserver } from 'mobx-react';
import * as React from 'react';
import { appStoreContext } from '../../stores/AppStoreProvider';

export const AuthWidget: React.FC<any> = () => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");
    return useObserver(() => {
        return <Authenticator
        // Optionally hard-code an initial state
        authState="signIn"
        // Pass in an already authenticated CognitoUser or FederatedUser object
        authData={store.auth.user}
        // Fired when Authentication State changes
        onStateChange={(authState) => store.auth.setAuthState(authState)}

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
    })
}
