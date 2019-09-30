import { IListAccountsQuery, ListAccounts } from "@kartikrao/lib-forms-api";
import { Card, Col, Row, Skeleton, Typography } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { Link } from "react-router-dom";
import { withGraphQl } from "../../ApiHelper";
import { appStoreContext } from "../../stores/AppStoreProvider";
import { TableWrapper } from "../common/TableWrapper";

export const AllAccountsView : React.FC<any> = () => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        accounts: [] as IListAccountsQuery["listAccounts"],
        loading: true,
        errors: [] as any[],
        selectedItems : [] as any[],
        get showErrors() {
            return store.view.debug && this.errors;
        },
        setSelectedItems(selectedItems) {
            this.selectedItems = selectedItems;
        },
        get hasSelectedItems() {
            return this.selectedItems.length > 0;
        }
    }));

    const columns = [{
        title: 'Account Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {return <Link to={`/account/${record.id}`}>{text}</Link>}
    }, {
        title: 'Owner',
        dataIndex: 'ownedBy.email',
        key: 'owner'
    }, {
        title: 'Plan',
        dataIndex: 'plan.planType.name',
        key: 'plan'
    },
    {
        title: 'Users',
        dataIndex: 'numUsers',
        key: 'numUsers'
    },
    {
        title: 'Forms',
        dataIndex: 'numForms',
        key: 'numForms'
    }];

    React.useEffect(() => {
        let fetch  = async () => {
            localStore.loading = true;
            store.view.setLoading({show: true, message: "Loading accounts", status: "active", type : "line", percent: 100});
            try {
                let allAccounts = await withGraphQl<IListAccountsQuery>(ListAccounts);
                localStore.accounts = allAccounts.data.listAccounts;
            } catch (errorResponse) {
                console.error(errorResponse);
                localStore.errors = errorResponse.errors;
            }
            if (!localStore.accounts) {
                localStore.accounts = [];
            }
            localStore.loading = false;
            store.view.resetLoading();
        }
        fetch();
    }, []);

    return useObserver(() => {
        return <Row>
        <Col span={24} style={{padding:"25px"}}>
            {
                localStore.loading ? <Skeleton active /> :
                    <Card title={"All accounts"} style={{padding: 0}} bodyStyle={{padding:0}}
                        extra={<Typography style={{float: "right", fontWeight: 'bold', marginRight: '15px'}}>
                            {localStore.hasSelectedItems ? `Selected ${localStore.selectedItems.length} of ${localStore.accounts.length}` : ''}
                        </Typography>}>
                        <TableWrapper errors={localStore.errors}
                            data={localStore.accounts} columns={columns} bordered={true} rowKey="id"
                            pagination={false} onSelection={localStore.setSelectedItems}/>
                    </Card>
            }
        </Col>
    </Row>
    });
}