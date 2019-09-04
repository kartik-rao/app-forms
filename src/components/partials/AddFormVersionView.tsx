import * as React from "react";
import {Modal, Form, Input, notification} from "antd";
import { FormComponentProps } from "antd/lib/form";
import { useLocalStore, useObserver } from "mobx-react";
import { appStoreContext } from "../../stores/AppStoreProvider";
import * as mutations from '../../graphql/mutations';
import API, { graphqlOperation } from "@aws-amplify/api";
import { toJS } from "mobx";
import { IFormProps } from "@kartikrao/lib-forms-core";

export interface AddFormVersionViewProps extends FormComponentProps{
    onSave: (response: IFormProps) => void;
    onCancel: () => void;
    formData: any;
    formId: any;
}

const AddFormVersionView : React.FC<AddFormVersionViewProps> = (props: AddFormVersionViewProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        notes: null as string,
        onOk : async function () {
            store.view.showLoading();
            let tenant = store.auth.contextId ? store.auth.contextId : store.auth.tenant;
            try {
                let response = await API.graphql(graphqlOperation(mutations.addFormVersion, {
                    accountId: tenant,
                    formId: props.formId,
                    notes: this.notes,
                    formData: toJS(this.form.formData)
                }));
                notification.error({message: `Form version created successfully`});
                props.onSave(response);
            } catch (error) {
                notification.error({message: "There was an error creating a version"});
            }
            store.view.hideLoading();
        }
    }));

    return useObserver(() => {
        return <Modal
            title="Add Form Version"
            okText="Save"
            onCancel={props.onCancel}
            onOk={localStore.onOk}>
            <Form layout="vertical">
                <Form.Item label="Notes">
                    {props.form.getFieldDecorator('notes', {rules:[
                        {required: true, message: "Please provide notes for this version"}
                    ]})(<Input type="textarea" onChange={(e) => localStore.notes = e.target.value}/>)}
                </Form.Item>
            </Form>
        </Modal>
    });
}

export default Form.create<AddFormVersionViewProps>()(AddFormVersionView);