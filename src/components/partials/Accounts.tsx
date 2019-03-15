import * as React from "react";
import { IRootStore } from "../../stores/RootStore";

import {observable, action} from "mobx";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from '../../graphql/queries';
import { Table, List } from "antd";

export interface IAccountsViewProps {
    store: IRootStore;
}

export class AccountsView extends React.Component<IAccountsViewProps, any> {
    props: IAccountsViewProps;
    @observable accounts = [];
    @observable nextToken = null;
    @observable loading: boolean = true;
    @observable errors: any[];

    @action async fetch() {
        let allAccounts;
        try {
            allAccounts = await API.graphql(graphqlOperation(queries.listAllAccounts, {limit: 50, nextToken: this.nextToken}));
            this.nextToken = allAccounts["nextToken"];
            this.accounts = allAccounts["items"];
        } catch (errorResponse) {
            this.errors = errorResponse.errors;
        }
    }

    constructor(props: IAccountsViewProps) {
        super(props);
        this.props = props;
        this.fetch();
    }

    render() {
        const columns = [{
            title: 'Account Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'name'
        }, {
            title: 'Plan',
            dataIndex: 'planId',
            key: 'planId'
        }];

        return (
            <div>
            {this.accounts && this.accounts.length > 0 && <Table dataSource={this.accounts} columns={columns} />}
            {this.props.store.debug && this.errors &&
                <List dataSource={this.errors} renderItem={item => (
                    <List.Item>item.message</List.Item>
                )}/>}
            </div>
        );
    }
}