declare var __DEBUG__   : boolean;
declare var __ENV__     : string;
declare var __VERSION__ : string;
declare var __REGION__  : string;
declare var __HOSTNAME__: string;

interface RestApiConfig {
    endpoint: string;
}

interface GraphQlApiConfig {
    aws_appsync_region: string;
    aws_appsync_graphqlEndpoint: string;
    aws_appsync_authenticationType: string;
}

interface AuthConfig {
    userPoolId: string;
    userPoolWebClientId: string;
    region: string;
    mandatorySignIn: boolean;
}


interface ApiConfig {
    graph : GraphQlApiConfig;
    rest: RestApiConfig;
}


interface EnvironmentConfig  {
    auth : AuthConfig;
    api  : ApiConfig;
}

type Environment = "development"|"staging"|"production";

export interface AppConfig {
    env      : Environment;
    envConfig: EnvironmentConfig;
    debug    : boolean;
    region   : string;
    version  : string;
    hostname : string;
}

const _config = {
    development: {
        auth : {
            userPoolId: 'ap-northeast-1_0wTBnqAhr',
            userPoolWebClientId: "1b2a2sceie5tm0g78as48d0n38",
            region: __REGION__,
            mandatorySignIn: true
        },
        api : {
                graph : {
                    'aws_appsync_region': __REGION__,
                    'aws_appsync_graphqlEndpoint': 'https://dev-graph.forms.li/graphql',
                    'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS'
                },
                rest : {
                    endpoint: 'https://dev-api.forms.li',
                    signUp  : 'https://dev-api.forms.li/invite',
                    createStream: 'https://dev-api.forms.li/stream',
                    entry : 'https://dev-api.forms.lu/form/entry/',
                }
            }
        },
    staging: null,
    production: null
}

export default {
    env     : __ENV__,
    region  : __REGION__,
    debug   : __DEBUG__,
    version : __VERSION__,
    hostname: __HOSTNAME__,
    envConfig   : _config[__ENV__]
} as AppConfig;