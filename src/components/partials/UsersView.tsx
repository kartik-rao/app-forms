import * as React from "react";
import { IRootStore } from "../../stores/RootStore";
import {observable, action} from "mobx";
import  API, {graphqlOperation } from "@aws-amplify/api";
import * as queries from '../../graphql/queries';
import { Table, List, Spin, Empty, Row, Col } from "antd";
import { observer } from "mobx-react";

export interface IUsersViewProps {
    store: IRootStore;
}

@observer
export class UsersView extends React.Component<IUsersViewProps, any> {
    props: IUsersViewProps;
    @observable users = [];
    @observable nextToken = null;
    @observable loading: boolean = true;
    @observable errors: any[];

    @action async fetch() {
        let allUsers;
        try {
            allUsers = await API.graphql(graphqlOperation(queries.listAllUsers, {limit: 50, nextToken: this.nextToken}));
            this.nextToken = allUsers["nextToken"];
            this.users = allUsers["items"];
        } catch (errorResponse) {
            this.errors = errorResponse.errors;
        }
        this.loading = false;
    }

    constructor(props: IUsersViewProps) {
        super(props);
        this.props = props;
        this.fetch();
    }

    render() {
        const columns = [{
            title: 'User Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        }, {
            title: 'Account',
            dataIndex: 'accountId',
            key: 'accountId'
        }];

        let showErrors = this.props.store.debug && this.errors;
        let showUsers = !this.loading && this.users && this.users.length > 0;
        let showEmpty = !this.loading && (!this.users || this.users.length == 0);

        return (
            <Row>
                <Col span={20} offset={2}>
            {this.loading && <Spin size="large" />}
            {showUsers && <Table dataSource={this.users} columns={columns} />}
            {showEmpty && <Empty/> }
            {showErrors && <List dataSource={this.errors} renderItem={item => (
                    <List.Item>{item.message}</List.Item>
                )}/>}
            </Col>
            </Row>
        );
    }
}