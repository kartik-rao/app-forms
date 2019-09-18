import API, { graphqlOperation } from "@aws-amplify/api";
import * as React from "react";
import {PageHeader, Row, Col, Card, Skeleton, Badge, Button, Popconfirm, Tag, Divider, Typography, Statistic, Timeline, notification, Icon, Drawer} from "antd";
import { Link, RouteComponentProps } from "react-router-dom";
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";
import dayjs from 'dayjs';
import { useLocalStore, useObserver } from "mobx-react-lite";
import { TableWrapper } from "../common/TableWrapper";
import  EditFormView from "./EditFormView";
import moment from "moment";

export interface FormViewProps {
    accountId: string;
    formId: string;
}

type ExpectedSubmitResult = "Redirect" | "Show Configured Message" | "Show Default Message";

const Description = ({ term, children, span = 12 }) => (
    <Col span={span}>
        <div className="fl-pageheader-description">
        <div className="fl-pageheader-term">{term}</div>
        <div className="fl-pageheader-detail">{children}</div>
        </div>
    </Col>
);

export const FormView: React.FC<RouteComponentProps<FormViewProps>> = ({match, history}) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const config = store.config.envConfig;

    const localStore = useLocalStore(() => ({
        loading: true,
        form: null as any,
        errors: [] as any[],
        showEditForm: false as boolean,
        refresh: false as boolean,
        onUpdateComplete : function () {
            this.showEditForm = false;
        },
        toggleFormPause : async function() {
            try {
                store.view.setLoading({show: true, message: this.form.isPaused ? "Activating Form" : "Pausing Form", status: "active", type : "line", percent: 100});
                if (this.form.isPaused) {
                    let createStreamURL = `${config.api.rest.endpoint}/stream/${match.params.formId}?tenantId=${match.params.accountId}`;
                    let streamResponse = await store.auth.withSession(createStreamURL, "put");
                    if(streamResponse.message != "OK") {
                        notification.error({message: `Unable to active Form - ${streamResponse.message}`});
                        store.view.resetLoading();
                        return;
                    }
                }
                let response = await API.graphql(graphqlOperation(mutations.updateForm, {input: {id: match.params.formId, isPaused: this.form.isPaused == 0 ? 1 : 0}}));
                this.form.isPaused = response.data.updateForm.isPaused;
            } catch (errorResponse) {
                console.error("toggleFormPause - queries.updateForm", errorResponse);
                this.errors = errorResponse.errors;
            }
            store.view.resetLoading();
        },
        activateVersion: async function(versionId: string) {
            try {
                store.view.setLoading({show: true, message: "Activating Version", status: "active", type : "line", percent: 100});
                let response = await API.graphql(graphqlOperation(mutations.updateForm, {input:{id: match.params.formId, currentVersionId: versionId}}));
                response = response.data.updateForm;
                if(response.version.formData) {
                    response.version.formData = JSON.parse(response.version.formData);
                }
                notification.success({message: `Active version changed successfully`});
                localStore.form = response;
            } catch (errorResponse) {
                console.error("activateVersion - queries.updateForm", errorResponse);
                this.errors = errorResponse.errors;
            }
            store.view.resetLoading();
        },
        deleteForm: async function() {
            try {
                store.view.setLoading({show: true, message: "Deleting form", status: "active", type : "line", percent: 100});
                await API.graphql(graphqlOperation(mutations.deleteForm, {input: {id: match.params.formId, accountId: match.params.accountId}}))
                history.push(`/account/${match.params.accountId}/forms`)
            } catch (errorResponse) {
                console.error("deleteForm - queries.updateForm", errorResponse);
                this.errors = errorResponse.errors;
            }
            store.view.resetLoading();
        },
        get successRedirect() : string {
            return this.form && this.form.version && this.form.version.successRedirect ? this.form.version.successRedirect : null;
        },
        get errorRedirect() : string {
            return this.form && this.form.version && this.form.version.errorRedirect ? this.form.version.errorRedirect : null;
        },
        get expectedSubmitResult() : {error: ExpectedSubmitResult, success: ExpectedSubmitResult} {
            return {
                error: localStore.form.successRedirect ? "Redirect" : localStore.form.submitErrorMessage ? "Show Configured Message" : "Show Default Message",
                success: localStore.form.errorRedirect ? "Redirect" : localStore.form.submitSuccessMessage ? "Show Configured Message" : "Show Default Message"
            }
        }
    }));

    React.useEffect(() => {
        let fetch = async function () {
            localStore.loading = true;
            try {
                store.view.setLoading({show: true, message: "Loading form", status: "active", type : "line", percent: 100});
                let response = await API.graphql(graphqlOperation(queries.getForm, {formId: match.params.formId}));
                response = response.data.getForm;
                if(response.version && response.version.formData) {
                    response.version.formData = JSON.parse(response.version.formData);
                }
                localStore.form = response;
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
        {title: "Detail", key: "notes", dataIndex: "notes", render:(text, record) => <p style={{whiteSpace: "pre-line"}}>{text}</p>},
        {title: "Active", key: "active", render:(text, record) => record.id == localStore.form.versionId ? <Badge status="success"/> : <Badge status="default"/>},
        {title: "Created", key: "createdAt", dataIndex: "createdAt", render: (text, record) => {return <span>{dayjs(text).format('DD MMM YY hh:mm a')}</span>}},
        {title: "By", key: "owner", dataIndex: "ownedBy", render: (text, record) => {return <span>{record.ownedBy.given_name} {record.ownedBy.family_name}</span>}},
        {title: "Actions", key: "actions", render: (text, record) => {return <span>
            <Button disabled={record.id == localStore.form.versionId} onClick={() => localStore.activateVersion(record.id)} type="primary" size="small" title="Activate">Activate</Button>
        </span>}},
    ]

    const formActions = useObserver(() => {
        return <span> {
            localStore.form ? <>
                <Button size="small" className="fl-right-margin-ten" onClick={() => {localStore.showEditForm = true}}>Settings</Button>
                <Popconfirm title={localStore.form.isPaused == 1 ? "Activate & start accepting entries ?" : "Pause & stop accepting entries ?"} onConfirm={() => localStore.toggleFormPause()}>
                    <Button className="fl-right-margin-ten" size="small" disabled={!localStore.form.versions || localStore.form.versions.length == 0} type={localStore.form.isPaused == 1 ? "primary" : "danger"}>{localStore.form.isPaused == 1 ? "Activate" : "Pause"}</Button>
                </Popconfirm>
                <Popconfirm title={"This will delete the form and all versions. Are you sure ?"} onConfirm={() => localStore.deleteForm()}>
                    <Button className="fl-right-margin-ten" size="small" type="danger">Delete</Button>
                </Popconfirm>
            </> : <></>
        }
        </span>
    });

    return useObserver(() => {
        return localStore.loading ? <Skeleton active />: <>
            <Drawer bodyStyle={{overflow: 'hidden'}} placement="right" visible={localStore.showEditForm} width={600} title={"Form settings"} closable maskClosable onClose={() => localStore.onUpdateComplete()}>
                <Row><Col span={24}><EditFormView editForm={localStore.form} onUpdate={localStore.onUpdateComplete}/></Col></Row>
            </Drawer>
            <PageHeader onBack={() => history.push(`/account/${match.params.accountId}/forms`)} title={localStore.form.name} subTitle={localStore.form.isPaused ? <Tag color="orange">Paused</Tag> : <Tag color="green">Running</Tag>} extra={formActions}>
            <Typography.Paragraph>{localStore.form.description}</Typography.Paragraph>
            <Row>
                <Col span={3}>Starts {localStore.form.startDate ? <Tag color="green">{dayjs(localStore.form.startDate).format('DD MMM YY hh:mm a')}</Tag>: <Tag>Not Set</Tag>}</Col>
                <Col span={3}>Ends {localStore.form.endDate ? <Tag color="red">{dayjs(localStore.form.endDate).format('DD MMM YY hh:mm a')}</Tag>: <Tag>Not Set</Tag>}</Col>
                <Col span={4}>On Success <Tag color="green">{localStore.expectedSubmitResult.success}</Tag>{localStore.successRedirect ? <a href={localStore.successRedirect} target="_blank">Preview</a>: ""}</Col>
                <Col span={4}>On Error <Tag color="red">{localStore.expectedSubmitResult.error}</Tag>{localStore.errorRedirect ? <a href={localStore.errorRedirect} target="_blank">Preview</a>: ""}</Col>
            </Row>
            <Divider />
            <Row type="flex">
                <Col span={24} >
                <Card title={<span>{localStore.form.name} versions</span>} style={{padding: 0}} bodyStyle={{padding:0}} extra={<Link to={`/account/${match.params.accountId}/canvas/${match.params.formId}`}>
                    <Button size="small" className="fl-right-margin-ten"><Icon type="plus"/>Add Version</Button>
                </Link>}>
                <TableWrapper emptyText='No versions, click "Add version" to create one.' title={() => <span>{localStore.form.name} versions</span>} errors={localStore.errors} data={localStore.form.versions} columns={columns} 
                bordered={true} rowKey="id" pagination={false} />
                </Card>
                </Col>
            </Row>
        </PageHeader>
    </>
    })
}