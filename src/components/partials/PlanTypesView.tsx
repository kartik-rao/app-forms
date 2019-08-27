import * as React from "react";
import { IRootStore } from "../../stores/RootStore";
import {observable, action, computed} from "mobx";
import  API, {graphqlOperation } from "@aws-amplify/api";
import * as queries from '../../graphql/queries';
import { Table, List, Spin, Empty, Row, Col, Card } from "antd";
import { observer } from "mobx-react";

export interface IPlanTypesViewProps {
    store: IRootStore;
}

@observer
export class PlanTypesView extends React.Component<IPlanTypesViewProps, any> {
    props: IPlanTypesViewProps;
    @observable planTypes = [];
    @observable nextToken = null;
    @observable loading: boolean = true;
    @observable errors: any[];


    constructor(props: IPlanTypesViewProps) {
        super(props);
        this.props = props;
        this.fetch();
    }

    @computed get showErrors () {
        return this.props.store.debug && this.errors;
    }

    @computed get showPlanTypes() {
        return !this.loading && this.planTypes && this.planTypes.length > 0;
    }

    @computed get showEmpty() {
        return !this.loading && (!this.planTypes || this.planTypes.length == 0);
    }

    @action async fetch() {
        try {
            let planTypes = await API.graphql(graphqlOperation(queries.listPlanTypes));
            this.planTypes = planTypes["data"]["listPlanTypes"];
        }  catch (errorResponse) {
            console.error(errorResponse);
            this.errors = errorResponse.errors;
        }
        if (!this.planTypes) {
            this.planTypes = [];
        }
        this.loading = false;
    }

    render() {
        const columns = [{
            title: 'Plan Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Owner',
            dataIndex: 'ownedBy.email',
            key: 'owner'
        }, {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost'
        }];
        return (<div>
            <Card title="Plan Types">
                <Row>
                    <Col span={20} offset={2}>
                        {this.loading && <Spin size="large" />}
                        {this.showPlanTypes && <Table dataSource={this.planTypes} columns={columns} rowKey="id"/>}
                        {this.showEmpty && <Empty/> }
                        {this.showErrors && <List dataSource={this.errors} renderItem={item => (
                            <List.Item>{item.message}</List.Item>
                        )}/>}
                    </Col>
                </Row>
            </Card>
        </div>)
    }
}