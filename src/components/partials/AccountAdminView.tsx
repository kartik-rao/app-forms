import * as React from "react";
import { IRootStore } from "../../stores/RootStore";
import {observable, action} from "mobx";
import  API, {graphqlOperation } from "@aws-amplify/api";
import * as queries from '../../graphql/queries';
import {  Button, Spin, Tabs, Row, Col, Card } from "antd";
import { observer } from "mobx-react";
import { UsersView } from "./UsersView";
import PageHeader from "antd/lib/page-header";
import * as moment from "moment";

export interface IAccountAdminViewProps {
    store: IRootStore;
}

const Description = ({ term, children, span = 12 }) => (
    <Col span={span}>
        <div className="description">
        <div className="term">{term}</div>
        <div className="detail">{children}</div>
        </div>
    </Col>
);

@observer
export class AccountAdminView extends React.Component<IAccountAdminViewProps, any> {

    props: IAccountAdminViewProps;
    @observable showAdd: boolean = false;
    @observable account: any;
    @observable loading: boolean = true;
    @observable errors: any[];

    constructor(props: IAccountAdminViewProps) {
        super(props);
        this.props = props;
        this.fetch();
    }

    @action async fetch() {
        this.loading = true;
        try{
            let {tenant} = this.props.store.authStore;
            let args = {accountId: tenant};
            let account: any = await API.graphql(graphqlOperation(queries.getAccount, args));
            console.log(account.data.getAccount, typeof account);
            this.account = account.data.getAccount;
        } catch (errorResponse) {
            this.errors = errorResponse.errors;
        }
        this.loading = false;
    }

    @action handleAdd() {

    }

    render() {
        return <div>
            {!this.loading && <PageHeader title={this.account.name}
                subTitle={this.account.plan ? this.account.plan.name : 'FREE'}
                extra={[ <Button key="1">Change Plan</Button> ]}
                footer={
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Basic Information" key="1"/>
                        <Tabs.TabPane tab="Users" key="2">
                            <UsersView store={this.props.store} users={this.account.users.items || []}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Subscription" key="3" />
                    </Tabs>
                }>
                <div className="wrap">
                <Row>
                    <Description term="Primary Contact"><a href={"mailto:"+this.account.ownedBy.email}>{this.account.ownedBy.given_name} {this.account.ownedBy.family_name}</a></Description>
                    <Description term="ID">{this.account.id}</Description>
                    <Description term="Created date">{moment(this.account.createdAt).format("DD MMM YYYY")}</Description>
                    <Description term="Updated">{this.account.updatedAt ? moment(this.account.updatedAt).format("DD Mon YYYY"): ""}</Description>
                </Row>
                </div>
                </PageHeader>}
        </div>
    }
}