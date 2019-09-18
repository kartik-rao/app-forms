import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import { CognitoUserSession, CognitoUserAttribute, CognitoUser } from "amazon-cognito-identity-js";
import { observable, toJS } from "mobx";

export type UserAttributesNames = "email"|"custom:group"|"custom:tenantId"|"custom:tenantName"|"given_name"|"family_name"|"environment"|"stack"|"region";


export const createAuthStore = () => {
    const store = {
        id: Math.random() * 1e6,
        authData : {} as CognitoUser,
        authState: "loading" as string,
        authError: "" as string,
        attributes: {} as { [key in UserAttributesNames]?: string },
        contextId: null as string,
        contextName: null as string,
        ready : false as boolean,
        get isReady() : boolean {
            return this.ready == true && this.authState == "signedIn" && this.attributes && Object.keys(this.attributes).length > 0;
        },
        handleAuthResponse: function(user: CognitoUser) {
            user.getUserAttributes((err, attributes: CognitoUserAttribute[]=[]) => {
                if(!err) {
                    let attrs = {}
                    attributes.forEach((attr) => {
                        attrs[attr.getName()] = attr.getValue();
                    });
                    this.setAuthData(user);
                    this.setUserAttributes(attrs);
                    this.setAuthState('signedIn');
                    this.ready = true;
                } else {
                    this.authError = err.message;
                    console.error(err);
                }
            });
        },
        withSession: async function(endpoint: string, method: string, body?: any) {
            let session: CognitoUserSession = await Auth.currentSession();
            let token = session.getIdToken().getJwtToken()

            let response = await fetch(endpoint, {
                    method: method,
                    headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                    },
                    body: body ? JSON.stringify(body) : null
            });
            return response.json();
        },
        signUp: async function (signupEndpoint: string, signupData: any) {
            let session: CognitoUserSession = await Auth.currentSession();
            let token = session.getIdToken().getJwtToken()

            let response = await fetch(signupEndpoint, {
                    method: 'POST',
                    headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(signupData)
            });
            return response.json();
        },
        changePassword: async function(oldPassword: string, newPassword: string) {
            return Auth.changePassword(this.user, oldPassword, newPassword);
        },
        signOut: function () {
            Auth.signOut().then(() => {
                this.setAuthState('signIn');
            }).catch(e => {
                console.error(e);
            });
        },
        setContextId: function(id: string) {
            this.contextId = id;
        },
        setContextName: function(name: string) {
            this.contextName = name;
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
            return this.attributes["custom:group"];
        },
        get tenant() : string {
            return this.attributes["custom:tenantId"]
        },
        get user() : CognitoUser {
            if (this.authState == 'signedIn') {
                return this.authData;
            } else {
                return null;
            }
        },
        get isAdmin() {
            return this.attributes["custom:group"] == "Admin";
        },
        get isAccountAdmin() {
            return this.attributes["custom:group"] == "AccountAdmin";
        },
        resetAuth: function() {
            this.setAuthData(null);
            this.setUserAttributes({});
            this.setAuthState('signIn');
            this.ready = false;
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
                        _store.resetAuth();
                    });
                    break;
                case 'signIn_failure':
                    _store.resetAuth();
                    _store.authError = payload.data.message;
                    break;
                case 'signUp_failure':
                    _store.resetAuth();
                    _store.authError = payload.data.message;
                default:
                    break;
            }
        }
    });

    return _store;
}
export type AuthStoreType = ReturnType<typeof createAuthStore>;