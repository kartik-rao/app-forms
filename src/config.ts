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
        userPoolId: 'ap-northeast-1_Q798Nsl33',
        userPoolWebClientId: "7pvdgcaflsg9juob60mosafi9d",
        region: __REGION__,
        mandatorySignIn: true
    },
    api : {
            graph : {
                'aws_appsync_region': __REGION__,
                'aws_appsync_graphqlEndpoint': 'https://ugn2kqey75aolcnah6vtnbuydi.appsync-api.ap-northeast-1.amazonaws.com/graphql',
                'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS'
            },
            rest : {
                endpoint: 'dev-api.forms.li'
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