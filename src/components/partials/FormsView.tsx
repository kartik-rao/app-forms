import * as React from "react";
import { IRootStore } from "../../stores/RootStore";
import {observable, action} from "mobx";
import  API, {graphqlOperation } from "@aws-amplify/api";
import * as queries from '../../graphql/queries';
import { Table, List, Spin, Empty, Row, Col } from "antd";
import { observer } from "mobx-react";

export interface IFormsViewProps {
    store: IRootStore;
}

@observer
export class FormsView extends React.Component<IFormsViewProps, any> {
    props: IFormsViewProps;
    @observable forms = [];
    @observable nextToken = null;
    @observable loading: boolean = true;
    @observable errors: any[];

    @action async fetch() {
        let allForms;
        let {tenant} = this.props.store.authStore;
        let args = {accountId: tenant};
        try {
            allForms = await API.graphql(graphqlOperation(queries.getAccount, args));
            this.nextToken = allForms["nextToken"];
            this.forms = allForms["items"];
        } catch (errorResponse) {
            this.errors = errorResponse.errors;
        }
        this.loading = false;
    }

    constructor(props: IFormsViewProps) {
        super(props);
        this.props = props;
        this.fetch();
    }

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc'
        }, {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner'
        }];

        let showErrors = this.props.store.debug && this.errors;
        let showForms = !this.loading && this.forms && this.forms.length > 0;
        let showEmpty = !this.loading && (!this.forms || this.forms.length == 0);

        return (
            <Row>
                <Col span={20} offset={2}>
            {this.loading && <Spin size="large" />}
            {showForms && <Table dataSource={this.forms} columns={columns} />}
            {showEmpty && <Empty/> }
            {showErrors && <List dataSource={this.errors} renderItem={item => (
                    <List.Item>{item.message}</List.Item>
                )}/>}
            </Col>
            </Row>
        );
    }
}