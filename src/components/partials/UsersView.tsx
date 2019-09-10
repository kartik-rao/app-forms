import API, { graphqlOperation } from "@aws-amplify/api";
import { Button, Card, Col, Drawer, Row, Skeleton, Tag } from "antd";
import Typography from "antd/lib/typography";
import { autorun, toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import moment from "moment";
import * as React from "react";
import { StringFilterExpression, UserFilterInput } from "../../Amplify";
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";
import { TableWrapper } from "../common/TableWrapper";
import InviteUserView from "./InviteUserView";
import { RouteComponentProps } from "react-router-dom";

export interface IUsersViewProps {
    // onUpdate?: () => void;
    accountId: string;
}

export const UsersView: React.FC<RouteComponentProps<IUsersViewProps>> = ({match}) => {
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
            //   props.onUpdate ? props.onUpdate() : void(0);
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
            store.view.setLoading({show: true, message: "Loading users", status: "active", type : "line", percent: 100});
            let query = "";
            console.log("in useEffect", "Attributes", toJS(store.auth.attributes), "isAdmin", store.auth.isAdmin, "Tenant", store.auth.tenant);
            try {
                if (store.auth.isAdmin == true) {
                    let filter : UserFilterInput;
                    if (match.params.accountId) {
                        filter = {criteria:[{"accountId":{expression: StringFilterExpression.eq, value: [match.params.accountId]}}]}
                    }
                    query = "ListUsers";
                    let response = await API.graphql(graphqlOperation(queries.listUsers, {filter : filter}));
                    localStore.users = response['data']['listUsers']
                } else {
                    query = "GetAccount";
                    let response = await API.graphql(graphqlOperation(queries.getAccount, {"$accountId": store.auth.tenant}));
                    localStore.users = response['data']['getAccount']['users']
                }
            } catch (errorResponse) {
                console.log(query, errorResponse.errors);
                localStore.errors = errorResponse.errors;
            }
            if (!localStore.users) {
                localStore.users = [];
            }
            store.view.resetLoading();
            localStore.loading = false;
        }
        autorun(()=>{
            store.auth.tenant;
            fetch();
        });
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
