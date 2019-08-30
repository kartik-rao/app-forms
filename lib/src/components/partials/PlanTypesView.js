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
import { observable, action, computed } from "mobx";
import API, { graphqlOperation } from "@aws-amplify/api";
import * as queries from '../../graphql/queries';
import { Table, List, Spin, Empty, Row, Col, Card } from "antd";
import { observer } from "mobx-react";
let PlanTypesView = class PlanTypesView extends React.Component {
    constructor(props) {
        super(props);
        this.planTypes = [];
        this.nextToken = null;
        this.loading = true;
        this.props = props;
        this.fetch();
    }
    get showErrors() {
        return this.props.store.debug && this.errors;
    }
    get showPlanTypes() {
        return !this.loading && this.planTypes && this.planTypes.length > 0;
    }
    get showEmpty() {
        return !this.loading && (!this.planTypes || this.planTypes.length == 0);
    }
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let planTypes = yield API.graphql(graphqlOperation(queries.listPlanTypes));
                this.planTypes = planTypes["data"]["listPlanTypes"];
            }
            catch (errorResponse) {
                console.error(errorResponse);
                this.errors = errorResponse.errors;
            }
            if (!this.planTypes) {
                this.planTypes = [];
            }
            this.loading = false;
        });
    }
    render() {
        const columns = [{
                title: 'Plan Name',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: 'Owner',
                dataIndex: 'ownedBy.email',
                key: 'owner'
            }, {
                title: 'Cost',
                dataIndex: 'cost',
                key: 'cost'
            }];
        return (React.createElement("div", null,
            React.createElement(Card, { title: "Plan Types" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 20, offset: 2 },
                        this.loading && React.createElement(Spin, { size: "large" }),
                        this.showPlanTypes && React.createElement(Table, { dataSource: this.planTypes, columns: columns, rowKey: "id" }),
                        this.showEmpty && React.createElement(Empty, null),
                        this.showErrors && React.createElement(List, { dataSource: this.errors, renderItem: item => (React.createElement(List.Item, null, item.message)) }))))));
    }
};
__decorate([
    observable
], PlanTypesView.prototype, "planTypes", void 0);
__decorate([
    observable
], PlanTypesView.prototype, "nextToken", void 0);
__decorate([
    observable
], PlanTypesView.prototype, "loading", void 0);
__decorate([
    observable
], PlanTypesView.prototype, "errors", void 0);
__decorate([
    computed
], PlanTypesView.prototype, "showErrors", null);
__decorate([
    computed
], PlanTypesView.prototype, "showPlanTypes", null);
__decorate([
    computed
], PlanTypesView.prototype, "showEmpty", null);
__decorate([
    action
], PlanTypesView.prototype, "fetch", null);
PlanTypesView = __decorate([
    observer
], PlanTypesView);
export { PlanTypesView };
//# sourceMappingURL=PlanTypesView.js.map