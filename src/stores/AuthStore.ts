import Auth, { CognitoUser } from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import { CognitoUserSession, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { observable, toJS } from "mobx";

export const createAuthStore = () => {
    const store = {
        authData : {} as CognitoUser,
        authState: "loading" as string,
        authError: "" as string,
        attributes: {},
        context: null as string,
        handleAuthResponse: function(user: CognitoUser) {
            user.getUserAttributes((err, attributes: CognitoUserAttribute[]=[]) => {
                if(!err) {
                    let attrs = {}
                    attributes.forEach((attr) => {
                        attrs[attr.getName()] = attr.getValue();
                    })
                    this.setUserAttributes(attrs);
                    this.setAuthState('signedIn');
                    this.setAuthData(user);
                } else {
                    this.authError = err.message;
                    console.log(err);
                }
            });
        },
        signUp: async function (signupData: any) {
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
            return response.json();
        },
        signOut: function () {
            Auth.signOut().then(() => {
                this.setAuthState('signIn');
            }).catch(e => {
                console.log(e);
            });
        },
        setContext: function(context: string) {
            this.context = context;
        },
        setAuthState: function (authState: string) {
            this.authState = authState;
        },
        setAuthData: function (user: any) {
            this.authData = user;
        },
        setUserAttributes: function(attributes: any) {
            this.attributes = attributes;
        },
        get isSignedIn() : boolean {
            return this.authState == 'signedIn';
        },
        get group() : string {
            if (this.attributes) {
                return this.attributes["custom:group"];
            } else {
                return null;
            }
        },
        get tenant() : string {
            if (this.attributes) {
                return this.attributes["custom:tenantId"]
            } else {
                return null;
            }
        },
        get user() : any {
            if (this.authState == 'signedIn') {
                return this.authData;
            } else {
                return null;
            }
        },
        get isAdmin() {
            return this.attributes && this.attributes["custom:group"] == "Admin";
        },
        get isAccountAdmin() {
            return this.attributes && this.attributes["custom:group"] == "AccountAdmin";
        }
    }
    // let the Hub module listen on Auth events
    let _store = observable(store);
    Hub.listen('auth', (capsule) => {
        // The Auth module will emit events when user signs in, signs out, etc
        const { channel, payload } = capsule;
        if (channel === 'auth') {
            switch (payload.event) {
                case 'signIn':
                    Auth.currentAuthenticatedUser().then((user:CognitoUser) => {
                        _store.handleAuthResponse(user);
                    }).catch(e => {
                        _store.authError = e.message;
                        _store.setAuthState('signIn');
                    });
                    break;
                case 'signIn_failure':
                    _store.setAuthState('signIn');
                    _store.setAuthData(null);
                    _store.authError = payload.data.message;
                    break;
                case 'signUp_failure':
                    _store.setAuthData(null);
                    _store.setAuthState('signIn');
                    _store.authError = payload.data.message;
                default:
                    break;
            }
        }
    });
    Auth.currentAuthenticatedUser().then(user => {
        _store.handleAuthResponse(user);
    }).catch(e => {
        _store.setAuthState('signIn');
    });
    return _store;
}
export type AuthStoreType = ReturnType<typeof createAuthStore>;