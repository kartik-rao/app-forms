import API, { graphqlOperation } from "@aws-amplify/api";
import { Card, Col, Empty, List, Row, Spin, Table } from "antd";
import { useLocalStore } from "mobx-react";
import { useObserver } from "mobx-react-lite";
import * as React from "react";
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";

export const PlanTypesView: React.FC<any> = () => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        planTypes : [] as any[],
        loading: true,
        errors: [] as any[],
        get showErrors () {
            return store.view.debug && this.errors;
        },
        get showPlanTypes() {
            return !this.loading && this.planTypes && this.planTypes.length > 0;
        },
        get showEmpty() {
            return !this.loading && (!this.planTypes || this.planTypes.length == 0);
        },
        fetch : async function() {
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
    }));

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

    return useObserver(() => {
        return <div> <Card title="Plan Types">
            <Row>
                <Col span={20} offset={2}>
                    {localStore.loading && <Spin size="large" />}
                    {localStore.showPlanTypes && <Table dataSource={localStore.planTypes} columns={columns} rowKey="id"/>}
                    {localStore.showEmpty && <Empty/> }
                    {localStore.showErrors && <List dataSource={localStore.errors} renderItem={item => (
                        <List.Item>{item.message}</List.Item>
                    )}/>}
                </Col>
            </Row>
        </Card>
    </div>
    });
}

// @observer
// export class PlanTypesViewOld extends React.Component<IPlanTypesViewProps, any> {
//     props: IPlanTypesViewProps;
//     @observable planTypes = [];
//     @observable nextToken = null;
//     @observable loading: boolean = true;
//     @observable errors: any[];


//     constructor(props: IPlanTypesViewProps) {
//         super(props);
//         this.props = props;
//         this.fetch();
//     }

//     @computed get showErrors () {
//         return this.props.store.debug && this.errors;
//     }

//     @computed get showPlanTypes() {
//         return !this.loading && this.planTypes && this.planTypes.length > 0;
//     }

//     @computed get showEmpty() {
//         return !this.loading && (!this.planTypes || this.planTypes.length == 0);
//     }

//     @action async fetch() {
//         try {
//             let planTypes = await API.graphql(graphqlOperation(queries.listPlanTypes));
//             this.planTypes = planTypes["data"]["listPlanTypes"];
//         }  catch (errorResponse) {
//             console.error(errorResponse);
//             this.errors = errorResponse.errors;
//         }
//         if (!this.planTypes) {
//             this.planTypes = [];
//         }
//         this.loading = false;
//     }

//     render() {
//         const columns = [{
//             title: 'Plan Name',
//             dataIndex: 'name',
//             key: 'name'
//         }, {
//             title: 'Owner',
//             dataIndex: 'ownedBy.email',
//             key: 'owner'
//         }, {
//             title: 'Cost',
//             dataIndex: 'cost',
//             key: 'cost'
//         }];
//         return (<div>
//             <Card title="Plan Types">
//                 <Row>
//                     <Col span={20} offset={2}>
//                         {this.loading && <Spin size="large" />}
//                         {this.showPlanTypes && <Table dataSource={this.planTypes} columns={columns} rowKey="id"/>}
//                         {this.showEmpty && <Empty/> }
//                         {this.showErrors && <List dataSource={this.errors} renderItem={item => (
//                             <List.Item>{item.message}</List.Item>
//                         )}/>}
//                     </Col>
//                 </Row>
//             </Card>
//         </div>)
//     }
// }