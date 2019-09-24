import { editorStoreContext } from "@kartikrao/lib-forms";
import { IAddFormVersionMutation, IForm, AddFormVersion } from "@kartikrao/lib-forms-api";
import { IFormProps } from "@kartikrao/lib-forms-core";
import { Button, Form, Input, Modal, notification } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { withGraphQl } from "../../ApiHelper";
import { appStoreContext } from "../../stores/AppStoreProvider";

export interface AddFormVersionViewProps extends FormComponentProps{
    onSave: (response: IAddFormVersionMutation["addFormVersion"]) => void;
    onCancel: () => void;
    tenantId: string;
    formData: any;
    formId: any;
}

const AddFormVersionView : React.FC<AddFormVersionViewProps> = (props: AddFormVersionViewProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const editorStore = React.useContext(editorStoreContext);
    if(!editorStore) throw new Error("EditorStore is null");

    const config = store.config.envConfig;
    const localStore = useLocalStore(() => ({
        loading: false,
        notes: editorStore.changelog.join("\n"),
        onOk : async function () {
            this.loading = true;
            store.view.setLoading({show: true, message: "Saving Form Version", status: "active", type : "line", percent: 10});
            try {
                let formData : IFormProps = {...toJS(props.formData)};
                formData.submitTarget = `${config.api.rest.endpoint}/form/entry/${props.tenantId}/${props.formId}`;
                const payload = {
                    input: {
                        accountId: props.tenantId,
                        formId: props.formId,
                        notes: this.notes,
                        formData: JSON.stringify(toJS(formData))
                    }
                }
                let response = await withGraphQl<IAddFormVersionMutation>(AddFormVersion, payload);
                notification.success({message: `Form version created successfully`});
                props.onSave(response.data.addFormVersion);
            } catch (error) {
                notification.error({message: "There was an error creating a version"});
            }
            this.loading = false;
            store.view.resetLoading();
        }
    }));

    return useObserver(() => {
        return <Modal mask ={true}
            visible={true}
            title="New Form Version"
            onCancel={props.onCancel}
            onOk={localStore.onOk}
            footer={[
                <Button key="back" onClick={props.onCancel}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" loading={localStore.loading} onClick={localStore.onOk}>
                  Save
                </Button>,
              ]}>
            <Form layout="vertical">
                <Form.Item label="Notes">
                    { props.form.getFieldDecorator('notes', {rules:[
                        {required: true, message: "Please provide notes for this version"}
                    ], initialValue: editorStore.changelog.join("\n")})
                    (<Input.TextArea style={{whiteSpace: "pre-wrap", height: 300}} onChange={(e) => localStore.notes = e.target.value}/>)}
                </Form.Item>
            </Form>
        </Modal>
    });
}

export default Form.create<AddFormVersionViewProps>()(AddFormVersionView);