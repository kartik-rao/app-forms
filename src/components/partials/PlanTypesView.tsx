import API, { graphqlOperation } from "@aws-amplify/api";
import { Card, Col, Row, Skeleton, Tag, Typography } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";
import { TableWrapper } from "../common/TableWrapper";

export const PlanTypesView: React.FC<any> = () => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        planTypes : [] as any[],
        loading: true,
        errors: [] as any[],
        selectedItems : [] as any[],
        get showErrors () {
            return store.view.debug && this.errors;
        },
        get showPlanTypes() {
            return this.planTypes && this.planTypes.length > 0;
        },
        setSelectedItems(selectedItems) {
            this.selectedItems = selectedItems;
            console.log(selectedItems);
        },
        get hasSelectedItems() {
            return this.selectedItems.length > 0;
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
        key: 'cost',
        sorter: (a, b) => {;
            return a["cost"] - b["cost"];
        },
        render: (text, record) => {
            return `$${record.cost}`;
        },
        sortDirections: ['descend', 'ascend']
    },
    {
        title: 'Billing Term',
        dataIndex: 'billingTerm',
        key: 'billingTerm'
    },
    {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        render: (text, record) => {
            let color = record.active == 0 ? 'red' :  'green';
            return <Tag color={color}>{record.active == 1 ? 'Yes' : 'No'}</Tag>
        },
        sorter: (a, b) => {;
            return a["active"] - b["active"];
        },
        sortDirections: ['descend', 'ascend']
    }];

    React.useEffect(() => {
        let fetch = async () => {
            try {
                let planTypes = await API.graphql(graphqlOperation(queries.listPlanTypes));
                localStore.planTypes = planTypes["data"]["listPlanTypes"];
            }  catch (errorResponse) {
                console.error(errorResponse);
                localStore.errors = errorResponse.errors;
            }
            if (!localStore.planTypes) {
                localStore.planTypes = [];
            }
            localStore.loading = false;
        }
        fetch();
    }, []);

    return useObserver(() => {
        return <Row>
            <Col span={20} offset={2} style={{padding: "25px"}}>
                {
                    localStore.loading ? <Skeleton active /> :
                    <>
                    <Card title={"Plan Types"} style={{padding: 0}}>
                        <Typography style={{float: "left"}}></Typography>
                    </Card>
                    {<TableWrapper errors={localStore.errors} debug={store.view.debug}
                    data={localStore.planTypes} columns={columns} bordered={true} rowKey="id"
                    pagination={false} onSelection={localStore.setSelectedItems}/>}
                    </>
                }
            </Col>
        </Row>
    });
}
