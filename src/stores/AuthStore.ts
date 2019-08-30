import Auth, { CognitoUser } from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { observable } from "mobx";

export const createAuthStore = () => {
    const store = {
        authData : {} as CognitoUser,
        authState: "loading" as string,
        authError: "",
        attributes: {},
        handleAuthResponse: function(user: CognitoUser) {
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
        onHubCapsule : function(capsule) {
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
        },
        signOut: function () {
            Auth.signOut().then(() => {
                this.setAuthState('signIn');
            }).catch(e => {
                console.log(e);
            });
        },
        initialize: function() {
            // let the Hub module listen on Auth events
            Hub.listen('auth', this);
            this.setAuthState("loading");
            Auth.currentAuthenticatedUser().then(user => {
                this.handleAuthResponse(user);
            }).catch(e => {
                this.setAuthState('signIn');
            });
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
        }
    }
    return observable(store);
}
export type AuthStoreType = ReturnType<typeof createAuthStore>;