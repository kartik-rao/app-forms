import { Button, DatePicker, Form, Input, Row } from "antd";
import { FormComponentProps } from 'antd/lib/form/Form';
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { appStoreContext } from "../../stores/AppStoreProvider";

export interface IAddFormViewProps extends FormComponentProps {
    onAdd: any;
}

export const AddFormView : React.FC<IAddFormViewProps> = (props: IAddFormViewProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
       values: {},
       confirmDirty: false,
       handleSubmit : function (e) {
        e.preventDefault();
            e.stopPropogation();
            props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (values.startsAt) {
                    values.endsAt = values.startsAt.toISOString ? values.startsAt.toISOString(): values.startsAt.toString();
                }
                if (values.endsAt) {
                    values.endsAt = values.endsAt.toISOString ? values.endsAt.toISOString(): values.endsAt.toString();
                }
                this.values = values;
                props.onAdd(values);
            }
            });
        },
        handleConfirmBlur : function (e) {
            const value = e.target.value;
            this.confirmDirty = this.confirmDirty || !!value;
            return;
        }
    }));

    return useObserver(() => {
        return <div>
        <Row type="flex">
            <Form onSubmit={localStore.handleSubmit}>
                <Form.Item required={true} label="Name" help="A name for this form">
                    {props.form.getFieldDecorator('localStore.values.name', {
                        rules: [{ required: true, message: 'Please provide a name' }]
                    })(<Input />)}
                </Form.Item>
                <Form.Item required={true} label="Description" help="A short description for this form">
                    {props.form.getFieldDecorator('localStore.values.desc', {
                        rules: [{ required: true, message: 'Please provide a last name' }]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Starts At" help="When to start accepting entries (optional)">
                    {props.form.getFieldDecorator('localStore.values.startsAt', {
                        rules: [{ type: "object", message: 'Please provide a valid start date' }]
                    })(<DatePicker showTime={true}/>)}
                </Form.Item>
                <Form.Item label="Ends At" help="When to stop accepting entries (optional)">
                    {props.form.getFieldDecorator('localStore.values.endsAt', {
                        rules: [{ type: "object", message: 'Please provide a valid end date' }]
                    })(<DatePicker showTime={true}/>)}
                </Form.Item>
                <Form.Item style={{marginTop: "20px"}}>
                    <Button style={{float: "right", marginRight: "10px"}} type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Row>
    </div>
    })
}

export default Form.create<IAddFormViewProps & FormComponentProps>()(AddFormView);