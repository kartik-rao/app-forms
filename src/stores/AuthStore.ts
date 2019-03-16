import Auth, { CognitoUser } from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import { action, computed, decorate, observable } from "mobx";

export interface IAuthStore {
    user : any;
    authState: string;
    setAuthState: (authState: string) => void;
    setAuthData: (user: any) => void;
    signOut: () => void;
    isSignedIn : boolean;
    userGroup: string;
    currentUser: CognitoUser;
}

// https://github.com/aws-amplify/amplify-js/issues/31
class AuthStore implements IAuthStore {
    user : any;
    authState: string;

    @action.bound onHubCapsule(capsule) {
        // The Auth module will emit events when user signs in, signs out, etc
        const { channel, payload, source } = capsule;
        if (channel === 'auth') {
            console.log("Hub event", payload);
            switch (payload.event) {
                case 'signIn':
                    this.setAuthState('signedIn');
                    Auth.currentAuthenticatedUser().then(user => {
                        this.setAuthData(user);
                    }).catch(e => {
                        this.setAuthState('signIn');
                    });
                    break;
                case 'signIn_failure':
                    this.setAuthState('signIn');
                    this.setAuthData(null);
                    break;
                default:
                    break;
            }
        }
    }

    @action.bound signOut() {
        Auth.signOut().then(() => {
            this.setAuthState('signIn');
        }).catch(e => {
            console.log(e);
        });
    }

    @action initialize() {
        // let the Hub module listen on Auth events
        Hub.listen('auth', this);
        this.setAuthState("loading");
        Auth.currentAuthenticatedUser().then(user => {
            this.setAuthState('signedIn');
            this.setAuthData(user);
        }).catch(e => {
            this.setAuthState('signIn');
        });
    }

    @action setAuthState(state: string) {
        console.log("Auth state changed", state);
        this.authState = state;
    }

    @action setAuthData(user: any) {
        console.log("Auth data changed", user);
        this.user = user;
    }

    @computed get isSignedIn() {
        return this.authState == 'signedIn';
    }

    @computed get userGroup() : string {
        if (this.authState == 'signedIn') {
            return this.user.attributes["custom:group"];
        } else {
            return null;
        }
    }

    @computed get currentUser() : CognitoUser {
        if (this.authState == 'signedIn') {
            return this.user;
        } else {
            return null;
        }
    }

    constructor() {
        this.initialize();
    }
}

decorate(AuthStore, {
    user: observable,
    authState: observable
})

export default AuthStore;