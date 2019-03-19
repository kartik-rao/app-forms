import API, { graphqlOperation } from "@aws-amplify/api";
import { Button, Card, Col, Row, Spin, Drawer } from "antd";
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
    @observable loading: boolean = false;
    @observable errors: any[];
    @observable showAdd: boolean = false;
    @observable selectedItems : any[] = [];

    @action async fetch() {
        let response;
        let {tenant} = this.props.store.authStore;
        let args = {accountId: tenant};
        this.loading = true;
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
        this.loading = false;
    }

    @action.bound async handleAdd(values: any) {
        console.log("handleAdd values", values);
        let addFormResponse;
        this.loading = true;
        try {
            addFormResponse = await API.graphql(graphqlOperation(mutations.addForm, {form:values, notes: "Form initialized"}));
            console.log("handleAdd Response", addFormResponse);
            this.fetch();
        } catch (errorResponse) {
            this.errors = errorResponse.errors;
        }
        this.loading = false;
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
            render: (text, record) => {return <>{record.ownedBy.given_name} {record.ownedBy.family_name}</>}

        }
        , {
            title: 'Starts',
            dataIndex: 'startsAt',
            key: 'startsAt',
            render:(text, record) => {
                return <span>{text ? moment(text).toLocaleString() : ''}</span>
            }
        }, {
            title: 'Ends',
            dataIndex: 'endsAt',
            key: 'endsAt',
            render:(text, record) => {
                return <span>{text ? moment(text).toLocaleString() : ''}</span>
            }
        }];
        console.log(toJS(this.forms));
        return (
            <Row >
                <Col span={20} offset={2} style={{padding:"25px"}}>
                    <Card title={"All Forms"} style={{padding: 0}}>
                        <Typography style={{float: "left"}}>{this.hasSelectedItems ? `Selected ${this.selectedItems.length} of ${this.forms.length}` : ''}</Typography>
                        <>
                        <React.Fragment>
                            <Button icon="plus" type="primary" style={{float: 'right'}} onClick={()=>{this.showAddForm(true)}}>Add</Button>
                        </React.Fragment>
                        </>
                    </Card>
                    {!this.loading && <TableWrapper loading={this.loading} errors={this.errors} debug={this.props.store.debug}
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