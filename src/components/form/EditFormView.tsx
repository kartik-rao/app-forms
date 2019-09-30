import { IUpdateFormMutation, UpdateForm, IGetFormQuery } from "@kartikrao/lib-forms-api";
import { Button, DatePicker, Form, Input, notification, Card } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { useLocalStore, useObserver } from "mobx-react-lite";
import moment from "moment";
import * as React from "react";
import { withGraphQl } from "../../ApiHelper";
import { appStoreContext } from '../../stores/AppStoreProvider';

export interface EditFormViewProps extends FormComponentProps {
    editForm: IGetFormQuery["getForm"]|IUpdateFormMutation["updateForm"];
    onUpdate: (data: IUpdateFormMutation["updateForm"]) => void;
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

const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 20,
      },
      sm: {
        span: 24,
        offset: 20,
      },
    },
};

const EditFormView : React.FC<EditFormViewProps> = (props: EditFormViewProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    let {editForm} = props;
    const localStore = useLocalStore(() => ({
        name               : editForm.name,
        descriptions       : editForm.description,
        redirectNotStarted : editForm.redirectNotStarted as string,
        redirectHasEnded   : editForm.redirectHasEnded as string,
        startDate          : editForm.startDate as any,
        endDate            : editForm.endDate as any,
        isDirty            : false as boolean,
        onChange          : function(name, value) {
            localStore[name] = value;
            this.isDirty = true;
        },
        handleSubmit: async function (e) {
            e.preventDefault();
            e.stopPropagation();
            let values = props.form.getFieldsValue();
            let editFormPayload : any = {
                name               : values.name,
                description        : values.description,
                redirectNotStarted : values.redirectNotStarted,
                redirectHasEnded   : values.redirectHasEnded,
                startDate          : values.startDate ? values.startDate.format() : null,
                endDate            : values.endDate ? values.endDate.format() : null
            };

            try {
                store.view.setLoading({show: true, message: `Saving "${props.editForm.name}" settings`, status: "active", type : "line", percent: 50});
                let ufResponse = await withGraphQl<IUpdateFormMutation>(UpdateForm, {input: {id: editForm.id, ...editFormPayload}});
                this.isDirty = false;
                notification.success({message: `Form activation settings edited successfully`});
                props.onUpdate(ufResponse.data.updateForm);
            } catch (errorResponse) {
                console.error("EditFormView.handleSubmit - queries.updateForm", errorResponse);
                this.errors = errorResponse.errors;
            }
            store.view.resetLoading();
        }
    }))

    let {getFieldDecorator} = props.form;

    return useObserver(() => {
        return <Form onSubmit={localStore.handleSubmit}  {...formItemLayout} layout={"vertical"}>
            <Card size="small" title="Edit Form settings" extra={<Button size="small" htmlType="submit" type="primary" disabled={!localStore.isDirty}>Save</Button>} bodyStyle={{padding: '30px'}}>
            <Form.Item label="Name" help="">
                {
                    getFieldDecorator('name', {
                        initialValue: editForm.name,
                    })(<Input onChange={(e) => localStore.onChange('name', e.target.value)}/>)
                }
            </Form.Item>
            <Form.Item label="Description" help="">
                {
                    getFieldDecorator('description', {
                        initialValue: editForm.description,
                    })(<Input onChange={(e) => localStore.onChange('description', e.target.value)}/>)
                }
            </Form.Item>
            <Form.Item label="Start Date" help="Schedule form activation">
                {
                    getFieldDecorator('startDate', {
                        initialValue: editForm.startDate ? moment(editForm.startDate, moment.ISO_8601) : null,
                    })(<DatePicker showTime format="YYYY-MM-DDTHH:mm:ss[Z]"
                            onChange={(e) => localStore.onChange('startDate', e)}
                            style={{width: '225px'}}
                            disabledDate={(current) => {return localStore.endDate ? current.isAfter(localStore.endDate): false}}/>)
                }
            </Form.Item>
            <Form.Item label="Pre-Start Redirect URL" help="Users will be redirected prior to the Start Date">
                    {
                    getFieldDecorator('redirectNotStarted', {
                        initialValue: localStore.redirectNotStarted,
                        rules: [{pattern: /^(https?):\/\/[^\s$.?#].[^\s]*$/gm}]
                    })(<Input onChange={(e) => localStore.onChange('redirectNotStarted', e.target.value)}/>)
                }
            </Form.Item>
            <Form.Item label="End Date" help="Schedule form deactivation">
                    {
                    getFieldDecorator('endDate', {
                        initialValue: editForm.endDate ? moment(editForm.endDate, moment.ISO_8601) : null,
                    })(<DatePicker showTime  format="YYYY-MM-DDTHH:mm:ss[Z]"
                            onChange={(e) => localStore.onChange('endDate', e)}
                            style={{width: '225px'}}
                            disabledDate={(current) => {return localStore.startDate ? current.isBefore(localStore.startDate): false}} />)
                }
            </Form.Item>
            <Form.Item label="Post-End Redirect URL" help="Users will be redirected past the End Date">
                    {
                    getFieldDecorator('redirectHasEnded', {
                        initialValue: localStore.redirectHasEnded,
                        rules: [{pattern: /^(https?):\/\/[^\s$.?#].[^\s]*$/gm}]
                    })(<Input onChange={(e) => localStore.onChange('redirectHasEnded', e)}/>)
                }
            </Form.Item>
            </Card>
        </Form>
    })
}

export default Form.create<EditFormViewProps>()(EditFormView);