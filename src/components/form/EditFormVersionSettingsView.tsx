import { IUpdateFormVersionMutation, UpdateFormVersion, IGetFormVersionQuery, IMutationUpdateFormVersionArgs } from "@kartikrao/lib-forms-api";
import { Button, Col, Form, Input, Modal, notification, Row, Select, Timeline, Tag, Card } from "antd";
import { FormComponentProps } from "antd/lib/form";
import dayjs from 'dayjs';
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { withGraphQl } from "../../ApiHelper";

export interface EditFormVersionSettingsViewProps extends FormComponentProps {
    onSave: (response: IUpdateFormVersionMutation["updateFormVersion"]) => void;
    onCancel: () => void;
    version : IGetFormVersionQuery["getFormVersion"]
}

const EditFormVersionSettingsView : React.FC<EditFormVersionSettingsViewProps> = (props: EditFormVersionSettingsViewProps) => {
    const localStore = useLocalStore(() => ({
        displayName: props.version.displayName as string,
        accountId: props.version.accountId as string,
        loading: false,
        onOk : async function() {
            this.loading = true;
            try {
                let variables = {input: {
                    id: props.version.id,  displayName: this.displayName, accountId: props.version.accountId
                }} as IMutationUpdateFormVersionArgs;
                let response = await withGraphQl<IUpdateFormVersionMutation>(UpdateFormVersion, variables);
                props.onSave(response.data.updateFormVersion);
            } catch (error) {
                console.error(error);
                notification.error({message: "There was an error editing this version"});
            }
            this.loading = true;
        },
        onCancel: function() {
            props.onCancel();
        },
        get hasErrors() {
            let errors = props.form.getFieldsError(['displayName']);
            return Object.values(errors).length > 0;
        }
    }));
    return useObserver(() => {
        return <Modal visible={true} centered mask={true} onCancel={props.onCancel} onOk={localStore.onOk}
                title={`Edit ${props.version.displayName}`}
                footer={[
                    <Button key="back" onClick={props.onCancel}>
                    Cancel
                    </Button>,
                    <Button key="submit" type="primary" disabled={!localStore.displayName} loading={localStore.loading} onClick={localStore.onOk}>
                    Save
                    </Button>,
                ]} width={800}>
                <Form>
                    <Form.Item label="Name">
                        { props.form.getFieldDecorator('displayName', {
                            initialValue: props.version.displayName,
                            rules:[
                                {required: true, message: "Please provide a name for this version"}
                            ]})
                        (<Input onChange={(e) => localStore.displayName = e.target.value} placeholder="A name for this version"/>)}
                    </Form.Item>
                </Form>
        </Modal>
    });
}

export default Form.create<EditFormVersionSettingsViewProps>()(EditFormVersionSettingsView);