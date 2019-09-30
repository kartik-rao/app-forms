import { Card, Col, Row, Skeleton, Tag, Typography } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { appStoreContext } from "../../stores/AppStoreProvider";
import { TableWrapper } from "../common/TableWrapper";
import { withGraphQl } from "../../ApiHelper";
import { IListPlanTypesQuery, ListPlanTypes } from "@kartikrao/lib-forms-api";

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
        },
        get hasSelectedItems() {
            return this.selectedItems.length > 0;
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
                let planTypes = await withGraphQl<IListPlanTypesQuery>(ListPlanTypes);
                localStore.planTypes = planTypes.data.listPlanTypes;
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
            <Col span={24} style={{padding: "25px"}}>
                {
                    localStore.loading ? <Skeleton active /> :
                    <Card title={"Plan Types"} style={{padding: 0}} extra={<Typography style={{float: "left"}}></Typography>}>
                        <TableWrapper errors={localStore.errors}
                        data={localStore.planTypes} columns={columns} bordered={true} rowKey="id"
                        pagination={false} onSelection={localStore.setSelectedItems}/>
                    </Card>
                }
            </Col>
        </Row>
    });
}
