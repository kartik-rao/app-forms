import * as React from "react";
import { IRootStore } from "../../stores/RootStore";
import {observable, action} from "mobx";
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
    }

    @action async fetch() {
        let args = {limit: 50, nextToken: this.nextToken};
        let planTypes = await API.graphql(graphqlOperation(queries.listAllPlanTypes, args));
        this.nextToken = planTypes["nextToken"];
        this.planTypes = planTypes["items"];
        this.fetch();
    }

    render() {
        return (<div>
            <Card title="Plan Types">
                <Row type="flex" justify="center" align="middle">
                    <Spin size="large"/>
                    <Col span={20} offset={2}>

                    </Col>
                </Row>
            </Card>
        </div>)
    }
}