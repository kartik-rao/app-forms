import { Button, Card, Empty, Icon, Input, List, Table, Result } from "antd";
import { PaginationConfig, TableSize } from "antd/lib/table";
import { useLocalStore } from "mobx-react-lite";
import { useObserver } from "mobx-react-lite";
import * as React from "react";
import { appStoreContext } from "../../stores/AppStoreProvider";

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
    bordered?: boolean;
    pagination?: PaginationConfig | false;
    size?: TableSize;
    rowKey: string;
    actions?: React.ReactFragment;
    errors: any[];
    onSelection?: any;
}

export const TableWrapper : React.FC<ITableWrapperProps> = (props: ITableWrapperProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const local = useLocalStore(() => ({
        data : props.data as any[],
        rowKey : props.rowKey as string,
        pagination : props.pagination || false as PaginationConfig | false,
        bordered : props.bordered || false,
        size : props.size || 'middle',
        actions : props.actions,
        debug : store.config.debug,
        errors : props.errors || [],
        onSelection : props.onSelection,
        searchText: null as string,
        searchInput: null as any,
        selectedRowKeys: [] as any[],
        searchKeys: null as any[],
        get columns() {
            let cols = [] as ITableWrapperColumn[];
            props.columns.forEach((column) => {
                if (column.key == "action" || column.hideSearch == true) {
                    cols.push(column);
                } else {
                    cols.push({
                        ...column,
                        ...this.getColumnSearchProps(column.dataIndex, column.title)
                    });
                }
            });
            return cols
        },
        getColumnSearchProps : function (dataIndex: string, title: string) {
            return {
                filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
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
                }
            }
        },
        onSelectChange : function (selectedRowKeys: any[]) {
            this.selectedRowKeys = selectedRowKeys;
            if (props.onSelection) {
                props.onSelection(selectedRowKeys);
            }
        },
        handleSearch : function (selectedKeys: any[], confirm: any) {
            confirm();
            this.searchText = selectedKeys[0]
        },
        handleReset : function (clearFilters) {
            clearFilters();
            this.searchText = '';
        },
        get hasSelected() : boolean {
            return this.selectedRowKeys.length > 0;
        },
        get hasErrors() {
            return this.errors && this.errors.length > 0;
        },
        get isEmpty() {
            return !this.data || this.data.length == 0;
        }
    }));

    const ErrorList = (
        local.debug ? <List>
            {local.errors.map((e, i) => {
                return <List.Item key={e.errorType}>{e.message}</List.Item>
            })}
        </List> : <></>
    );

    return useObserver(() => {
        return <div>
        {!local.isEmpty && !local.hasErrors && <Table rowSelection={{selectedRowKeys : local.selectedRowKeys, onChange : local.onSelectChange }}
            dataSource={local.data} bordered={local.bordered} rowKey={local.rowKey} size={local.size}
            pagination={local.pagination} columns={local.columns}/>}
        {local.isEmpty && !local.hasErrors && <Card><Empty/></Card>}
        {local.hasErrors &&
            <Result
            status="error"
            title="There was an error running this operation."
            extra={ErrorList}
          />
        }
    </div>
    })
}