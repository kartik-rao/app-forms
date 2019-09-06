import API, { graphqlOperation } from "@aws-amplify/api";
import { Card, Col, Row, Typography, Skeleton } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";
import { TableWrapper } from "../common/TableWrapper";
import { Link } from "react-router-dom";

export const AllAccountsView : React.FC<any> = () => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        accounts: [] as any[],
        loading: true,
        errors: [] as any[],
        selectedItems : [] as any[],
        get showErrors() {
            return store.view.debug && this.errors;
        },
        setSelectedItems(selectedItems) {
            this.selectedItems = selectedItems;
            console.log(selectedItems);
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
                let allAccounts = await API.graphql(graphqlOperation(queries.listAccounts));
                localStore.accounts = allAccounts['data']['listAccounts'];
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
        <Col span={20} offset={2}  style={{padding:"25px"}}>
            {
                localStore.loading ? <Skeleton active /> :
                <>
                    <Card title={"All accounts"} style={{padding: 0}}>
                        <Typography style={{float: "left"}}>{localStore.hasSelectedItems ? `Selected ${localStore.selectedItems.length} of ${localStore.accounts.length}` : ''}</Typography>
                    </Card>
                    {<TableWrapper errors={localStore.errors} debug={store.view.debug}
                        data={localStore.accounts} columns={columns} bordered={true} rowKey="id"
                        pagination={false} onSelection={localStore.setSelectedItems}/>}
                </>
            }
        </Col>
    </Row>
    });
}