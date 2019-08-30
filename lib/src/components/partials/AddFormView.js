var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Button, Form, Input, Row, DatePicker } from "antd";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
let AddFormView = class AddFormView extends React.Component {
    constructor(props) {
        super(props);
        this.confirmDirty = false;
        this.handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    if (values.startsAt) {
                        values.endsAt = values.startsAt.toISOString ? values.startsAt.toISOString() : values.startsAt.toString();
                    }
                    if (values.endsAt) {
                        values.endsAt = values.endsAt.toISOString ? values.endsAt.toISOString() : values.endsAt.toString();
                    }
                    this.values = values;
                    this.props.onAdd(values);
                }
            });
        };
        this.handleConfirmBlur = (e) => {
            const value = e.target.value;
            this.confirmDirty = this.confirmDirty || !!value;
            return;
        };
        this.props = props;
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        return (React.createElement("div", null,
            React.createElement(Row, { type: "flex" },
                React.createElement(Form, { onSubmit: this.handleSubmit },
                    React.createElement(Form.Item, { required: true, label: "Name", help: "A name for this form" }, getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please provide a name' }]
                    })(React.createElement(Input, null))),
                    React.createElement(Form.Item, { required: true, label: "Description", help: "A short description for this form" }, getFieldDecorator('desc', {
                        rules: [{ required: true, message: 'Please provide a last name' }]
                    })(React.createElement(Input, null))),
                    React.createElement(Form.Item, { label: "Starts At", help: "When to start accepting entries (optional)" }, getFieldDecorator('startsAt', {
                        rules: [{ type: "object", message: 'Please provide a valid start date' }]
                    })(React.createElement(DatePicker, { showTime: true }))),
                    React.createElement(Form.Item, { label: "Ends At", help: "When to stop accepting entries (optional)" }, getFieldDecorator('endsAt', {
                        rules: [{ type: "object", message: 'Please provide a valid end date' }]
                    })(React.createElement(DatePicker, { showTime: true }))),
                    React.createElement(Form.Item, { style: { marginTop: "20px" } },
                        React.createElement(Button, { style: { float: "right", marginRight: "10px" }, type: "primary", htmlType: "submit" }, "Submit"))))));
    }
};
__decorate([
    observable
], AddFormView.prototype, "values", void 0);
__decorate([
    observable
], AddFormView.prototype, "confirmDirty", void 0);
__decorate([
    action
], AddFormView.prototype, "handleSubmit", void 0);
__decorate([
    action
], AddFormView.prototype, "handleConfirmBlur", void 0);
AddFormView = __decorate([
    observer
], AddFormView);
export { AddFormView };
export default Form.create()(AddFormView);
//# sourceMappingURL=AddFormView.js.map