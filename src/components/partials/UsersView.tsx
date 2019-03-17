import { Card, Divider, Drawer, Empty, Icon, List, Row, Spin, Table, Tag } from "antd";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { IRootStore } from "../../stores/RootStore";
import InviteUserView from "./InviteUserView";


export interface IUsersViewProps {
    store: IRootStore;
    users: any[];
}

@observer
export class UsersView extends React.Component<IUsersViewProps, any> {
    props: IUsersViewProps;
    @observable users = [];
    @observable nextToken = null;
    @observable loading: boolean = false;
    @observable errors: any[];
    @observable showAdd: boolean = false;

    @action handleAdd() {

    }

    constructor(props: IUsersViewProps) {
        super(props);
        this.props = props;
        this.users = props.users;
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
            key: 'email'
        }, {
            title: 'Group',
            dataIndex: 'group',
            key: 'group',
            render: (text, record) => {
                return <Tag>{record.group}</Tag>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                {record.id != user.id && <div><a href="javascript:;">Edit {record.name}</a>
                <Divider type="vertical" />
                <a href="javascript:;">Remove</a></div>}
              </span>
            ),
          }];

        let showErrors = this.props.store.debug && this.errors;
        let showUsers = !this.showAdd && this.users && this.users.length > 0;
        let showEmpty = !this.showAdd && (!this.users || this.users.length == 0);

        return (
            // <PageHeader></PageHeader>
            <Card title="" actions={[<Icon type="plus" onClick={() => this.showAdd = true}/>]}>
                <Row type="flex" justify="start" align="middle">
                    {this.loading && <Spin size="large" />}
                    {showUsers && <Table dataSource={this.users} columns={columns} rowKey="id"/>}
                    {showEmpty && <Empty/> }
                    {showErrors && <List dataSource={this.errors} renderItem={item => (
                        <List.Item>{item.message}</List.Item>
                    )}/>}
                    {this.showAdd && <Drawer title="Add User" placement="right" closable={true} onClose={() => this.showAdd = false} visible={this.showAdd}>
                        <InviteUserView store={this.props.store} onAdd={this.handleAdd}/>
                    </Drawer>}
                </Row>
            </Card>
        );
    }
}