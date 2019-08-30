var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Button, Card, Empty, Icon, Input, List, Table } from "antd";
import { action, computed, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
let TableWrapper = class TableWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [];
        this.debug = false;
        this.selectedRowKeys = [];
        this.onSelectChange = (selectedRowKeys) => {
            this.selectedRowKeys = selectedRowKeys;
            if (this.props.onSelection) {
                this.props.onSelection(selectedRowKeys);
            }
        };
        this.handleSearch = (selectedKeys, confirm) => {
            confirm();
            this.searchText = selectedKeys[0];
        };
        this.handleReset = (clearFilters) => {
            clearFilters();
            this.searchText = '';
        };
        this.getColumnSearchProps = (dataIndex, title) => ({
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (React.createElement("div", { style: { padding: 8 } },
                React.createElement(Input, { ref: node => { this.searchInput = node; }, placeholder: `Search ${title}`, value: selectedKeys[0], onChange: e => setSelectedKeys(e.target.value ? [e.target.value] : []), onPressEnter: () => this.handleSearch(selectedKeys, confirm), style: { width: 188, marginBottom: 8, display: 'block' } }),
                React.createElement(Button, { type: "primary", onClick: () => this.handleSearch(selectedKeys, confirm), icon: "search", size: "small", style: { width: 90, marginRight: 8 } }, " Search "),
                React.createElement(Button, { onClick: () => this.handleReset(clearFilters), size: "small", style: { width: 90 } }, " Reset "))),
            filterIcon: filtered => React.createElement(Icon, { type: "search", style: { color: filtered ? '#1890ff' : undefined } }),
            onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => this.searchInput.select());
                }
            }
        });
        props.columns.forEach((column) => {
            if (column.key == "action" || column.hideSearch == true) {
                this.columns.push(column);
            }
            else {
                this.columns.push(Object.assign({}, column, this.getColumnSearchProps(column.dataIndex, column.title)));
            }
        });
        this.data = props.data;
        this.rowKey = props.rowKey;
        this.pagination = props.pagination || false;
        this.bordered = props.borderered || false;
        this.size = props.size || 'middle';
        this.actions = props.actions;
        this.debug = props.debug || false;
        this.errors = props.errors || [];
    }
    get hasSelected() {
        return this.selectedRowKeys.length > 0;
    }
    get showErrors() {
        return this.debug && this.errors && this.errors.length > 0;
    }
    get isEmpty() {
        return !this.data || this.data.length == 0;
    }
    render() {
        const rowSelection = {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
        };
        return React.createElement("div", null,
            !this.isEmpty && React.createElement(Table, { rowSelection: rowSelection, dataSource: this.data, bordered: this.bordered, rowKey: this.rowKey, size: this.size, pagination: this.pagination, columns: this.columns }),
            this.isEmpty && React.createElement(Card, null,
                React.createElement(Empty, null)),
            this.showErrors && React.createElement(List, { dataSource: this.errors, renderItem: (item) => (React.createElement(List.Item, null, item.message)) }));
    }
};
__decorate([
    observable
], TableWrapper.prototype, "data", void 0);
__decorate([
    observable
], TableWrapper.prototype, "searchText", void 0);
__decorate([
    observable
], TableWrapper.prototype, "searchInput", void 0);
__decorate([
    observable
], TableWrapper.prototype, "selectedRowKeys", void 0);
__decorate([
    observable
], TableWrapper.prototype, "searchKeys", void 0);
__decorate([
    observable
], TableWrapper.prototype, "errors", void 0);
__decorate([
    action
], TableWrapper.prototype, "onSelectChange", void 0);
__decorate([
    action
], TableWrapper.prototype, "handleSearch", void 0);
__decorate([
    action
], TableWrapper.prototype, "handleReset", void 0);
__decorate([
    computed
], TableWrapper.prototype, "hasSelected", null);
__decorate([
    computed
], TableWrapper.prototype, "showErrors", null);
__decorate([
    computed
], TableWrapper.prototype, "isEmpty", null);
TableWrapper = __decorate([
    observer
], TableWrapper);
export { TableWrapper };
//# sourceMappingURL=TableWrapper.js.map