import * as React from "react";
import { IRootStore } from "../../stores/RootStore";
import {observable, action, computed} from "mobx";
import  API, {graphqlOperation } from "@aws-amplify/api";
import * as queries from '../../graphql/queries';
import { Table, List, Spin, Empty, Row, Col } from "antd";
import { observer } from "mobx-react";

export interface IAccountsViewProps {
    store: IRootStore;
}

@observer
export class AccountsView extends React.Component<IAccountsViewProps, any> {
    props: IAccountsViewProps;
    @observable accounts: any[];
    @observable nextToken: string;
    @observable loading: boolean;
    @observable errors: any[];

    @computed get showErrors () {
        return this.props.store.debug && this.errors;
    }

    @computed get showAccounts() {
        return !this.loading && this.accounts && this.accounts.length > 0;
    }

    @computed get showEmpty() {
        return !this.loading && (!this.accounts || this.accounts.length == 0);
    }

    @action async fetch() {
        let allAccounts;
        this.loading = true;
        try {
            allAccounts = await API.graphql(graphqlOperation(queries.listAllAccounts, {limit: 50, nextToken: this.nextToken}));
            this.nextToken = allAccounts["nextToken"];
            this.accounts = allAccounts["items"];
        } catch (errorResponse) {
            this.errors = errorResponse.errors;
        }
        if (!this.accounts) {
            this.accounts = [];
        }
        this.loading = false;
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
            <Row>
                <Col span={20} offset={2}>
            {this.loading && <Spin size="large" />}
            {this.showAccounts && <Table dataSource={this.accounts} columns={columns} />}
            {this.showEmpty && <Empty/> }
            {this.showErrors && <List dataSource={this.errors} renderItem={item => (
                    <List.Item>{item.message}</List.Item>
                )}/>}
            </Col>
            </Row>
        );
    }
}