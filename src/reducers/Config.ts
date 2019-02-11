const env: string = location.hostname.indexOf('localhost') > -1 ? 'dev' : 'prod';

const initialState: any = {
    brand: "Forms.li",
    env: env,
    baseURI: env === 'dev' ? 'http://localhost:3000' : 'https://sfmc-app.lifecycledigital.com',
    indexURI : '/home',
    saml: {
        oauthScope: 'openid%20https%3A%2F%2Fgraph.microsoft.com%2Fuser.read',
        oauthIdp: 'https://login.microsoftonline.com/organizations/oauth2/v2.0/',
        clientId: '172f00aa-3de9-42b3-87fc-ce2e1f46e501',
        redirectUri: 'http://localhost:3000/auth'
    }
};

export const constantsReducer = (state: any = initialState) => {
    return initialState;
}