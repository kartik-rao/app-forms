var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { observer } from 'mobx-react';
import { Authenticator, Greetings, SignIn, ConfirmSignIn, RequireNewPassword, SignUp, ConfirmSignUp, VerifyContact, ForgotPassword, TOTPSetup } from "aws-amplify-react";
let Auth = class Auth extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { authStore } = this.props.store;
        return (React.createElement(Authenticator
        // Optionally hard-code an initial state
        , { 
            // Optionally hard-code an initial state
            authState: "signIn", 
            // Pass in an already authenticated CognitoUser or FederatedUser object
            authData: authStore.user, 
            // Fired when Authentication State changes
            onStateChange: (authState) => authStore.setAuthState(authState), hide: [
                Greetings
            ] },
            React.createElement(SignIn, null),
            React.createElement(ConfirmSignIn, null),
            React.createElement(RequireNewPassword, null),
            React.createElement(SignUp, null),
            React.createElement(ConfirmSignUp, null),
            React.createElement(VerifyContact, null),
            React.createElement(ForgotPassword, null),
            React.createElement(TOTPSetup, null)));
    }
};
Auth = __decorate([
    observer
], Auth);
export { Auth };
export default Auth;
//# sourceMappingURL=AuthWidget.js.map