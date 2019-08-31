import API, { graphqlOperation } from "@aws-amplify/api";
import gql from 'graphql-tag';
import { Button, Card, Col, Drawer, Row, Tag, Skeleton } from "antd";
import Typography from "antd/lib/typography";
import { useLocalStore, useObserver } from "mobx-react";
import moment from "moment";
import * as React from "react";
import { appStoreContext } from "../../stores/AppStoreProvider";
import { TableWrapper } from "../common/TableWrapper";
import InviteUserView from "./InviteUserView";
import * as queries from '../../graphql/queries';
import { Loading } from "../common/Loading";

export interface IUsersViewProps {
    onUpdate?: () => void;
}

export const UsersView: React.FC<IUsersViewProps> = (props: IUsersViewProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        errors: [] as any[],
        users : [] as any[],
        showAdd:  false,
        selectedItems : [] as any[],
        loading: true,
        handleAdd : async function(values: any) {
            let {store} = this.props;
            let {authStore} = store;
            values["custom:source"] = authStore.user.username;
            this.loading = true;
            try {
              await authStore.signUp(values);
              props.onUpdate ? props.onUpdate() : void(0);
            } catch (error) {
                this.errors = error;
                console.log("signup error", error);
            } finally {
                store.hideLoading();
            }
            this.showAdd = false;
        },
        showAddUser: function (show: boolean) {
            this.showAdd = show;
        },
        setSelectedItems: function (selectedItems) {
            this.selectedItems = selectedItems;
            console.log(selectedItems);
        },
        get hasSelectedItems() {
            return this.selectedItems.length > 0;
        }
    }));

    const columns = [
    {
        title: 'Account',
        dataIndex: 'account',
        key: 'account_name',
        render: (text, record) => {
            return <span>{record.account ? record.account.name : '-'}</span>
        }
    },
    {
        title: 'First Name',
        dataIndex: 'given_name',
        key: 'given_name'
    },
    {
        title: 'Last Name',
        dataIndex: 'family_name',
        key: 'family_name'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text, record) => {
          return <a href={`mailto:${record.email}`}>{record.email}</a>
        }
    }, {
        title: 'Group',
        dataIndex: 'userGroup',
        key: 'userGroup',
        filters: [{
            text: 'AccountAdmin',
            value: 'AccountAdmin',
          }, {
            text: 'Editor',
            value: 'Editor',
        }, {
            text: 'Viewer',
            value: 'Viewer',
        }],
        render: (text, record) => {
            let color = record.userGroup == 'AccountAdmin' ? 'red' : (record.userGroup == 'Editor' ? 'orange' : 'green')
            return <Tag color={color}>{record.userGroup}</Tag>
        },
    },
    {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        defaultSortOrder: 'descend',
        render: (text, record) => {
            return <span>{moment(text).format("Do MMMM YYYY hh:mm A")}</span>
        },
        sorter: (a, b) => {;
            return moment(a["createdAt"]).diff(moment(b["createdAt"]))
        },
        sortDirections: ['descend', 'ascend']
    },
    {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <span>
            <div style={{textAlign: "center"}}>
                <Button icon="setting">Edit</Button>
            </div>
          </span>
        )
    }];

    React.useEffect(() => {
        async function fetch () {
            localStore.loading = true;
            try {
                if (store.auth.isAdmin) {
                    console.log("Admin Query")
                    let response = await API.graphql(graphqlOperation(queries.listUsers))
                    localStore.users = response['data']['listUsers']
                } else {
                    console.log("AccountAdmin Query")
                    let response = await API.graphql(graphqlOperation(queries.getAccount, {"$accountId": store.auth.tenant}));
                    localStore.users = response['data']['getAccount']['users']
                }
            } catch (errorResponse) {
                console.error(errorResponse);
                localStore.errors = errorResponse.errors;
            }
            if (!localStore.users) {
                localStore.users = [];
            }
            localStore.loading = false;
        }
        fetch();
    }, [])

    return useObserver(() => {
        return <Row>
        <Col span={20} offset={2} style={{padding:"25px"}}>
            {
                localStore.loading ? <Skeleton active />:
                <>
                    <Card title={"All users"} style={{padding: 0}}>
                        <Typography style={{float: "left"}}>{localStore.hasSelectedItems ? `Selected ${localStore.selectedItems.length} of ${localStore.users.length}` : ''}</Typography>
                        <>
                        <React.Fragment>
                            <Button icon="plus" type="primary" style={{float: 'right'}} onClick={()=>{localStore.showAddUser(true)}}>Add</Button>
                        </React.Fragment>
                        </>
                    </Card>
                    {<TableWrapper errors={localStore.errors} debug={store.view.debug}
                        data={localStore.users} columns={columns} bordered={true} rowKey="id"
                        pagination={false} onSelection={localStore.setSelectedItems}/>}
                </>
            }
            {localStore.showAdd && <Drawer title="Add User" placement="right" closable={true} onClose={() => localStore.showAdd = false} visible={localStore.showAdd}>
                <InviteUserView onAdd={localStore.handleAdd}/>
            </Drawer>}
        </Col>
  </Row>
    })
}
