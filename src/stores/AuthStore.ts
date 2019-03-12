import {action, observable, computed} from "mobx";

import Amplify, { Auth, Hub } from 'aws-amplify';

Amplify.configure({
    userPoolWebClientId: "47kk6v5s0gaj7hbtnensq0hgps"
});
// https://github.com/aws-amplify/amplify-js/issues/31
class AuthStore {
    user : any;
    authState: string;

    @action setAuthState(state: string) {
        this.authState = state;
    }

    @computed isSignedIn() {
        return this.authState == 'signedIn';
    }

    constructor() {



    }
}
