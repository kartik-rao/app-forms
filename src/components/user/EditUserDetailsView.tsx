import { IUpdateUserMutation, UpdateUser, IGetUserQuery, IMutationUpdateUserArgs } from "@kartikrao/lib-forms-api";
import { Button, Form, Input, notification, Card } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { withGraphQl } from "../../ApiHelper";
import { appStoreContext } from '../../stores/AppStoreProvider';

export interface EditUserDetailsViewProps extends FormComponentProps {
    user: IGetUserQuery["getUser"]|IUpdateUserMutation["updateUser"];
    onUpdate: (data: IUpdateUserMutation["updateUser"]) => void;
}

const formItemLayout = {
    labelCol: {
      xs: { span: 10 },
      sm: { span: 10},
    },
    wrapperCol: {
      xs: { span: 14 },
      sm: { span: 14 },
    },
};

const EditUserDetailsView : React.FC<EditUserDetailsViewProps> = (props: EditUserDetailsViewProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        isDirty: false,
        markDirty : function() {
            this.isDirty = true;
        },
        updateUser: async function(e) {
            e.preventDefault();
            e.stopPropagation();
            let values = props.form.getFieldsValue();
            let editUserPayload : IMutationUpdateUserArgs = {input: {
                id: props.user.id
            }};
            if(props.user.given_name != values.given_name){
                editUserPayload.input.given_name = values.given_name;
            }
            if(props.user.family_name != values.family_name){
                editUserPayload.input.family_name = values.family_name;
            }
            if(props.user.phone_number != values.phone_number){
                editUserPayload.input.phone_number = values.phone_number;
            }
            console.log("Edit User Payload", editUserPayload)
            try {
                store.view.setLoading({show: true, message: `Saving Profile`, status: "active", type : "line", percent: 50});
                let response = await withGraphQl<IUpdateUserMutation>(UpdateUser, editUserPayload);
                this.isDirty = false;
                notification.success({message: `Profile saved successfully`});
                props.onUpdate(response.data.updateUser);
            } catch (errorResponse) {
                notification.error({message: `Error updating profile`});
                console.error("EditUserDetailsView.handleSubmit - queries.updateUser", errorResponse);
                this.errors = errorResponse.errors;
            }
            store.view.resetLoading();
        }
    }));

    let {getFieldDecorator} = props.form;
    return useObserver(() => {
        return <><Form layout="horizontal" onSubmit={localStore.updateUser}  {...formItemLayout}>
            <Card size="small" title="Edit Profile" extra={<Button size="small" htmlType="submit" type="primary" disabled={!localStore.isDirty}>Save</Button>} bodyStyle={{padding: '30px'}}>
            <Form.Item label="First Name">
                {
                    getFieldDecorator('given_name', {
                        initialValue: props.user.given_name,
                        rules: [{required: true}]
                    })(<Input onChange={localStore.markDirty}/>)
                }
            </Form.Item>
            <Form.Item label="Last Name">
                {
                    getFieldDecorator('family_name', {
                        initialValue: props.user.family_name,
                        rules: [{required: true}]
                    })(<Input onChange={localStore.markDirty}/>)
                }
            </Form.Item>
            <Form.Item label="Phone Number" help="Enter a phone number (E.164 international format)">
                {
                    getFieldDecorator('phone_number', {
                        initialValue: props.user.phone_number,
                        rules: [{pattern: /^\+?[1-9]\d{1,14}$/g}]
                    })(<Input placeholder="+61400000000"  onChange={localStore.markDirty}/>)
                }
            </Form.Item>
            </Card>
        </Form></>
    })
}

export default Form.create<EditUserDetailsViewProps>()(EditUserDetailsView);