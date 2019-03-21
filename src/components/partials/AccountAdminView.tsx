import * as React from "react";
import { IRootStore } from "../../stores/RootStore";
import {observable, action} from "mobx";
import  API, {graphqlOperation } from "@aws-amplify/api";
import * as queries from '../../graphql/queries';
import {  Button, Spin, Tabs, Row, Col, List } from "antd";
import { observer } from "mobx-react";
import { UsersView } from "./UsersView";
import PageHeader from "antd/lib/page-header";
import * as moment from "moment";

export interface IAccountAdminViewProps {
    store: IRootStore;
}

const Description = ({ term, children, span = 12 }) => (
    <Col span={span}>
        <div className="fl-pageheader-description">
        <div className="fl-pageheader-term">{term}</div>
        <div className="fl-pageheader-detail">{children}</div>
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
        this.props.store.editorStore.showLoading();
        try{
            let {tenant} = this.props.store.authStore;
            let args = {accountId: tenant};
            let account: any = await API.graphql(graphqlOperation(queries.getAccount, args));
            this.account = account.data.getAccount;
        } catch (errorResponse) {
            console.log("ERROR", errorResponse);
            this.errors = errorResponse.errors;
        } finally {
            this.props.store.editorStore.hideLoading();
        }
    }

    render() {
        let {isLoading} = this.props.store.editorStore;
        let showErrors = this.props.store.debug && this.errors;
        return <>
            {showErrors && <List dataSource={this.errors} renderItem={item => (
                    <List.Item>{item.message}</List.Item>
            )}/>}
            {!isLoading && this.account && <PageHeader title={this.account.name}
                subTitle={this.account.plan ? this.account.plan.planType.name : 'FREE'}
                extra={[ <Button key="1">Change Plan</Button> ]}
                footer={
                    <Tabs defaultActiveKey="1" animated={false}>
                        <Tabs.TabPane tab="Users" key="1" style={{paddingTop: "20px"}}>
                            <UsersView store={this.props.store} users={this.account.users.items || []}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Subscription" key="2" />
                    </Tabs>
                }>
                <div className="fl-pageheader-wrap">
                    <Row>
                        <Description term="Primary Contact"><a href={"mailto:"+this.account.ownedBy.email}>{this.account.ownedBy.given_name} {this.account.ownedBy.family_name}</a></Description>
                        <Description term="ID">{this.account.id}</Description>
                        <Description term="Created">{moment(this.account.createdAt).format("Do MMMM YYYY")}</Description>
                        <Description term="Updated">{this.account.updatedAt ? moment(this.account.updatedAt).format("DD Mon YYYY"): ""}</Description>
                    </Row>
                </div>
                </PageHeader>
            }
        </>
    }
}