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
import API, { graphqlOperation } from "@aws-amplify/api";
import { Button, Card, Col, Row, Drawer, Divider } from "antd";
import Typography from "antd/lib/typography";
import { action, computed, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { TableWrapper } from "../common/TableWrapper";
import AddFormView from "./AddFormView";
import moment from "moment";
let FormsView = class FormsView extends React.Component {
    constructor(props) {
        super(props);
        this.forms = [];
        this.nextToken = null;
        this.showAdd = false;
        this.selectedItems = [];
        this.props = props;
        this.fetch();
    }
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            let { store } = this.props;
            let { authStore } = this.props.store;
            let { tenant } = authStore;
            let args = { accountId: tenant };
            store.showLoading();
            try {
                response = yield API.graphql(graphqlOperation(queries.getAccount, args));
                let { forms } = response.data.getAccount;
                if (forms && forms.items) {
                    this.forms = forms.items;
                    this.nextToken = forms.nextToken;
                }
            }
            catch (errorResponse) {
                this.errors = errorResponse.errors;
            }
            store.hideLoading();
        });
    }
    handleAdd(values) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("FormsView.handleAdd values", values);
            let addFormResponse;
            let { store } = this.props;
            store.showLoading();
            try {
                addFormResponse = yield API.graphql(graphqlOperation(mutations.addForm, { form: values, notes: "Form initialized" }));
                console.log("handleAdd Response", addFormResponse);
                if (addFormResponse.errors) {
                    this.errors = addFormResponse.errors;
                }
                else {
                    this.fetch();
                }
            }
            catch (errorResponse) {
                this.errors = errorResponse.errors;
            }
            console.log(this.errors);
            this.showAdd = false;
            store.hideLoading();
        });
    }
    setSelectedItems(selectedItems) {
        this.selectedItems = selectedItems;
    }
    showAddForm(show) {
        this.showAdd = show;
    }
    get hasSelectedItems() {
        return this.selectedItems.length > 0;
    }
    render() {
        const columns = [{
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: 'Description',
                dataIndex: 'desc',
                key: 'desc'
            },
            {
                title: 'Owner',
                key: 'ownedBy',
                render: (text, record) => { return React.createElement("a", { href: "mailto:`${record.ownedBy.email}`" }, record.ownedBy.email); }
            },
            {
                title: 'Created',
                dataIndex: 'createdAt',
                key: 'createdAt',
                defaultSortOrder: 'descend',
                sorter: (a, b) => {
                    ;
                    return moment(a["createdAt"]).diff(moment(b["createdAt"]));
                },
                sortDirections: ['descend', 'ascend'],
                render: (text, record) => {
                    return React.createElement("span", null, moment(text).format("Do MMMM YYYY hh:mm A"));
                }
            },
            {
                title: 'Starts',
                dataIndex: 'startsAt',
                key: 'startsAt',
                render: (text, record) => {
                    return React.createElement("span", null, text ? moment(text).format("Do MMMM YYYY hh:mm A") : '');
                }
            }, {
                title: 'Ends',
                dataIndex: 'endsAt',
                key: 'endsAt',
                render: (text, record) => {
                    return React.createElement("span", null, text ? moment(text).format("Do MMMM YYYY hh:mm A") : '');
                }
            }, {
                title: 'Actions',
                key: 'action',
                render: (text, record) => (React.createElement("span", null,
                    React.createElement("div", { style: { textAlign: "center" } },
                        React.createElement(Button, { icon: "setting" }, "Edit"),
                        React.createElement(Divider, { type: "vertical" }),
                        React.createElement(Button, { icon: "copy" }, "Clone"),
                        React.createElement(Divider, { type: "vertical" }),
                        React.createElement(Button, { type: "danger", icon: "pause" }, "Pause"))))
            }
        ];
        let { isLoading } = this.props.store;
        return (React.createElement(Row, { style: { height: '100%', marginTop: '50px' } },
            React.createElement(Col, { span: 20, offset: 2, style: { padding: "25px" } },
                React.createElement(Card, { title: "All Forms", style: { padding: 0 } },
                    React.createElement(Typography, { style: { float: "left" } }, this.hasSelectedItems ? `Selected ${this.selectedItems.length} of ${this.forms.length}` : ''),
                    React.createElement(React.Fragment, null,
                        React.createElement(React.Fragment, null,
                            React.createElement(Button, { icon: "plus", type: "primary", style: { float: 'right' }, onClick: () => { this.showAddForm(true); } }, "Add")))),
                !isLoading && React.createElement(TableWrapper, { errors: this.errors, debug: this.props.store.debug, data: this.forms, columns: columns, borderered: true, rowKey: "id", pagination: false, onSelection: this.setSelectedItems }),
                this.showAdd && React.createElement(Drawer, { title: "Add Form", placement: "right", closable: true, onClose: () => this.showAdd = false, visible: this.showAdd },
                    React.createElement(AddFormView, { store: this.props.store, onAdd: this.handleAdd })))));
    }
};
__decorate([
    observable
], FormsView.prototype, "forms", void 0);
__decorate([
    observable
], FormsView.prototype, "nextToken", void 0);
__decorate([
    observable
], FormsView.prototype, "errors", void 0);
__decorate([
    observable
], FormsView.prototype, "showAdd", void 0);
__decorate([
    observable
], FormsView.prototype, "selectedItems", void 0);
__decorate([
    action
], FormsView.prototype, "fetch", null);
__decorate([
    action.bound
], FormsView.prototype, "handleAdd", null);
__decorate([
    action.bound
], FormsView.prototype, "setSelectedItems", null);
__decorate([
    action.bound
], FormsView.prototype, "showAddForm", null);
__decorate([
    computed
], FormsView.prototype, "hasSelectedItems", null);
FormsView = __decorate([
    observer
], FormsView);
export { FormsView };
//# sourceMappingURL=FormsView.js.map