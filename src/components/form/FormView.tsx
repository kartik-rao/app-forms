import { AddFormVersion, AttachFormVersion, DeleteForm, DeleteFormVersion, GetForm, IAddFormVersionMutation, IAttachFormVersionMutation, IDeleteFormMutation, IDeleteFormVersionMutation, IGetFormQuery, IGetFormVersionQuery, IMutationAddFormVersionArgs, IUpdateFormMutation, IUpdateFormVersionMutation, UpdateForm } from "@kartikrao/lib-forms-api";
import { Badge, Button, Card, Col, Dropdown, Empty, Icon, Menu, notification, PageHeader, Popconfirm, Popover, Row, Skeleton, Statistic, Tabs, Tag, Timeline, Typography, Divider } from "antd";
import dayjs from 'dayjs';
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { withGraphQl } from "../../ApiHelper";
import { appStoreContext } from "../../stores/AppStoreProvider";
import { TableWrapper } from "../common/TableWrapper";
import SelectFormVersionView from "./SelectFormVersionView";
import EditFormVersionSettingsView from "./EditFormVersionSettingsView";
import EditFormView from "./EditFormView";

export interface FormViewProps {
    accountId: string;
    formId: string;
}

const DATE_FORMAT = 'DD MMM YY hh:mm a';

type ExpectedSubmitResult = "Redirect" | "Show Configured Message" | "Show Default Message";

