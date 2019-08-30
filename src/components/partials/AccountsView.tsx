import API, { graphqlOperation } from "@aws-amplify/api";
import { Col, Empty, List, Row, Spin, Table } from "antd";
import { useLocalStore } from "mobx-react";
import * as React from "react";
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";

export const AccountsView : React.FC<any> = () => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        accounts: [],
        loading: false,
        errors: [],
        get showErrors() {
            return store.view.debug && this.errors;
        },
        get showAccounts() {
            return !this.loading && this.accounts && this.accounts.length > 0;
        },
        get showEmpty() {
            return !this.loading && (!this.accounts || this.accounts.length == 0);
        },
        fetch : async function () {
            this.loading = true;
            try {
                let allAccounts = await API.graphql(graphqlOperation(queries.listAccounts));
                this.accounts = allAccounts['data']['listAccounts'];
            } catch (errorResponse) {
                console.error(errorResponse);
                this.errors = errorResponse.errors;
            }
            if (!this.accounts) {
                this.accounts = [];
            }
            this.loading = false;
        }
    }));

    const columns = [{
        title: 'Account Name',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: 'Owner',
        dataIndex: 'ownedBy.email',
        key: 'owner'
    }, {
        title: 'Plan',
        dataIndex: 'planId',
        key: 'planId'
    }];

    return <Row>
        <Col span={20} offset={2}>
            {localStore.loading && <Spin size="large" />}
            {localStore.showAccounts && <Table dataSource={this.accounts} columns={columns} rowKey="id"/>}
            {localStore.showEmpty && <Empty/> }
            {localStore.showErrors && <List dataSource={localStore.errors} renderItem={item => (
                <List.Item>{item.message}</List.Item>
            )}/>}
        </Col>
    </Row>
}