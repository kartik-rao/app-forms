import API, { graphqlOperation } from "@aws-amplify/api";
import { Button, Card, Col, Divider, Drawer, Row, Skeleton } from "antd";
import Typography from "antd/lib/typography";
import { useLocalStore, useObserver } from "mobx-react";
import moment from "moment";
import * as React from "react";
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";
import { TableWrapper } from "../common/TableWrapper";
import AddFormView from "./AddFormView";
import { Link } from "react-router-dom";
import { toJS, autorun } from "mobx";
import { EmptyForm } from "@kartikrao/lib-forms-core";

export const FormsView : React.FC<any> = () => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        forms: [],
        errors: [] as any[],
        showAdd: false,
        selectedItems: [] as any[],
        loading: true,
        handleClone: async function (formId: string) {
            try {
                store.view.setLoading({show: true, message: "Loading source form", status: "active", type : "line", percent: 10});
                let response = await API.graphql(graphqlOperation(queries.getForm, {formId: formId}));
                let sourceForm = response['data']['getForm'];
                let addFormResponse = await API.graphql(graphqlOperation(mutations.addForm, {input: {
                    name : `Copy of ${sourceForm.name}`,
                    description: sourceForm.description,
                    accountId: sourceForm.accountId
                }}));
                store.view.setLoading({show: true, message: "Saving copy", status: "active", type : "line", percent: 30});
                let addFormVersionResponse = await API.graphql(graphqlOperation(mutations.addFormVersion, {input: {
                    formId: addFormResponse['data']['addForm'].id,
                    accountId: sourceForm.accountId,
                    notes: `Copied ${sourceForm.name}`,
                    formData: sourceForm.version && sourceForm.version.formData ? sourceForm.version.formData : JSON.stringify({...EmptyForm})
                }}));
                this.forms.push(addFormVersionResponse['data']['addFormVersion']);
            } catch (errorResponse) {
                console.error(errorResponse);
                localStore.errors = errorResponse.errors;
            }
            store.view.resetLoading();
        },
        handleAdd: async function (values: any) {
            let addFormResponse;
            store.view.setLoading({show: true, message: "Creating new form", status: "active", type : "line", percent: 100});
            try {
                addFormResponse = await API.graphql(graphqlOperation(mutations.addForm, {input: values}));
                console.log("handleAdd Response", addFormResponse);
                if (addFormResponse.errors) {
                    this.errors = addFormResponse.errors;
                }
            } catch (errorResponse) {
                console.error(errorResponse);
                localStore.errors = errorResponse.errors;
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
        key: 'name'
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
            return moment(a["createdAt"]).diff(moment(b["createdAt"]))
        },
        sortDirections: ['descend', 'ascend'],
        render:(text, record) => {
            return <span>{moment(text).format("Do MMMM YYYY hh:mm A")}</span>
        }
    },
    {
        title: 'Starts',
        dataIndex: 'startsAt',
        key: 'startsAt',
        render:(text, record) => {
            return <span>{text ? moment(text).format("Do MMMM YYYY hh:mm A") : ''}</span>
        }
    }, {
        title: 'Ends',
        dataIndex: 'endsAt',
        key: 'endsAt',
        render:(text, record) => {
            return <span>{text ? moment(text).format("Do MMMM YYYY hh:mm A") : ''}</span>
        }
    },  {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
            <span>
                <div style={{textAlign: "center"}}>
                    <Link to={`/canvas/edit/${record.id}`}><Button icon="setting">Edit</Button></Link>
                    <Divider type="vertical" />
                    <Button icon="copy" onClick={(e) => localStore.handleClone(record.id)}>Clone</Button>
                    <Divider type="vertical" />
                    <Button type="danger" icon="pause">Pause</Button>
                </div>
            </span>
            )
        }
    ];
    React.useEffect(() => {
        let fetch = async function () {
            localStore.loading = true;
            try {
                store.view.setLoading({show: true, message: "Loading forms", status: "active", type : "line", percent: 100});
                let response = await API.graphql(graphqlOperation(queries.listForms));
                localStore.forms = response.data.listForms;
            } catch (errorResponse) {
                console.error(errorResponse);
                localStore.errors = errorResponse.errors;
            }
            if (!localStore.forms) {
                localStore.forms = [];
            }
            localStore.loading = false;
            store.view.resetLoading();
        }
        fetch();
    }, [])
    return  useObserver(() => {
        return <Row>
        <Col span={20} offset={2} style={{padding:"25px"}}>
            {
                localStore.loading ? <Skeleton active />:
                <>
                    <Card title={"All forms"} style={{padding: 0}}>
                        <Typography style={{float: "left"}}>{localStore.hasSelectedItems ? `Selected ${localStore.selectedItems.length} of ${localStore.forms.length}` : ''}</Typography>
                        <>
                        <React.Fragment>
                            <Button icon="plus" type="primary" style={{float: 'right'}} onClick={()=>{localStore.showAddForm(true)}}>Add</Button>
                        </React.Fragment>
                        </>
                    </Card>
                    {<TableWrapper errors={localStore.errors} debug={store.view.debug}
                        data={localStore.forms} columns={columns} bordered={true} rowKey="id"
                        pagination={false} onSelection={localStore.setSelectedItems}/>}
                    {localStore.showAdd && <Drawer title="Add Form" width="350px" placement="right" closable={true} onClose={() => localStore.showAdd = false} visible={localStore.showAdd}>
                    <AddFormView onAdd={localStore.handleAdd}/>
                    </Drawer>}
                </>
            }
        </Col>
  </Row>
    });
}

