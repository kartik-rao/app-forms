var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Button, Col, Drawer, Row, Tag, Card } from "antd";
import { action, computed, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { TableWrapper } from "../common/TableWrapper";
import InviteUserView from "./InviteUserView";
import Typography from "antd/lib/typography";
import moment from "moment";
let UsersView = class UsersView extends React.Component {
    constructor(props) {
        super(props);
        this.users = [];
        this.showAdd = false;
        this.selectedItems = [];
        this.props = props;
        this.users = props.users;
    }
    handleAdd(values) {
        return __awaiter(this, void 0, void 0, function* () {
            let { store } = this.props;
            let { authStore } = store;
            values["custom:source"] = authStore.user.username;
            store.showLoading();
            try {
                yield authStore.signUp(values);
                this.props.onUpdate ? this.props.onUpdate() : void (0);
            }
            catch (error) {
                this.errors = error;
                console.log("signup error", error);
            }
            finally {
                store.hideLoading();
            }
            this.showAdd = false;
        });
    }
    showAddUser(show) {
        this.showAdd = show;
    }
    setSelectedItems(selectedItems) {
        this.selectedItems = selectedItems;
        console.log(selectedItems);
    }
    get hasSelectedItems() {
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
                    return React.createElement("a", { href: `mailto:${record.email}` }, record.email);
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
                    let color = record.group == 'AccountAdmin' ? 'red' : (record.group == 'Editor' ? 'orange' : 'green');
                    return React.createElement(Tag, { color: color }, record.group);
                },
            },
            {
                title: 'Created',
                dataIndex: 'createdAt',
                key: 'createdAt',
                defaultSortOrder: 'descend',
                render: (text, record) => {
                    return React.createElement("span", null, moment(text).format("Do MMMM YYYY hh:mm A"));
                },
                sorter: (a, b) => {
                    ;
                    return moment(a["createdAt"]).diff(moment(b["createdAt"]));
                },
                sortDirections: ['descend', 'ascend']
            },
            {
                title: 'Actions',
                key: 'action',
                render: (text, record) => (React.createElement("span", null,
                    React.createElement("div", { style: { textAlign: "center" } },
                        React.createElement(Button, { icon: "setting" }, "Edit"))))
            }];
        return (React.createElement(Row, null,
            React.createElement(Col, { span: 20, offset: 2, style: { padding: "25px" } },
                React.createElement(Card, { title: "All users", style: { padding: 0 } },
                    React.createElement(Typography, { style: { float: "left" } }, this.hasSelectedItems ? `Selected ${this.selectedItems.length} of ${this.users.length}` : ''),
                    React.createElement(React.Fragment, null,
                        React.createElement(React.Fragment, null,
                            React.createElement(Button, { icon: "plus", type: "primary", style: { float: 'right' }, onClick: () => { this.showAddUser(true); } }, "Add")))),
                React.createElement(TableWrapper, { errors: this.errors, debug: this.props.store.debug, data: this.users, columns: columns, borderered: true, rowKey: "id", pagination: false, onSelection: this.setSelectedItems }),
                this.showAdd && React.createElement(Drawer, { title: "Add User", placement: "right", closable: true, onClose: () => this.showAdd = false, visible: this.showAdd },
                    React.createElement(InviteUserView, { store: this.props.store, onAdd: this.handleAdd })))));
    }
};
__decorate([
    observable
], UsersView.prototype, "users", void 0);
__decorate([
    observable
], UsersView.prototype, "errors", void 0);
__decorate([
    observable
], UsersView.prototype, "showAdd", void 0);
__decorate([
    observable
], UsersView.prototype, "selectedItems", void 0);
__decorate([
    action.bound
], UsersView.prototype, "handleAdd", null);
__decorate([
    action.bound
], UsersView.prototype, "showAddUser", null);
__decorate([
    action.bound
], UsersView.prototype, "setSelectedItems", null);
__decorate([
    computed
], UsersView.prototype, "hasSelectedItems", null);
UsersView = __decorate([
    observer
], UsersView);
export { UsersView };
//# sourceMappingURL=UsersView.js.map