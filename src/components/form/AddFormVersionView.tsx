import { AddFormVersion, GetFormVersion, IAddFormVersionMutation, IGetFormQuery, IGetFormVersionQuery, IMutationAddFormVersionArgs, IQueryGetFormVersionArgs } from "@kartikrao/lib-forms-api";
import { Button, Col, Form, Input, Modal, notification, Row, Select, Timeline, Tag, Card } from "antd";
import { FormComponentProps } from "antd/lib/form";
import dayjs from 'dayjs';
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { withGraphQl } from "../../ApiHelper";

export interface AddFormVersionViewProps extends FormComponentProps {
    onSave: (response: IAddFormVersionMutation["addFormVersion"]) => void;
    onCancel: () => void;
    sourceForm : IGetFormQuery["getForm"]
}

const AddFormVersionView : React.FC<AddFormVersionViewProps> = (props: AddFormVersionViewProps) => {
    const localStore = useLocalStore(() => ({
        name: null as string,
        notes: null as string,
        sourceVersionId: props.sourceForm.version.id,
        loading: false,
        get chosenVersion() {
            if(this.sourceVersionId) {
                let self = this;
                let selectedVersion = props.sourceForm.versions.filter((v) => {
                    return v.id == self.sourceVersionId;
                });
                return selectedVersion && selectedVersion.length > 0 ? selectedVersion[0] : null;
            } else {
                return null;
            }
        },
        get chosenVersionNotes() {
            if(this.chosenVersion) {
                return this.chosenVersion.notes.split("\n");
            } else {
                return null;
            }
        },
        onOk : async function() {
            this.loading = true;
            try {
                let oldVersion = await withGraphQl<IGetFormVersionQuery>(GetFormVersion, {versionId: this.sourceVersionId} as IQueryGetFormVersionArgs);
                let variables: IMutationAddFormVersionArgs = {
                    input: {
                        accountId: props.sourceForm.accountId,
                        formId   : props.sourceForm.id,
                        displayName: this.name,
                        notes: this.notes,
                        formData: oldVersion.data.getFormVersion.formData
                    }
                };
                let newVersion = await withGraphQl<IAddFormVersionMutation>(AddFormVersion, variables);
                props.onSave(newVersion.data.addFormVersion);
            } catch (error) {
                console.error(error);
                notification.error({message: "There was an error creating a version"});
            }
            this.loading = true;
        },
        onCancel: function() {
            props.onCancel();
        },
        get hasErrors() {
            let errors = props.form.getFieldsError(['displayName', 'notes']);
            return Object.values(errors).length > 0;
        }
    }));
    return useObserver(() => {
        return <Modal visible={true} centered mask={true} onCancel={props.onCancel} onOk={localStore.onOk}
                footer={[
                    <Button key="back" onClick={props.onCancel}>
                    Cancel
                    </Button>,
                    <Button key="submit" type="primary" disabled={!localStore.notes || !localStore.name} loading={localStore.loading} onClick={localStore.onOk}>
                    Create
                    </Button>,
                ]} width={800}>
                <Form>
                    <Form.Item label="Source Version">
                        { props.form.getFieldDecorator('sourceVersionId', {rules: [
                            {required: true, message: 'Please choose a source version'}
                        ], initialValue: props.sourceForm.version.id})
                        (<Select onSelect={(v) => localStore.sourceVersionId = v as string} style={{width: '400px'}}>
                            {props.sourceForm.versions.map((v) => {
                                return <Select.Option key={v.id} value={v.id}>{v.displayName}</Select.Option>
                            })}
                        </Select>)}
                    </Form.Item>
                    {localStore.chosenVersion &&
                    <Card size="small" title={localStore.chosenVersion.displayName} extra={<><Tag>{dayjs(localStore.chosenVersion.createdAt).format('DD MMM YY hh:mma')}</Tag><Tag>{localStore.chosenVersion.ownedBy.given_name}  {localStore.chosenVersion.ownedBy.family_name}</Tag></>}>
                        <Timeline>
                            {localStore.chosenVersionNotes.map((line, i) => {
                                return <Timeline.Item key={`c-${i}`}>{line}</Timeline.Item>
                            })}
                        </Timeline>
                    </Card>}
                    <Form.Item label="Name">
                        { props.form.getFieldDecorator('displayName', {rules:[
                            {required: true, message: "Please provide a name for this version"}
                        ]})
                        (<Input onChange={(e) => localStore.name = e.target.value} placeholder="A name for this version"/>)}
                    </Form.Item>
                    <Form.Item label="Notes">
                        { props.form.getFieldDecorator('notes', {rules:[
                            {required: true, message: "Please provide notes for this version"}
                        ]})
                        (<Input.TextArea style={{whiteSpace: "pre-wrap", height: '6em'}}  placeholder="Notes that describe the intended changes" onChange={(e) => localStore.notes = e.target.value}/>)}
                    </Form.Item>
                </Form>
        </Modal>
    });
}

export default Form.create<AddFormVersionViewProps>()(AddFormVersionView);