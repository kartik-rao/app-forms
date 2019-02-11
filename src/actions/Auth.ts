import { push } from 'react-router-redux';
import * as queryString from 'query-string';

const getLoginUrl = (config: any, nonce: any) => {
    const { clientId, redirectUri, oauthIdp, oauthScope } = config;
    return `${oauthIdp}authorize?client_id=${clientId}&response_type=id_token+token&redirect_uri=${redirectUri}&scope=${oauthScope}&response_mode=fragment&nonce=${nonce}`;
}

export const startLogin = (redirectUri?:string) => {
    return (dispatch: any, getState: any) => {
        const nonce = Math.ceil(Math.random() * 1e10);
        const url = getLoginUrl(getState().constants.saml, nonce);
        dispatch(loginStarted({ nonce: nonce }));
        setTimeout(()=>{
            window.location.href = url;
        }, 50)
    }
};

export const loginStarted = (auth: any) => {
    return { type: "LOGIN_STARTED", payload: auth }
}

export const authParsed = (auth: any) => {
    return { type: "AUTH_PARSED", payload: auth }
}

export const parseAuth = () => {
    return (dispatch: any, getState: any) => {
        let parsedHash = queryString.parse(location.hash);
        let payload = Object.assign(parsedHash);
        dispatch(authParsed(payload));
    }
}

export const startLogout = () => {
    return (dispatch:any , getState: any) => {
        dispatch(logout());
        push(getState().constants.indexUri)
    }
}

export const logout = () => {
    return { type: "LOGOUT", payload: {} }
}

export const isAuthenticated = () => {
    return { type: "IS_AUTHENTICATED", payload: {} }
}
