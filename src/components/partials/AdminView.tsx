import { Card } from "antd";
import * as React from "react";
import { PlanTypesView } from "./PlanTypesView";

export const AdminView : React.FC<any> = () => {
    return <div>
        <PlanTypesView store={this.props.store} />
        <Card title="Integration Types"></Card>
    </div>
}
