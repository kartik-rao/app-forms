import { Button, Card, Empty, Icon, Input, List, Spin, Table } from "antd";

import { PaginationConfig, TableSize } from "antd/lib/table";
import { action, computed, observable, toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import Highlighter from 'react-highlight-words';

export interface ITableWrapperColumn {
    title: string;
    dataIndex?: string;
    key: string;
    hideSearch?: boolean;
    render?: (text: string, record: any) => React.ReactNode
}

export interface ITableWrapperProps {
    columns: ITableWrapperColumn[]
    data: any[]
    borderered?: boolean;
    pagination?: PaginationConfig | false;
    size?: TableSize;
    rowKey: string;
    actions?: React.ReactFragment;
    debug?: boolean;
    errors: any[];
    loading?: boolean;
    onSelection?: any;
}

@observer
export class TableWrapper extends React.Component<ITableWrapperProps, any> {
    columns: ITableWrapperColumn[] = [];
    size: TableSize;
    bordered: boolean;
    rowKey: string;
    pagination: PaginationConfig | false;
    debug: boolean = false;
    actions: React.ReactFragment;

    @observable data: any[];
    @observable loading: boolean;
    @observable searchText: string;
    @observable searchInput: any;
    @observable selectedRowKeys: any[] = [];
    @observable searchKeys: any[];
    @observable errors: any[];

    constructor(props: ITableWrapperProps) {
        super(props);
        props.columns.forEach((column) => {
            if (column.key == "action" || column.hideSearch == true) {
                this.columns.push(column);
            } else {
                this.columns.push({
                    ...column,
                    ...this.getColumnSearchProps(column.dataIndex, column.title)
                });
            }
        });
        this.data = props.data;
        this.rowKey = props.rowKey;
        this.pagination = props.pagination || false;
        this.bordered = props.borderered || false;
        this.size = props.size || 'middle'
        this.actions = props.actions;
        this.debug = props.debug || false;
        this.errors = props.errors || [];
        this.loading = props.loading || false;
    }

    @action onSelectChange = (selectedRowKeys: any[]) => {
        this.selectedRowKeys = selectedRowKeys;
        if (this.props.onSelection) {
            this.props.onSelection(selectedRowKeys);
        }
    }

    @action handleSearch = (selectedKeys: any[], confirm: any) => {
        confirm();
        this.searchText = selectedKeys[0]
    }

    @action handleReset = (clearFilters) => {
        clearFilters();
        this.searchText = '';
    }

    @computed get hasSelected() : boolean {
        return this.selectedRowKeys.length > 0;
    }

    getColumnSearchProps = (dataIndex: string, title: string) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input ref={node => { this.searchInput = node; }} placeholder={`Search ${title}`} value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)} icon="search" size="small"
              style={{ width: 90, marginRight: 8 }} > Search </Button>
            <Button onClick={() => this.handleReset(clearFilters)}
              size="small" style={{ width: 90 }}
            > Reset </Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        // render: (text: string) => (
        //   <Highlighter highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }} searchWords={[this.searchText]}
        //     autoEscape textToHighlight={text ? text.toString(): ''}/>
        // ),
    });

    @computed get showErrors() {
        return this.debug && this.errors && this.errors.length > 0;
    }

    @computed get isEmpty() {
        return !this.data || this.data.length == 0;
    }

    render() {
        const rowSelection = {
            selectedRowKeys : this.selectedRowKeys,
            onChange : this.onSelectChange
        }
        console.log(this.columns);
        return <div>
            {!this.isEmpty && <Table rowSelection={rowSelection} dataSource={this.data} bordered={this.bordered}
                rowKey={this.rowKey} size={this.size} pagination={this.pagination}>
                    {this.columns.map((col) => {
                        return <Table.Column title={col.title}
                            dataIndex={col.dataIndex} key={col.key} render={col.render} >
                        </Table.Column>}
                    )}
                </Table>}
            {this.isEmpty && <Card><Empty/></Card> }
            {this.showErrors && <List dataSource={this.errors} renderItem={(item) => (
                <List.Item>{item.message}</List.Item>
            )}/>}
        </div>
    }
}