export const FormView: React.FC<RouteComponentProps<FormViewProps>> = ({match, history}) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const config = store.config.envConfig;

    const localStore = useLocalStore(() => ({
        loading: true,
        form: null as IGetFormQuery["getForm"],
        errors: [] as any[],
        selectedVersion: null as IGetFormVersionQuery["getFormVersion"],
        selectedVersionId: null as string,
        showEditForm: false as boolean,
        showEditVersion: false as boolean,
        showAddVersion: false as boolean,
        refresh: false as boolean,
        onUpdateComplete : function (form: IUpdateFormMutation["updateForm"]) {
            this.showEditForm = false;
            console.log("Got Form", form)
            try {
                this.form = form;
            } catch (error) {
                console.log("update error", error);
            }
        },
        toggleFormPause : async function() {
            try {
                store.view.setLoading({show: true, message: this.form.isPaused ? "Starting Form" : "Pausing Form", status: "active", type : "line", percent: 100});
                if (this.form.isPaused) {
                    let createStreamURL = `${config.api.rest.endpoint}/stream/${match.params.formId}?tenantId=${match.params.accountId}`;
                    let streamResponse = await store.auth.withSession(createStreamURL, "put");
                    if(streamResponse.message != "OK") {
                        notification.error({message: `Unable to activate Form - ${streamResponse.message}`});
                        store.view.resetLoading();
                        return;
                    }
                }
                let response = await withGraphQl<IUpdateFormMutation>(UpdateForm, {input: {id: match.params.formId, isPaused: this.form.isPaused == 0 ? 1 : 0}});
                this.form.isPaused = response.data.updateForm.isPaused;
            } catch (errorResponse) {
                console.error("toggleFormPause - queries.updateForm", errorResponse);
                this.errors = errorResponse.errors;
            }
            store.view.resetLoading();
        },
        newVersionFrom : async function(sourceVersionId: string) {
            let versions = this.form.versions.filter((v) => {
                return v.id == sourceVersionId;
            });

            let version = versions[0];
            let variables: IMutationAddFormVersionArgs = {
                input: {
                    accountId: this.form.accountId,
                    formId: this.form.id,
                    displayName : `Clone of ${this.form.displayName}`,
                    formData: version.formData,
                    notes: version.notes
                }
            }
            store.view.setLoading({show: true, message: "Creating Version", status: "active", type : "line", percent: 100});
            try {
                let response = await withGraphQl<IAddFormVersionMutation>(AddFormVersion, variables);
                this.form.versions.unshift(response.data.addFormVersion);
            } catch (errorResponse) {
                console.error("newVersionFrom - mutation.addFormVersion", errorResponse);
                this.errors = errorResponse.errors;
            }
            store.view.resetLoading();
        },
        activateVersion: async function(versionId: string) {
            try {
                store.view.setLoading({show: true, message: "Activating Version", status: "active", type : "line", percent: 100});
                let response = await withGraphQl<IAttachFormVersionMutation>(AttachFormVersion, {input:{formId: match.params.formId, accountId: match.params.accountId, versionId: versionId}});
                let form = response.data.attachFormVersion;
                if(form.version.formData) {
                    form.version.formData = JSON.parse(form.version.formData);
                }
                notification.success({message: `Active version changed successfully`});
                localStore.form.versionId = form.versionId;
                localStore.form.version = form.version;
            } catch (errorResponse) {
                console.error("activateVersion - mutation.attachFormVersion", errorResponse);
                this.errors = errorResponse.errors;
            }
            store.view.resetLoading();
        },
        editVersion : async function(versionId: string) {
            let versions = this.form.versions.filter((v) => {
                return v.id == versionId
            });

            this.selectedVersion = versions[0];
            this.showEditVersion = true;
        },
        onEditVersion : function(version: IUpdateFormVersionMutation["updateFormVersion"]) {
            this.selectedVersion.displayName = version.displayName;
            this.selectedVersion = null;
            this.showEditVersion = false;
        },
        deleteVersion: async function(versionId: string) {
            try {
                store.view.setLoading({show: true, message: "Deleting Version", status: "active", type : "line", percent: 100});
                await withGraphQl<IDeleteFormVersionMutation>(DeleteFormVersion, {input:{accountId: match.params.accountId, formId: match.params.formId, versionId: versionId}});
                let index = localStore.form.versions.findIndex((v) => {
                    return v.id == versionId;
                });
                localStore.form.versions.splice(index, 1);
                notification.success({message: `Version deleted successfully`});
            } catch (errorResponse) {
                console.error("activateVersion - queries.deleteVersion", errorResponse);
                this.errors = errorResponse.errors;
            }
            store.view.resetLoading();
        },
        deleteForm: async function() {
            try {
                store.view.setLoading({show: true, message: "Deleting form", status: "active", type : "line", percent: 100});
                await withGraphQl<IDeleteFormMutation>(DeleteForm, {input: {id: match.params.formId, accountId: match.params.accountId}});
                history.push(`/account/${match.params.accountId}/forms`)
            } catch (errorResponse) {
                console.error("deleteForm - queries.deleteForm", errorResponse);
                this.errors = errorResponse.errors;
            }
            store.view.resetLoading();
        },
        get successRedirect() : string {
            return this.hasVersion && this.form.version.successRedirect ? this.form.version.successRedirect : null;
        },
        get errorRedirect() : string {
            return this.hasVersion && this.form.version.errorRedirect ? this.form.version.errorRedirect : null;
        },
        get expectedSubmitResult() : {error: ExpectedSubmitResult, success: ExpectedSubmitResult} {
            let version : any = localStore.form.version;
            return {
                error: version.successRedirect ? "Redirect" : version.submitErrorMessage ? "Show Configured Message" : "Show Default Message",
                success: version.errorRedirect ? "Redirect" : version.submitSuccessMessage ? "Show Configured Message" : "Show Default Message"
            }
        },
        get hasVersion() : boolean {
            return this.form && this.form.version;
        },
        get allVersions() : any[] {
            return this.hasVersion ? this.form.versions.slice().sort((first:IGetFormVersionQuery["getFormVersion"], second: IGetFormVersionQuery["getFormVersion"]) => {
                if(first.id == this.form.versionId) {
                    return -1;
                } else if (second.id == this.form.versionId) {
                    return 1;
                } else {
                    let d1 = dayjs(first.createdAt);
                    let d2 = dayjs(second.createdAt);
                    if (d1.isSame(d2)) {
                        return 0;
                    }
                    return d1.isBefore(d2) ? 1 : -1;
                }
            }) : [];
        },
        toggleShowSelectVersion: function() {
            this.showAddVersion = !this.showAddVersion;
        },
        onAddFormVersion: function(version: IAddFormVersionMutation["addFormVersion"]) {
            this.form.versions.unshift(version);
            this.showAddVersion = false;
        }
    }));

    React.useEffect(() => {
        let fetch = async function () {
            localStore.loading = true;
            try {
                store.view.setLoading({show: true, message: "Loading form", status: "active", type : "line", percent: 100});
                let response = await withGraphQl<IGetFormQuery>(GetForm, {formId: match.params.formId});
                let form = response.data.getForm;
                if(form.version && form.version.formData) {
                    form.version.formData = JSON.parse(form.version.formData);
                }
                store.view.idNameMap[match.params.formId] = form.name;
                localStore.form = form;
            } catch (errorResponse) {
                console.error("queries.getAccount.forms", errorResponse);
                localStore.errors = errorResponse.errors;
            }
            if (!localStore.form) {
                localStore.form =null;
            }
            localStore.loading = false;
            store.view.resetLoading();
        }
        fetch();
    }, [localStore.refresh]);

    const columns = [
        {title: "Name", key: "name", dataIndex: "displayName", render: (text, record) => <><p>{text}{record.id == localStore.form.versionId ? <Tag color="green" className="fl-left-margin-ten">ACTIVE</Tag>:<></>}</p></>},
        {title: "Notes", key: "notes", dataIndex: "notes", render:(text, record) => <p style={{whiteSpace: "pre-line"}}>{text}</p>},
        {title: "Created", key: "createdAt", dataIndex: "createdAt", render: (text, record) => {return <span>{dayjs(text).format('DD MMM YY hh:mm a')}</span>}},
        {title: "By", key: "owner", dataIndex: "ownedBy", render: (text, record) => {return <span>{record.ownedBy.given_name} {record.ownedBy.family_name}</span>}},
        {title: "Actions", key: "actions", render: (text, record) => {return <span>
            <Dropdown overlay={<Menu>
                <Menu.Item key="action-rename">
                    <a onClick={() =>localStore.editVersion(record.id)} title="Rename"><Icon type="edit"/> Rename</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="action-activate">
                    <a onClick={() => record.id != localStore.form.versionId && localStore.activateVersion(record.id)} title="Activate"><Icon type="check"/> Activate</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="action-delete" onClick={(e) => localStore.deleteVersion(record.id)}>
                    <a onClick={() => localStore.deleteVersion(record.id)} title="Delete"><Icon type="delete"/> Delete</a>
                </Menu.Item>
            </Menu>}>
                <a className="ant-dropdown-link" href="#">Actions <Icon type="down" /></a>
            </Dropdown>
        </span>
        }}
    ];

    const formUrl = `${config.api.rest.endpoint}/form/view/${match.params.formId}`;
    const FormActions : React.FC<any> = () => {
        return useObserver(() => {
            return <span> {
                localStore.form ? <>
                    <Button className="fl-right-margin-ten"  size="small">
                        <a href={formUrl} target="_blank">Preview</a>
                    </Button>
                    <Button size="small" className="fl-right-margin-ten" onClick={localStore.toggleShowSelectVersion}>Add Version</Button>
                    <Popconfirm title={localStore.form.isPaused == 1 ? "Start accepting entries ?" : "Stop accepting entries ?"} onConfirm={() => localStore.toggleFormPause()}>
                        <Button className="fl-right-margin-ten" size="small" disabled={!localStore.form.versions || localStore.form.versions.length == 0} type={localStore.form.isPaused == 1 ? "primary" : "danger"}>{localStore.form.isPaused == 1 ? "Start" : "Pause"}</Button>
                    </Popconfirm>
                    <Popconfirm title={"This will delete the form and all versions. Are you sure ?"} onConfirm={() => localStore.deleteForm()}>
                        <Button className="fl-right-margin-ten" size="small" type="danger">Delete</Button>
                    </Popconfirm>
                </> : <></>
            }
            </span>
        })
    };

    const BadgeText : React.FC<{status: "error"|"success"|"warning"|"processing", text: string}> = ({status, text}) => {
        return <strong>{text}<Badge status={status} style={{marginLeft: "10px"}}></Badge></strong>
    }

    const ChangeList : React.FC<any> = () => {
        return useObserver(() => {
            return localStore.hasVersion && localStore.form.version.notes ? <Timeline>
                {localStore.form.version.notes.split("\n").map((line, i) => {
                    return <Timeline.Item key={`c-${i}`}>{line}</Timeline.Item>
                })}
            </Timeline> : <></>
        })
    };

    const FormStatus : React.FC<any> = () => {
        return useObserver(() => {
            return <>
            {localStore.hasVersion && <Popover content={<ChangeList />}>{localStore.form.version.displayName}</Popover>}
            <span className="fl-left-margin-ten">{localStore.hasVersion ? (localStore.form.isPaused ? <BadgeText status="warning" text="Paused"/> : <BadgeText status="processing" text="Running"/>) : <BadgeText status="error" text="No Content"/>}</span>
            {localStore.form.startDate && <span className="fl-left-margin-ten">From<Tag style={{marginLeft: '5px'}}>{dayjs(localStore.form.startDate).format(DATE_FORMAT)}</Tag></span>}
            {localStore.form.endDate && <span>-<Tag style={{marginLeft: '5px'}}>{dayjs(localStore.form.endDate).format(DATE_FORMAT)}</Tag></span>}
            </>
        })
    };

    const getCanvasUrl = (versionId: string) => {
        return `/account/${match.params.accountId}/forms/${match.params.formId}/canvas/${versionId}`;
    };

    return useObserver(() => {
        return localStore.loading ? <Skeleton active />:<>
            {localStore.showAddVersion && <SelectFormVersionView onVersionSelected={(id: string) => {history.push(getCanvasUrl(id))}} sourceForm={localStore.form} onCancel={localStore.toggleShowSelectVersion}/>}
            {localStore.showEditVersion && <EditFormVersionSettingsView version={localStore.selectedVersion} onSave={localStore.onEditVersion} onCancel={() => localStore.showEditVersion = false}/>}
            <PageHeader onBack={() => history.push(`/account/${match.params.accountId}/forms`)} title={localStore.form.name} subTitle={<FormStatus />} extra={<FormActions/>}>
                <h5>{localStore.form.description}</h5>
                <Card bordered={false} bodyStyle={{padding: '0px'}}>
                <br/>
                    <Tabs defaultActiveKey="pastVersions">
                    <Tabs.TabPane key="currentVersion" tab="Current Version">
                        { localStore.hasVersion ? <>
                            <Row>
                                <Col span={3}><Statistic title="Entries" value={localStore.form.numEntries} ></Statistic></Col>
                                <Col span={4}><Statistic title="On Success" value={localStore.expectedSubmitResult.success} valueStyle={{fontSize: '14px'}}></Statistic></Col>
                                <Col span={4}><Statistic title="On Failure" value={localStore.expectedSubmitResult.error} valueStyle={{fontSize: '14px'}}></Statistic></Col>
                            </Row>
                            <br/>
                            <Divider/>
                            <Row>
                                <Col span={24}>
                                    <Card title={localStore.form.version.displayName} extra={
                                        <><span><Tag>{dayjs(localStore.form.version.createdAt).format('DD MMM YY hh:mma')}</Tag><Tag>{localStore.form.version.ownedBy.given_name} {localStore.form.version.ownedBy.family_name}</Tag></span>
                                        <span><Button size="small" type="primary" onClick={() => {localStore.selectedVersion=localStore.form.version; localStore.showEditVersion=true;}}>Rename</Button></span></>
                                        }>
                                        <Row>
                                            <Col span={4}>
                                                <div style={{padding: "25px"}}><ChangeList /></div>
                                            </Col>
                                            <Col span={18} offset={2}>
                                                <iframe src={formUrl} style={{width: "100%", minHeight: "calc(100vh - 600px)", border: "none"}}></iframe>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row></> : <Empty description="No content versions, click Add Version"/>
                        }
                    </Tabs.TabPane>
                    <Tabs.TabPane key="pastVersions" tab="Version History">
                        <Row type="flex">
                            <Col span={24} >
                                <Card title={<span>{localStore.form.name} Version History</span>} style={{padding: 0}} bodyStyle={{padding:0}}>
                                <TableWrapper size="small" emptyText='No versions, click "Add version" to create one.' errors={localStore.errors} data={localStore.allVersions} columns={columns}
                                bordered={true} rowKey="id" pagination={ localStore.allVersions.length > 5 ? {pageSize: 5, position: "top"} : false} />
                                </Card>
                            </Col>
                        </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane key="settings" tab="Settings">
                        <Row>
                            <Col span={14}>
                                <EditFormView editForm={localStore.form} onUpdate={localStore.onUpdateComplete}/>
                            </Col>
                        </Row>
                    </Tabs.TabPane>
                </Tabs></Card>
        </PageHeader>
    </>
    })
}