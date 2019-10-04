import { IGetFormQuery } from "@kartikrao/lib-forms-api";
import { Button, Card, Form, Modal, Select, Tag, Timeline } from "antd";
import { FormComponentProps } from "antd/lib/form";
import dayjs from 'dayjs';
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";

export interface SelectFormVersionViewProps extends FormComponentProps {
    onVersionSelected: (versionId: string) => void;
    onCancel: () => void;
    sourceForm : IGetFormQuery["getForm"]
}

const SelectFormVersionView : React.FC<SelectFormVersionViewProps> = (props: SelectFormVersionViewProps) => {
    const localStore = useLocalStore(() => ({
        notes: null as string,
        displayName: null as string,
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
        onVersionSelected : function() {
            props.onVersionSelected(this.chosenVersion.id)
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
        return <Modal title="Select a source version" visible={true} centered mask={true} onCancel={props.onCancel} onOk={localStore.onVersionSelected}
                footer={[
                    <Button key="back" onClick={props.onCancel} size="small">Cancel</Button>,
                    <Button key="submit" type="primary" onClick={localStore.onVersionSelected} size="small">Select</Button>,
                ]} width={800}>
                <Form>
                    <Form.Item label="Available Versions">
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
                </Form>
        </Modal>
    });
}

export default Form.create<SelectFormVersionViewProps>()(SelectFormVersionView);