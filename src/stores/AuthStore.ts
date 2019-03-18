import Auth, { CognitoUser } from "@aws-amplify/auth";
import Api from "@aws-amplify/api";
import { Hub } from "@aws-amplify/core";
import { action, computed, decorate, observable } from "mobx";
import { CognitoUserSession } from "amazon-cognito-identity-js";

export interface IAuthStore {
    user : any;
    authState: string;
    setAuthState: (authState: string) => void;
    setAuthData: (user: any) => void;
    signOut: () => void;
    signUp: (data: any) => void;
    isSignedIn : boolean;
    group: string;
    tenant: string;
    authData: CognitoUser;
    authError: any;
}

// https://github.com/aws-amplify/amplify-js/issues/31
class AuthStore implements IAuthStore {
    authData : CognitoUser;
    authState: string;
    authError: any;
    attributes: any;

    @action handleAuthResponse(user: CognitoUser) {
        user.getUserAttributes((err, attributes=[]) => {
            if(!err) {
                let attrs = {}
                attributes.forEach((attr) => {
                    attrs[attr["Name"]] = attr["Value"];
                })
                this.setUserAttributes(attrs);
                this.setAuthState('signedIn');
                this.setAuthData(user);
            } else {
                this.authError = err.message;
                console.log(err);
            }
        });
    }

    @action async signUp(signupData: any) {
        let session: CognitoUserSession = await Auth.currentSession();
        let token = session.getIdToken().getJwtToken()

        let response = await fetch('https://3c1ti9681k.execute-api.ap-southeast-2.amazonaws.com/dev/invite', {
                method: 'POST',
                headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
        });
        return response.json()
    }

    @action.bound onHubCapsule(capsule) {
        // The Auth module will emit events when user signs in, signs out, etc
        const { channel, payload, source } = capsule;
        if (channel === 'auth') {
            switch (payload.event) {
                case 'signIn':
                    Auth.currentAuthenticatedUser().then((user:CognitoUser) => {
                        this.handleAuthResponse(user);
                    }).catch(e => {
                        this.authError = e.message;
                        this.setAuthState('signIn');
                    });
                    break;
                case 'signIn_failure':
                    this.setAuthState('signIn');
                    this.setAuthData(null);
                    this.authError = payload.data.message;
                    break;
                case 'signUp_failure':
                    this.setAuthData(null);
                    this.setAuthState('signIn');
                    this.authError = payload.data.message;
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
            this.handleAuthResponse(user);
            console.log(user);
        }).catch(e => {
            this.setAuthState('signIn');
        });
    }

    @action setAuthState(state: string) {
        this.authState = state;
    }

    @action setAuthData(user: any) {
        this.authData = user;
    }

    @action setUserAttributes(attributes: any) {
        this.attributes = attributes;
    }

    @computed get isSignedIn() {
        return this.authState == 'signedIn';
    }

    @computed get group() : string {
        if (this.attributes) {
            return this.attributes["custom:group"];
        } else {
            return null;
        }
    }

    @computed get tenant() : string {
        if (this.attributes) {
            return this.attributes["custom:tenantId"]
        } else {
            return null;
        }
    }

    @computed get user() : CognitoUser {
        if (this.authState == 'signedIn') {
            return this.authData;
        } else {
            return null;
        }
    }

    constructor() {
        this.initialize();
    }
}

decorate(AuthStore, {
    authData: observable,
    authState: observable,
    attributes: observable
})

export default AuthStore;