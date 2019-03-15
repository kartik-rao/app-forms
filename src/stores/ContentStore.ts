import {observable} from "mobx";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import {ListAllAccountsQuery} from "../Api.graphql";

export class ContentStore {
    @observable entityName: string;
    @observable entityId: string;
    @observable nextToken: string;
    @observable limit: string;

    async getAccounts() {

    }

    fetchAll() {

    }

}