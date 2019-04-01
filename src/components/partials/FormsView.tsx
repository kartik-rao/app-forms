import API, { graphqlOperation } from "@aws-amplify/api";
import { Button, Card, Col, Row, Drawer, Divider } from "antd";
import Typography from "antd/lib/typography";
import { action, computed, observable, toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { IRootStore } from "../../stores/RootStore";
import { TableWrapper } from "../common/TableWrapper";
import AddFormView from "./AddFormView";
import moment from "moment";

export interface IFormsViewProps {
    store: IRootStore;
}

@observer
export class FormsView extends React.Component<IFormsViewProps, any> {
    props: IFormsViewProps;
    @observable forms = [];
    @observable nextToken = null;
    @observable errors: any[];
    @observable showAdd: boolean = false;
    @observable selectedItems : any[] = [];

    @action async fetch() {
        let response;
        let {authStore, editorStore} = this.props.store;
        let {tenant} = authStore;
        let args = {accountId: tenant};
        editorStore.showLoading();
        try {
            response = await API.graphql(graphqlOperation(queries.getAccount, args));
            let {forms} = response.data.getAccount;
            if (forms && forms.items) {
                this.forms = forms.items;
                this.nextToken = forms.nextToken;
            }
        } catch (errorResponse) {
            this.errors = errorResponse.errors;
        }
        editorStore.hideLoading();
    }

    @action.bound async handleAdd(values: any) {
        console.log("FormsView.handleAdd values", values);
        let addFormResponse;
        let {editorStore} = this.props.store;
        editorStore.showLoading();
        try {
            addFormResponse = await API.graphql(graphqlOperation(mutations.addForm, {form:values, notes: "Form initialized"}));
            console.log("handleAdd Response", addFormResponse);
            if (addFormResponse.errors) {
                this.errors = addFormResponse.errors;
            } else {
                this.fetch();
            }
        } catch (errorResponse) {
            this.errors = errorResponse.errors;
        }
        console.log(this.errors)
        this.showAdd = false;
        editorStore.hideLoading();
    }

    constructor(props: IFormsViewProps) {
        super(props);
        this.props = props;
        this.fetch();
    }

    @action.bound setSelectedItems(selectedItems) {
        this.selectedItems = selectedItems;
    }

    @action.bound showAddForm(show: boolean) {
        this.showAdd = show;
    }

    @computed get hasSelectedItems() {
        return this.selectedItems.length > 0;
    }

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc'
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
        let {isLoading} = this.props.store.editorStore;
        return (
            <Row style={{height: '100%', marginTop: '50px'}}>
                <Col span={20} offset={2} style={{padding:"25px"}}>
                    <Card title={"All Forms"} style={{padding: 0}}>
                        <Typography style={{float: "left"}}>{this.hasSelectedItems ? `Selected ${this.selectedItems.length} of ${this.forms.length}` : ''}</Typography>
                        <>
                        <React.Fragment>
                            <Button icon="plus" type="primary" style={{float: 'right'}} onClick={()=>{this.showAddForm(true)}}>Add</Button>
                        </React.Fragment>
                        </>
                    </Card>
                    {!isLoading&& <TableWrapper errors={this.errors} debug={this.props.store.debug}
                        data={this.forms} columns={columns} borderered={true} rowKey="id"
                        pagination={false} onSelection={this.setSelectedItems}/>}
                    {this.showAdd && <Drawer title="Add Form" placement="right" closable={true} onClose={() => this.showAdd = false} visible={this.showAdd}>
                        <AddFormView store={this.props.store} onAdd={this.handleAdd}/>
                    </Drawer>}
                </Col>
          </Row>
        );
    }
}