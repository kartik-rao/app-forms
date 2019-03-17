import { Input, Button, Card, Divider, Drawer, Empty, Icon, List, Row, Spin, Table, Tag } from "antd";
import Highlighter from 'react-highlight-words';

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
    @observable searchText: string;
    searchInput: any;


    constructor(props: IUsersViewProps) {
        super(props);
        this.props = props;
        this.users = props.users;
    }

    @action.bound async handleAdd(values: any) {
        let {authStore} = this.props.store;
        values["custom:source"] = authStore.user.username;
        values["custom:tenantId"] = authStore.tenant;
        let response = await authStore.signUp(values);

        console.log(response);
    }

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
    });

    render() {
        let user = this.props.store.authStore.user;
        console.log(user)
        const columns = [{
            title: 'First Name',
            dataIndex: 'given_name',
            key: 'given_name',
            ...this.getColumnSearchProps('given_name')
        },
        {
            title: 'Last Name',
            dataIndex: 'family_name',
            key: 'family_name',
            ...this.getColumnSearchProps('family_name')
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
            },
            ...this.getColumnSearchProps('Group')
        },
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
              <span>
                {record.id != user.username && <div><a href="javascript:;">Edit</a>
                <Divider type="vertical" />
                <a href="javascript:;">Disable</a></div>}
              </span>
            ),
          }];

        let showErrors = this.props.store.debug && this.errors;
        let showUsers  = this.users && this.users.length > 0;
        let showEmpty  = !this.users || this.users.length == 0;

        return (
            <Card title="">
                <Row type="flex" justify="start" align="middle">
                    {this.loading && <Spin size="large" />}
                    {showUsers && <Table dataSource={this.users} columns={columns} rowKey="id" bordered title={() => {
                        return <span style={{float:"right", marginRight: "10px"}}><Button type="primary" onClick={()=>{this.showAdd = true}}>Add</Button></span>
                    }}/>}
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