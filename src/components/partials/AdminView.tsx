import * as React from "react";
import { IRootStore } from "../../stores/RootStore";
import {observable, action} from "mobx";
import  API, {graphqlOperation } from "@aws-amplify/api";
import * as queries from '../../graphql/queries';
import { Table, List, Spin, Empty, Row, Col, Card } from "antd";
import { observer } from "mobx-react";
import { PlanTypesView } from "./PlanTypesView";

export interface IAdminViewProps {
    store: IRootStore;
}

@observer
export class AdminView extends React.Component<IAdminViewProps, any> {

    props: IAdminViewProps
    constructor(props: IAdminViewProps) {
        super(props);
        this.props = props;
    }

    render() {
        return (<div>
            <PlanTypesView store={this.props.store} />
            <Card title="Integration Types"></Card>
        </div>)
    }
}