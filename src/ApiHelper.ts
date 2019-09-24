import API, { graphqlOperation } from "@aws-amplify/api";

export interface TypedGraphQLResult<T> {
    data?: T;
    errors?: [any];
    extensions?: {
        [key: string]: any;
    };
}

export const withGraphQl = async <T>(queryOrMutation: any, variables: any) : Promise<TypedGraphQLResult<T>> => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await API.graphql(graphqlOperation(queryOrMutation, variables));
            resolve(response as TypedGraphQLResult<T>)
        } catch (error) {
            reject(error);
        }
    });
};
