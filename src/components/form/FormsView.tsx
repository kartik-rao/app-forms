import { IAddFormMutation, IAddFormVersionMutation, IGetFormQuery, IListFormsQuery, AddFormVersion, GetForm, AddForm, ListForms } from "@kartikrao/lib-forms-api";
import { EmptyForm } from "@kartikrao/lib-forms-core";
import { Button, Card, Col, Drawer, Dropdown, Icon, Menu, Row, Skeleton, Tag } from "antd";
import Typography from "antd/lib/typography";
import dayjs from 'dayjs';
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { withGraphQl } from "../../ApiHelper";
import { appStoreContext } from "../../stores/AppStoreProvider";
import { TableWrapper } from "../common/TableWrapper";
import AddFormView from "./AddFormView";

export interface FormsViewProps {
    accountId: string;
}

export const FormsView : React.FC<RouteComponentProps<FormsViewProps>> = ({match}) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const now = dayjs();
    const localStore = useLocalStore(() => ({
        forms: [] as IListFormsQuery["listForms"],
        errors: [] as any[],
        showAdd: false,
        selectedItems: [] as any[],
        loading: true,
        handleClone: async function (formId: string) {
            try {
                store.view.setLoading({show: true, message: "Loading source form", status: "active", type : "line", percent: 10});
                let response = await withGraphQl<IGetFormQuery>(GetForm, {formId: formId});
                let sourceForm = response.data.getForm;
                let addFormResponse = await withGraphQl<IAddFormMutation>(AddForm, {input: {
                    name : `Copy of ${sourceForm.name}`,
                    description: sourceForm.description,
                    accountId: sourceForm.accountId
                }});
                store.view.setLoading({show: true, message: "Saving copy", status: "active", type : "line", percent: 30});
                let addFormVersionResponse = await withGraphQl<IAddFormVersionMutation>(AddFormVersion, {input: {
                    formId: addFormResponse.data.addForm.id,
                    accountId: sourceForm.accountId,
                    notes: `Clone of ${sourceForm.name}`,
                    formData: sourceForm.version && sourceForm.version.formData ? sourceForm.version.formData : JSON.stringify({...EmptyForm})
                }});
                this.forms.push(addFormVersionResponse.data.addFormVersion);
            } catch (errorResponse) {
                console.error(errorResponse);
                this.errors = errorResponse.errors;
            }
            store.view.resetLoading();
        },
        handleAdd: async function (values: any) {
            store.view.setLoading({show: true, message: "Creating new form", status: "active", type : "line", percent: 100});
            try {
                let addFormResponse = await withGraphQl<IAddFormMutation>(AddForm, {input: values});
                if (addFormResponse.errors) {
                    this.errors = addFormResponse.errors;
                }
            } catch (errorResponse) {
                console.error(errorResponse);
                this.errors = errorResponse.errors;
            }
            this.showAdd = false;
            store.view.resetLoading();
        },
        setSelectedItems: function(selectedItems) {
            this.selectedItems = selectedItems;
        },
        showAddForm : function(show: boolean) {
            this.showAdd = show;
        },
        get hasSelectedItems() {
            return this.selectedItems.length > 0;
        }
    }));

    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
            return <span><Link to={`/account/${match.params.accountId}/forms/${record.id}`}>{text}</Link></span>
        }
    }, {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
    },
    {
        title: 'Owner',
        key: 'ownedBy',
        render: (text, record) => {return <a href={"mailto:`${record.ownedBy.email}`"}>{record.ownedBy.email}</a>}
    }
    , {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        defaultSortOrder: 'descend',
        sorter: (a, b) => {;
            return dayjs(a["createdAt"]).diff(dayjs(b["createdAt"]))
        },
        sortDirections: ['descend', 'ascend'],
        render:(text, record) => {
            let created = dayjs(record.createdAt);
            let date = created.year() != now.year() ? created.format('DD MMM YY hh:mm a') : created.format('DD MMM hh:mm a')
            return <span>{date}</span>
        }
    },
    {
        title: 'Status',
        dataIndex: 'startsAt',
        key: 'startsAt',
        render:(text, record) => {
            let starts = record.startDate ? dayjs(record.startDate) : null;
            let ends = record.endDate ? dayjs(record.endDate) : null;
            let now = dayjs();
            if (starts && ends) {
                if (now.isAfter(starts) && now.isBefore(ends)) {
                    return <Tag color="green">Active</Tag>
                } else if (now.isBefore(starts)) {
                    return <Tag color="orange">Not Started</Tag>
                } else if (now.isAfter(ends)) {
                    return <Tag color="red">Has Ended</Tag>
                }
            } else if (starts) {
                return now.isBefore(starts) ? <Tag color="orange">Not Started</Tag> : <Tag color="green">Active</Tag>
            } else if (ends) {
                return now.isBefore(ends) ? <Tag color="green">Active</Tag> : <Tag color="red">Ended</Tag>
            } else {
                return <Tag color="green">Active</Tag>
            }
        }
    },
    {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
            <Dropdown overlay={<Menu>
                <Menu.Item key="action-canvas">
                    <Link to={`/account/${match.params.accountId}/canvas/${record.id}`}>
                        <span><Icon type="highlight"/>  Design</span>
                    </Link>
                </Menu.Item>
                <Menu.Divider key="d-clone"/>
                <Menu.Item key="action-clone" onClick={(e) => localStore.handleClone(record.id)}>
                    <span><Icon type="copy"/>  Clone</span>
                </Menu.Item>
                <Menu.Divider key="d-pause"/>
                <Menu.Item key="action-pause">
                    <span><Icon type="pause"/>  Pause</span>
                </Menu.Item>
                <Menu.Divider key="d-delete"/>
                <Menu.Item key="action-delete">
                    <span><Icon type="delete"/>  Delete</span>
                </Menu.Item>
            </Menu>}>
            <a className="ant-dropdown-link" href="#">Actions <Icon type="down" /></a>
        </Dropdown>
        )
        }
    ];

    React.useEffect(() => {
        let fetch = async function () {
            localStore.loading = true;
            try {
                store.view.setLoading({show: true, message: "Loading forms", status: "active", type : "line", percent: 100});
                let response = await withGraphQl<IListFormsQuery>(ListForms, {filter: {criteria: [{accountId: {expression: "eq", value: [match.params.accountId]}}]}});
                localStore.forms = response.data.listForms;
            } catch (errorResponse) {
                console.error("queries.getAccount.forms", errorResponse);
                localStore.errors = errorResponse.errors;
            }
            if (!localStore.forms) {
                localStore.forms = [];
            }
            localStore.loading = false;
            store.view.resetLoading();
        }
        fetch();
    }, []);

    return  useObserver(() => {
        return <Row>
        <Col span={24} style={{padding:"25px"}}>
            {
                localStore.loading ? <Skeleton active />:
                <>
                    <Card title={"All forms"} style={{padding: 0}} bodyStyle={{padding:0}} extra={<>
                        <React.Fragment>
                            <Button icon="plus" type="primary" style={{float: 'right'}} onClick={()=>{localStore.showAddForm(true)}}>Add</Button>
                        </React.Fragment>
                        <Typography style={{float: "right", fontWeight: 'bold', marginTop: '6px', marginRight: '15px'}}>{localStore.hasSelectedItems ? `Selected ${localStore.selectedItems.length} of ${localStore.forms.length}` : ''}</Typography>
                        </>
                    }>
                        <TableWrapper errors={localStore.errors}
                            data={localStore.forms} columns={columns} bordered={true} rowKey="id"
                            pagination={false} onSelection={localStore.setSelectedItems} />
                    </Card>
                    {localStore.showAdd && <Drawer title="Add Form" width="350px" placement="right" closable={true} onClose={() => localStore.showAdd = false} visible={localStore.showAdd}>
                        <AddFormView onAdd={localStore.handleAdd} accountId={match.params.accountId}/>
                    </Drawer>}
                </>
            }
        </Col>
  </Row>
    });
}