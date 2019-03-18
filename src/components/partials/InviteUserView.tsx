import * as React from "react";
import { IRootStore } from "../../stores/RootStore";
import {observable, action} from "mobx";
import  API, {graphqlOperation } from "@aws-amplify/api";
import * as queries from '../../graphql/queries';
import { Table, List, Spin, Empty, Row, Col, Card,Button, Form, Select, Input } from "antd";
import { observer } from "mobx-react";
import {  FormComponentProps } from 'antd/lib/form/Form';

export interface IInviteUserViewProps {
    store: IRootStore;
    onAdd: any;
}

@observer
export class InviteUserView extends React.Component<IInviteUserViewProps & FormComponentProps, any> {
    props:IInviteUserViewProps  & FormComponentProps;
    @observable values: any;
    @observable confirmDirty: boolean = false;

    constructor(props: IInviteUserViewProps & FormComponentProps) {
        super(props);
        this.props = props;
    }

    @action handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.values = values;
            this.props.onAdd(this.values);
          }
        });
    }

    @action handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.confirmDirty = this.confirmDirty || !!value;
        return;
    }

    render() {
        let {getFieldDecorator} = this.props.form;

        return (<div>
            <Row type="flex">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item required={true} label="First Name" help="User's last name">
                        {getFieldDecorator('first_name', {
                            rules: [{ required: true, message: 'Please provide a first name' }]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item required={true} label="Last Name" help="User's last name">
                        {getFieldDecorator('last_name', {
                            rules: [{ required: true, message: 'Please provide a last name' }]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item required={true} label="Email" help="User's email (and username)">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, type: "string", pattern : /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Please provide a valid email' }]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Phone Number" help="User's phone number, international format (E.164)">
                        {getFieldDecorator('phone_number', {
                            rules: [{ type: "string", pattern : /^\+?[1-9]\d{1,14}$/, message: 'Please provide a valid phone number' }]
                        })(
                            <Input placeholder="+61280000008"/>
                        )}
                    </Form.Item>
                    <Form.Item required={true} label="Group" help="Choose a group for this user">
                        {getFieldDecorator('custom:group', {
                            rules: [{ required: true, type: "string",  message: 'Please select a group' }]
                        })(
                            <Select>
                                <Select.Option value="AccountAdmin">Administrator</Select.Option>
                                <Select.Option value="Editor">Editor</Select.Option>
                                <Select.Option value="Viewer">Viewer</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item style={{marginTop: "20px"}}>
                        <Button style={{float: "right", marginRight: "10px"}} type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Row>
        </div>)
    }
}

export default Form.create<IInviteUserViewProps>()(InviteUserView);