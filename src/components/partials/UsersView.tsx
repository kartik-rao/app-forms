import { Button, Col, Divider, Drawer, Row, Tag, Card, Spin } from "antd";
import { action, computed, observable, toJS } from "mobx";
import { observer, Observer } from "mobx-react";
import * as React from "react";
import { IRootStore } from "../../stores/RootStore";
import { TableWrapper } from "../common/TableWrapper";
import InviteUserView from "./InviteUserView";
import Typography from "antd/lib/typography"
import moment from "moment";

export interface IUsersViewProps {
    store: IRootStore;
    users: any[];
}

@observer
export class UsersView extends React.Component<IUsersViewProps, any> {
    props: IUsersViewProps;
    @observable users = [];
    @observable errors: any[];
    @observable showAdd: boolean = false;
    @observable selectedItems : any[] = [];

    constructor(props: IUsersViewProps) {
        super(props);
        this.props = props;
        this.users = props.users;
    }

    @action.bound async handleAdd(values: any) {
        let {authStore, editorStore} = this.props.store;
        values["custom:source"] = authStore.user.username;
        editorStore.showLoading();
        try {
          let response = await authStore.signUp(values);
          console.log("SIGNUP RESPONSE", response);
        } catch (error) {
            this.errors = error;
            console.log("signup error", error);
        } finally {
            editorStore.hideLoading();
        }
        this.showAdd = false;
    }

    @action.bound showAddUser(show: boolean) {
        this.showAdd = show;
    }

    @action.bound setSelectedItems(selectedItems) {
        this.selectedItems = selectedItems;
        console.log(selectedItems);
    }

    @computed get hasSelectedItems() {
        return this.selectedItems.length > 0;
    }

    render() {
        let user = this.props.store.authStore.user;
        const columns = [{
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
            dataIndex: 'group',
            key: 'group',
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
                return <Tag>{record.group}</Tag>
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
                {record.id != user.username && <div style={{textAlign: "center"}}>
                    <Button icon="setting">Edit</Button>
                    <Divider type="vertical" />
                    <Button type="danger">Disable</Button>
                </div>}
              </span>
            )
        }];

        return (
            <Row>
                <Col span={20} offset={2} style={{padding:"25px"}}>
                {/* {this.loading && <Spin size="large" />} */}
                    <Card title={"All users"} style={{padding: 0}}>
                        <Typography style={{float: "left"}}>{this.hasSelectedItems ? `Selected ${this.selectedItems.length} of ${this.users.length}` : ''}</Typography>
                        <>
                        <React.Fragment>
                            <Button icon="plus" type="primary" style={{float: 'right'}} onClick={()=>{this.showAddUser(true)}}>Add</Button>
                        </React.Fragment>
                        </>
                    </Card>
                    {<TableWrapper errors={this.errors} debug={this.props.store.debug}
                        data={this.users} columns={columns} borderered={true} rowKey="id"
                        pagination={false} onSelection={this.setSelectedItems}/>}

                    {this.showAdd && <Drawer title="Add User" placement="right" closable={true} onClose={() => this.showAdd = false} visible={this.showAdd}>
                        <InviteUserView store={this.props.store} onAdd={this.handleAdd}/>
                    </Drawer>}
                </Col>
          </Row>
        );
    }
}