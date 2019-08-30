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
import * as React from "react";
import { observable, action } from "mobx";
import API, { graphqlOperation } from "@aws-amplify/api";
import * as queries from '../../graphql/queries';
import { Button, Tabs, Row, Col, List } from "antd";
import { observer } from "mobx-react";
import { UsersView } from "./UsersView";
import PageHeader from "antd/lib/page-header";
import * as moment from "moment";
const Description = ({ term, children, span = 12 }) => (React.createElement(Col, { span: span },
    React.createElement("div", { className: "fl-pageheader-description" },
        React.createElement("div", { className: "fl-pageheader-term" }, term),
        React.createElement("div", { className: "fl-pageheader-detail" }, children))));
let AccountAdminView = class AccountAdminView extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.fetch();
    }
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.props.store.showLoading();
            try {
                let { tenant } = this.props.store.authStore;
                let args = { accountId: tenant };
                let account = yield API.graphql(graphqlOperation(queries.getAccount, args));
                this.account = account.data.getAccount;
            }
            catch (errorResponse) {
                console.log("ERROR", errorResponse);
                this.errors = errorResponse.errors;
            }
            this.props.store.hideLoading();
        });
    }
    updateView() {
        this.fetch();
    }
    render() {
        let { isLoading } = this.props.store;
        let showErrors = this.props.store.debug && this.errors;
        return React.createElement(React.Fragment, null,
            showErrors && React.createElement(List, { dataSource: this.errors, renderItem: item => (React.createElement(List.Item, null, item.message)) }),
            !isLoading && this.account && React.createElement(PageHeader, { title: this.account.name, subTitle: this.account.plan ? this.account.plan.planType.name : 'FREE', extra: [React.createElement(Button, { key: "1" }, "Change Plan")], footer: React.createElement(Tabs, { defaultActiveKey: "1", animated: false },
                    React.createElement(Tabs.TabPane, { tab: "Users", key: "1", style: { paddingTop: "20px" } },
                        React.createElement(UsersView, { store: this.props.store, onUpdate: this.updateView, users: this.account.users.items || [] })),
                    React.createElement(Tabs.TabPane, { tab: "Subscription", key: "2" })) },
                React.createElement("div", { className: "fl-pageheader-wrap" },
                    React.createElement(Row, null,
                        React.createElement(Description, { term: "Primary Contact" },
                            React.createElement("a", { href: "mailto:" + this.account.ownedBy.email },
                                this.account.ownedBy.given_name,
                                " ",
                                this.account.ownedBy.family_name)),
                        React.createElement(Description, { term: "ID" }, this.account.id),
                        React.createElement(Description, { term: "Created" }, moment(this.account.createdAt).format("Do MMMM YYYY")),
                        React.createElement(Description, { term: "Updated" }, this.account.updatedAt ? moment(this.account.updatedAt).format("DD Mon YYYY") : "")))));
    }
};
__decorate([
    observable
], AccountAdminView.prototype, "account", void 0);
__decorate([
    observable
], AccountAdminView.prototype, "errors", void 0);
__decorate([
    action
], AccountAdminView.prototype, "fetch", null);
__decorate([
    action.bound
], AccountAdminView.prototype, "updateView", null);
AccountAdminView = __decorate([
    observer
], AccountAdminView);
export { AccountAdminView };
//# sourceMappingURL=AccountAdminView.js.map