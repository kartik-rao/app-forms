var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import { observable } from "mobx";
export const createAuthStore = () => {
    const store = {
        authData: observable({}),
        authState: observable("loading"),
        authError: observable(""),
        attributes: observable(""),
        handleAuthResponse: function (user) {
            user.getUserAttributes((err, attributes = []) => {
                if (!err) {
                    let attrs = {};
                    attributes.forEach((attr) => {
                        attrs[attr["Name"]] = attr["Value"];
                    });
                    this.setUserAttributes(attrs);
                    this.setAuthState('signedIn');
                    this.setAuthData(user);
                }
                else {
                    this.authError = err.message;
                    console.log(err);
                }
            });
        },
        signUp: function (signupData) {
            return __awaiter(this, void 0, void 0, function* () {
                let session = yield Auth.currentSession();
                let token = session.getIdToken().getJwtToken();
                let response = yield fetch('https://3c1ti9681k.execute-api.ap-southeast-2.amazonaws.com/dev/invite', {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(signupData)
                });
                return response.json();
            });
        },
        onHubCapsule: function (capsule) {
            // The Auth module will emit events when user signs in, signs out, etc
            const { channel, payload, source } = capsule;
            if (channel === 'auth') {
                switch (payload.event) {
                    case 'signIn':
                        Auth.currentAuthenticatedUser().then((user) => {
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
        initialize: function () {
            // let the Hub module listen on Auth events
            Hub.listen('auth', this);
            this.setAuthState("loading");
            Auth.currentAuthenticatedUser().then(user => {
                this.handleAuthResponse(user);
            }).catch(e => {
                this.setAuthState('signIn');
            });
        },
        setAuthState: function (authState) {
            this.authState = authState;
        },
        setAuthData: function (user) {
            this.authData = user;
        },
        setUserAttributes: function (attributes) {
            this.attributes = attributes;
        },
        get isSignedIn() {
            return this.authState == 'signedIn';
        },
        get group() {
            if (this.attributes) {
                return this.attributes["custom:group"];
            }
            else {
                return null;
            }
        },
        get tenant() {
            if (this.attributes) {
                return this.attributes["custom:tenantId"];
            }
            else {
                return null;
            }
        },
        get user() {
            if (this.authState == 'signedIn') {
                return this.authData;
            }
            else {
                return null;
            }
        }
    };
    return store;
};
//# sourceMappingURL=AuthStore.js.map