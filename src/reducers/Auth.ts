import * as jwtDecode from 'jwt-decode';

export const INITIAL_STATE: any = { is_valid: false, pending: false, error: "" }

export const authReducer = (state: any = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case 'LOGIN_STARTED':
            { return { is_valid: false, pending: true, error: "", nonce: action.payload.nonce }; }
        case 'AUTH_PARSED':
            {
                let { payload } = action;

                if (!payload.error) {
                    let idTokenPayload: any = jwtDecode(payload.id_token);
                    let accessTokenPayload: any = jwtDecode(payload.access_token);
                    if (idTokenPayload.nonce != state.nonce) {
                        return { is_valid: false, pending: false, error: 'Access Denied' }
                    }
                    let expires_in = JSON.stringify((parseInt(payload.expires_in) * 1000) + new Date().getTime());
                    localStorage.setItem('access_token', payload.access_token);
                    localStorage.setItem('id_token', payload.id_token);
                    localStorage.setItem('expires_in', expires_in);
                    localStorage.setItem('user', accessTokenPayload.upn);
                    let parsed: any = {
                        pending: false,
                        expires_in: expires_in,
                        access_token: payload.access_token,
                        id_token: payload.id_token,
                        is_valid: true,
                        user: accessTokenPayload,
                        error: ""
                    };
                    return parsed;
                } else {
                    return { is_valid: false, pending: false, error: payload.error }
                }
            }
        case 'LOGOUT':
            {
                localStorage.removeItem('access_token');
                localStorage.removeItem('id_token');
                localStorage.removeItem('expires_at');
                return INITIAL_STATE;
            }
        case 'IS_AUTHENTICATED':
            {
                var auth = Object.assign({}, state.auth)
                if (state.expires_at) {
                    if (new Date().getTime() < state.expires_at) {
                        auth.is_valid = true;
                        return auth;
                    } else {
                        return INITIAL_STATE;
                    }
                }
                let expiresAt = JSON.parse(<string>window.localStorage.getItem('expires_at'));
                if (new Date().getTime() < expiresAt) {
                    auth.is_valid = true;
                }
                return auth;
            }
        default:
            return state;
    }
}