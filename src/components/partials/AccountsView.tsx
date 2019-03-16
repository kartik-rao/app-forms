import * as React from "react";
import { IRootStore } from "../../stores/RootStore";
import {observable, action} from "mobx";
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

        let showErrors = this.props.store.debug && this.errors;
        let showAccounts = !this.loading && this.accounts && this.accounts.length > 0;
        let showEmpty = !this.loading && (!this.accounts || this.accounts.length == 0);

        return (
            <Row>
                <Col span={20} offset={2}>
            {this.loading && <Spin size="large" />}
            {showAccounts && <Table dataSource={this.accounts} columns={columns} />}
            {showEmpty && <Empty/> }
            {showErrors && <List dataSource={this.errors} renderItem={item => (
                    <List.Item>item.message</List.Item>
                )}/>}
            </Col>
            </Row>
        );
    }
}