import { Button, Form, Input, Row, Select } from "antd";
import { FormComponentProps } from 'antd/lib/form/Form';
import { action, observable } from "mobx";
import { observer, useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { appStoreContext } from "../../stores/AppStoreProvider";

export interface IInviteUserViewProps extends FormComponentProps {
    onAdd: any;
}

export const InviteUserView: React.FC<IInviteUserViewProps> = (props: IInviteUserViewProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        values: {} as any,
        confirmDirty: false,
        handleSubmit : function (e: React.FormEvent) {
            e.preventDefault();
            e.stopPropagation();
            let self = this;
            props.form.validateFieldsAndScroll((err, values) => {
              if (!err) {
                self.values = values;
                props.onAdd(this.values);
              }
            });
        },
        handleConfirmBlur : function (e) {
            const value = e.target.value;
            this.confirmDirty = this.confirmDirty || !!value;
            return;
        },
        setValue : function (key: string, value: any) {
            this.values[key] = value;
        }
    }));

    return useObserver(() => {
        return <div>
        <Row type="flex">
            <Form onSubmit={localStore.handleSubmit}>
                <Form.Item required={true} label="First Name" help="User's last name">
                    {props.form.getFieldDecorator('given_name', {
                        rules: [{ required: true, message: 'Please provide a first name' }]
                    })(
                        <Input onChange={(e) => {localStore.setValue("given_name", e.target.value)}}/>
                    )}
                </Form.Item>
                <Form.Item required={true} label="Last Name" help="User's last name">
                    {props.form.getFieldDecorator('family_name', {
                        rules: [{ required: true, message: 'Please provide a last name' }]
                    })(
                        <Input onChange={(e) => {localStore.setValue("family_name", e.target.value)}}/>
                    )}
                </Form.Item>
                <Form.Item required={true} label="Email" help="User's email (and username)">
                    {props.form.getFieldDecorator('email', {
                        rules: [{ required: true, type: "string", pattern : /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Please provide a valid email' }]
                    })(
                        <Input onChange={(e) => {localStore.setValue("email", e.target.value)}}/>
                    )}
                </Form.Item>
                <Form.Item label="Phone Number" help="User's phone number, international format (E.164)">
                    {props.form.getFieldDecorator('phone_number', {
                        rules: [{ type: "string", pattern : /^\+?[1-9]\d{1,14}$/, message: 'Please provide a valid phone number' }]
                    })(
                        <Input onChange={(e) => {localStore.setValue("phone_number", e.target.value)}} placeholder="+61280000008"/>
                    )}
                </Form.Item>
                <Form.Item required={true} label="Group" help="Choose a group for this user">
                    {props.form.getFieldDecorator('custom:group', {
                        rules: [{ required: true, type: "string",  message: 'Please select a group' }]
                    })(
                        <Select onChange={(e) => {localStore.setValue("custom:group", e)}}>
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
    </div>
    })
}

export default Form.create<IInviteUserViewProps>()(InviteUserView);

// @observer
// export class InviteUserViewOld extends React.Component<IInviteUserViewProps & FormComponentProps, any> {
//     props:IInviteUserViewProps  & FormComponentProps;
//     @observable values: any;
//     @observable confirmDirty: boolean = false;

//     constructor(props: IInviteUserViewProps & FormComponentProps) {
//         super(props);
//         this.props = props;
//     }

//     @action handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.form.validateFieldsAndScroll((err, values) => {
//           if (!err) {
//             this.values = values;
//             this.props.onAdd(this.values);
//           }
//         });
//     }

//     @action handleConfirmBlur = (e) => {
//         const value = e.target.value;
//         this.confirmDirty = this.confirmDirty || !!value;
//         return;
//     }

//     render() {
//         let {getFieldDecorator} = this.props.form;

//         return (<div>
//             <Row type="flex">
//                 <Form onSubmit={this.handleSubmit}>
//                     <Form.Item required={true} label="First Name" help="User's last name">
//                         {getFieldDecorator('given_name', {
//                             rules: [{ required: true, message: 'Please provide a first name' }]
//                         })(
//                             <Input />
//                         )}
//                     </Form.Item>
//                     <Form.Item required={true} label="Last Name" help="User's last name">
//                         {getFieldDecorator('family_name', {
//                             rules: [{ required: true, message: 'Please provide a last name' }]
//                         })(
//                             <Input />
//                         )}
//                     </Form.Item>
//                     <Form.Item required={true} label="Email" help="User's email (and username)">
//                         {getFieldDecorator('email', {
//                             rules: [{ required: true, type: "string", pattern : /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Please provide a valid email' }]
//                         })(
//                             <Input />
//                         )}
//                     </Form.Item>
//                     <Form.Item label="Phone Number" help="User's phone number, international format (E.164)">
//                         {getFieldDecorator('phone_number', {
//                             rules: [{ type: "string", pattern : /^\+?[1-9]\d{1,14}$/, message: 'Please provide a valid phone number' }]
//                         })(
//                             <Input placeholder="+61280000008"/>
//                         )}
//                     </Form.Item>
//                     <Form.Item required={true} label="Group" help="Choose a group for this user">
//                         {getFieldDecorator('custom:group', {
//                             rules: [{ required: true, type: "string",  message: 'Please select a group' }]
//                         })(
//                             <Select>
//                                 <Select.Option value="AccountAdmin">Administrator</Select.Option>
//                                 <Select.Option value="Editor">Editor</Select.Option>
//                                 <Select.Option value="Viewer">Viewer</Select.Option>
//                             </Select>
//                         )}
//                     </Form.Item>
//                     <Form.Item style={{marginTop: "20px"}}>
//                         <Button style={{float: "right", marginRight: "10px"}} type="primary" htmlType="submit">Submit</Button>
//                     </Form.Item>
//                 </Form>
//             </Row>
//         </div>)
//     }
// }

