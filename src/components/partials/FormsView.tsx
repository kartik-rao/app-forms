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

export const FormsView : React.FC<any> = () => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        forms: [],
        errors: [] as any[],
        showAdd: false,
        selectedItems: [] as any[],
        loading: true,
        handleAdd: async function (values: any) {
            console.log("FormsView.handleAdd values", values);
            let addFormResponse;
            store.view.showLoading();
            try {
                addFormResponse = await API.graphql(graphqlOperation(mutations.addForm, {input: values}));
                console.log("handleAdd Response", addFormResponse);
                if (addFormResponse.errors) {
                    this.errors = addFormResponse.errors;
                } else {
                    this.fetch();
                }
            } catch (errorResponse) {
                this.errors = errorResponse.errors;
            }
            console.log(this.errors);
            this.showAdd = false;
            store.view.hideLoading();
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
                    <Button icon="setting">Edit</Button>
                    <Divider type="vertical" />
                    <Button icon="copy">Clone</Button>
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

