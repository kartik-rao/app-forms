import API, { graphqlOperation } from "@aws-amplify/api";
import { Button, Col, DatePicker, Form, Input, Row, Card, notification } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { useLocalStore, useObserver } from "mobx-react-lite";
import moment from "moment";
import * as React from "react";
import * as mutations from '../../graphql/mutations';
import { appStoreContext } from '../../stores/AppStoreProvider';

export interface EditFormViewProps extends FormComponentProps {
    editForm: any;
    onUpdate: (data: any) => void;
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
                redirectNotStarted : values.redirectNotStarted,
                redirectHasEnded : values.redirectHasEnded,
                startDate        : values.startDate ? values.startDate.format() : null,
                endDate          : values.endDate ? values.endDate.format() : null
            };

            try {
                store.view.setLoading({show: true, message: `Saving ${this.onSubmitAction} configuration`, status: "active", type : "line", percent: 25});
                let ufResponse = await API.graphql(graphqlOperation(mutations.updateForm, {input: {id: editForm.id, ...editFormPayload}}));
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
        return <Form onSubmit={localStore.handleSubmit}  {...formItemLayout} layout={"horizontal"}>
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
            <Form.Item style={{marginTop: '15px'}} {...tailFormItemLayout}>
                <Button htmlType="submit" type="primary" disabled={!localStore.isDirty}>Apply</Button>
            </Form.Item>
        </Form>
    })
}

export default Form.create<EditFormViewProps>()(EditFormView);