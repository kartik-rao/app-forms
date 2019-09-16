import API, { graphqlOperation } from "@aws-amplify/api";
import { Button, Card, Col, Drawer, Row, Skeleton, Tag } from "antd";
import Typography from "antd/lib/typography";
import { autorun } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import dayjs from 'dayjs';
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { StringFilterExpression, UserFilterInput } from "../../Amplify";
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";
import { TableWrapper } from "../common/TableWrapper";
import InviteUserView from "./InviteUserView";

export interface IUsersViewProps {
    accountId: string;
}

export const UsersView: React.FC<RouteComponentProps<IUsersViewProps>> = ({match}) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");
    const now = dayjs();

    const config = store.config.envConfig;
    const localStore = useLocalStore(() => ({
        errors: [] as any[],
        users : [] as any[],
        showAdd:  false,
        selectedItems : [] as any[],
        loading: true,
        handleAdd : async function(values: any) {
            values["custom:source"] = store.auth.user.getUsername();
            this.loading = true;
            try {
                store.view.setLoading({show: true, message: "Adding User", status: "active", type : "line", percent: 100});
                await store.auth.signUp(config.api.rest.endpoint, values);
            } catch (error) {
                this.errors = error;
                console.log("signup error", error);
            } finally {
                store.view.resetLoading();
            }
            this.showAdd = false;
        },
        showAddUser: function (show: boolean) {
            this.showAdd = show;
        },
        setSelectedItems: function (selectedItems) {
            this.selectedItems = selectedItems;
        },
        get hasSelectedItems() {
            return this.selectedItems.length > 0;
        }
    }));

    const columns = [
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
            value: 'AccountEditor',
        }, {
            text: 'AccountViewer',
            value: 'Viewer',
        }],
        render: (text, record) => {
            let color = record.userGroup == 'AccountAdmin' ? 'red' : (record.userGroup == 'AccountEditor' ? 'orange' : record.userGroup == 'AccountViewer' ? 'green' : 'blue');
            return <Tag color={color}>{record.userGroup}</Tag>
        },
    },
    {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        defaultSortOrder: 'descend',
        render: (text, record) => {
            let created = dayjs(record.createdAt);
            let date = created.year() != now.year() ? created.format('D MMM YY hh:mm a') : created.format('D MMM hh:mm a')
            return <span>{date}</span>
        },
        sorter: (a, b) => {;
            return dayjs(a["createdAt"]).diff(dayjs(b["createdAt"]))
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

    if(!match.params.accountId && store.auth.isAdmin) {
        columns.unshift({
            title: 'Account',
            dataIndex: 'account',
            key: 'account_name',
            render: (text, record) => {
                return <span>{record.account ? record.account.name : '-'}</span>
            }
        })
    }

    React.useEffect(() => {
        async function fetch () {
            localStore.loading = true;
            store.view.setLoading({show: true, message: "Loading users", status: "active", type : "line", percent: 100});
            let query = "";
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
        <Col span={24} style={{padding:"25px"}}>
            {
                localStore.loading ? <Skeleton active />:
                    <Card title={"All users"} style={{padding: 0}} bodyStyle={{padding: 0}} extra={
                        <>
                        <React.Fragment>
                            <Button icon="plus" type="primary" style={{float: 'right'}} onClick={()=>{localStore.showAddUser(true)}}>Add</Button>
                            <Typography style={{fontWeight:'bold', float: "right", marginRight:'15px', marginTop: '6px'}}>{localStore.hasSelectedItems ? `Selected ${localStore.selectedItems.length} of ${localStore.users.length}` : ''}</Typography>
                        </React.Fragment></>
                        }>
                        <TableWrapper errors={localStore.errors} data={localStore.users} columns={columns} bordered={true} rowKey="id"
                            pagination={false} onSelection={localStore.setSelectedItems}/>
                    </Card>
            }
            {localStore.showAdd && <Drawer title="Add User" placement="right" closable={true} onClose={() => localStore.showAdd = false} visible={localStore.showAdd}>
                <InviteUserView onAdd={localStore.handleAdd}/>
            </Drawer>}
        </Col>
  </Row>
    })
}
