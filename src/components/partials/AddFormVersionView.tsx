import * as React from "react";
import {Modal, Form, Input, notification} from "antd";
import { FormComponentProps } from "antd/lib/form";
import { useLocalStore, useObserver } from "mobx-react";
import { appStoreContext } from "../../stores/AppStoreProvider";
import * as mutations from '../../graphql/mutations';
import API, { graphqlOperation } from "@aws-amplify/api";
import { toJS } from "mobx";
import { IFormProps } from "@kartikrao/lib-forms-core";
import { editorStoreContext } from "@kartikrao/lib-forms";

export interface AddFormVersionViewProps extends FormComponentProps{
    onSave: (response: IFormProps) => void;
    onCancel: () => void;
    tenant: string;
    formData: any;
    formId: any;
}

const AddFormVersionView : React.FC<AddFormVersionViewProps> = (props: AddFormVersionViewProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const editorStore = React.useContext(editorStoreContext);
    if(!editorStore) throw new Error("EditorStore is null");

    const localStore = useLocalStore(() => ({
        notes: null as string,
        onOk : async function () {
            store.view.setLoading({show: true, message: "Saving Form Version", status: "active", type : "line", percent: 10});
            try {
                const payload = {
                    input: {
                        accountId: props.tenant,
                        formId: props.formId,
                        notes: this.notes,
                        formData: JSON.stringify(toJS(props.formData))
                    }
                }
                let response = await API.graphql(graphqlOperation(mutations.addFormVersion, payload));
                notification.success({message: `Form version created successfully`});
                props.onSave(response);
            } catch (error) {
                notification.error({message: "There was an error creating a version"});
            }
            store.view.resetLoading();
        }
    }));

    return useObserver(() => {
        return <Modal mask ={true}
            visible={true}
            title="Add Form Version"
            okText="Save"
            onCancel={props.onCancel}
            onOk={localStore.onOk}>
            <Form layout="vertical">
                <Form.Item label="Notes">
                    { props.form.getFieldDecorator('notes', {rules:[
                        {required: true, message: "Please provide notes for this version"}
                    ], initialValue: editorStore.changelog.join("\n")})
                    (<Input type="textarea" height={200} onChange={(e) => localStore.notes = e.target.value}/>)}
                </Form.Item>
            </Form>
        </Modal>
    });
}

export default Form.create<AddFormVersionViewProps>()(AddFormVersionView);