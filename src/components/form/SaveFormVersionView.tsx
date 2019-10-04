import { editorStoreContext } from "@kartikrao/lib-forms";
import { AddFormVersion, IAddFormVersionMutation, IMutationUpdateFormArgs, IUpdateFormVersionMutation, UpdateForm } from "@kartikrao/lib-forms-api";
import { IFormProps } from "@kartikrao/lib-forms-core";
import { Button, Checkbox, Col, Form, Input, Modal, notification, Row } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { withGraphQl } from "../../ApiHelper";
import { appStoreContext } from "../../stores/AppStoreProvider";

export interface SaveFormVersionViewProps extends FormComponentProps{
    onSave: (response: IAddFormVersionMutation["addFormVersion"], isPublished: boolean) => void;
    onCancel: () => void;
    sourceVersionId: string;
    versionName: string;
    tenantId: string;
    formData: any;
    formId: any;
}

const SaveFormVersionView : React.FC<SaveFormVersionViewProps> = (props: SaveFormVersionViewProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const editorStore = React.useContext(editorStoreContext);
    if(!editorStore) throw new Error("EditorStore is null");

    const config = store.config.envConfig;
    const localStore = useLocalStore(() => ({
        loading: false,
        notes: editorStore.changelog.join("\n"),
        overwrite: false,
        publish: false,
        displayName: null as string,
        onOk : async function () {
            this.loading = true;
            store.view.setLoading({show: true, message: "Saving Form Version", status: "active", type : "line", percent: 30});
            try {
                let formData : IFormProps = {...toJS(props.formData)};
                formData.submitTarget = `${config.api.rest.endpoint}/form/entry/${props.tenantId}/${props.formId}`;
                const payload = {
                    input: {
                        displayName: this.displayName,
                        accountId: props.tenantId,
                        formId: props.formId,
                        notes: this.notes,
                        formData: JSON.stringify(toJS(formData))
                    }
                }
                console.log("AddFormVersion", payload);
                let response = await withGraphQl<IAddFormVersionMutation>(AddFormVersion, payload);
                notification.success({message: `Form version created successfully`});
                if (this.publish) {
                    store.view.setLoading({show: true, message: "Publishing Form Version", status: "active", type : "line", percent: 60});
                    await withGraphQl<IUpdateFormVersionMutation>(UpdateForm, {input: {id: props.formId, currentVersionId: response.data.addFormVersion.id}} as IMutationUpdateFormArgs);
                }
                props.onSave(response.data.addFormVersion, this.publish);
            } catch (error) {
                console.error(error);
                notification.error({message: "There was an error creating a version"});
            }
            this.loading = false;
            store.view.resetLoading();
        },
        get title() : string {
            if(props.sourceVersionId) {
                return this.overwrite ? `Overwrite version "${props.versionName}"` : `Create new version from "${props.versionName}"`
            } else {
                return "Create new version"
            }
        }
    }));

    return useObserver(() => {
        return <Modal mask ={true}
            visible={true}
            title={localStore.title}
            onCancel={props.onCancel}
            onOk={localStore.onOk}
            footer={[
                <Button key="back" onClick={props.onCancel} size="small">Cancel</Button>,
                <Button key="submit" type="primary" disabled={!localStore.displayName || !localStore.notes} loading={localStore.loading} onClick={localStore.onOk} size="small">Save</Button>,
              ]}>
            <Form layout="horizontal">
                <Form.Item label="Name">
                    { props.form.getFieldDecorator('displayName', {rules:[
                        {required: true, message: "Please provide a name for this version"}
                    ]})
                    (<Input onChange={(e) => localStore.displayName = e.target.value} placeholder="A name for this version"/>)}
                </Form.Item>
                <Form.Item label="Notes">
                    { props.form.getFieldDecorator('notes', {rules:[
                        {required: true, message: "Please provide notes for this version"}
                    ], initialValue: editorStore.changelog.join("\n")})
                    (<Input.TextArea style={{whiteSpace: "pre-wrap", height: 300}} onChange={(e) => localStore.notes = e.target.value}/>)}
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item help="Publish this version immediately">
                            <Checkbox defaultChecked={false} onChange={(e) => localStore.publish = e.target.checked}>Publish</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    });
}

export default Form.create<SaveFormVersionViewProps>()(SaveFormVersionView);