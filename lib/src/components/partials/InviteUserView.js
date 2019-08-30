var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Button, Form, Input, Row, Select } from "antd";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
let InviteUserView = class InviteUserView extends React.Component {
    constructor(props) {
        super(props);
        this.confirmDirty = false;
        this.handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    this.values = values;
                    this.props.onAdd(this.values);
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
                    React.createElement(Form.Item, { required: true, label: "First Name", help: "User's last name" }, getFieldDecorator('given_name', {
                        rules: [{ required: true, message: 'Please provide a first name' }]
                    })(React.createElement(Input, null))),
                    React.createElement(Form.Item, { required: true, label: "Last Name", help: "User's last name" }, getFieldDecorator('family_name', {
                        rules: [{ required: true, message: 'Please provide a last name' }]
                    })(React.createElement(Input, null))),
                    React.createElement(Form.Item, { required: true, label: "Email", help: "User's email (and username)" }, getFieldDecorator('email', {
                        rules: [{ required: true, type: "string", pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Please provide a valid email' }]
                    })(React.createElement(Input, null))),
                    React.createElement(Form.Item, { label: "Phone Number", help: "User's phone number, international format (E.164)" }, getFieldDecorator('phone_number', {
                        rules: [{ type: "string", pattern: /^\+?[1-9]\d{1,14}$/, message: 'Please provide a valid phone number' }]
                    })(React.createElement(Input, { placeholder: "+61280000008" }))),
                    React.createElement(Form.Item, { required: true, label: "Group", help: "Choose a group for this user" }, getFieldDecorator('custom:group', {
                        rules: [{ required: true, type: "string", message: 'Please select a group' }]
                    })(React.createElement(Select, null,
                        React.createElement(Select.Option, { value: "AccountAdmin" }, "Administrator"),
                        React.createElement(Select.Option, { value: "Editor" }, "Editor"),
                        React.createElement(Select.Option, { value: "Viewer" }, "Viewer")))),
                    React.createElement(Form.Item, { style: { marginTop: "20px" } },
                        React.createElement(Button, { style: { float: "right", marginRight: "10px" }, type: "primary", htmlType: "submit" }, "Submit"))))));
    }
};
__decorate([
    observable
], InviteUserView.prototype, "values", void 0);
__decorate([
    observable
], InviteUserView.prototype, "confirmDirty", void 0);
__decorate([
    action
], InviteUserView.prototype, "handleSubmit", void 0);
__decorate([
    action
], InviteUserView.prototype, "handleConfirmBlur", void 0);
InviteUserView = __decorate([
    observer
], InviteUserView);
export { InviteUserView };
export default Form.create()(InviteUserView);
//# sourceMappingURL=InviteUserView.js.map