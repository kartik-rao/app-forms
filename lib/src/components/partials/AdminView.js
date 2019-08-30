var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import { Card } from "antd";
import { observer } from "mobx-react";
import { PlanTypesView } from "./PlanTypesView";
let AdminView = class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(PlanTypesView, { store: this.props.store }),
            React.createElement(Card, { title: "Integration Types" })));
    }
};
AdminView = __decorate([
    observer
], AdminView);
export { AdminView };
//# sourceMappingURL=AdminView.js.map