import API, { graphqlOperation } from "@aws-amplify/api";
import { Button, Col, List, Row, Tabs } from "antd";
import PageHeader from "antd/lib/page-header";
import { useLocalStore, useObserver } from "mobx-react";
import * as moment from "moment";
import * as React from "react";
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";
import { UsersView } from "./UsersView";

const Description = ({ term, children, span = 12 }) => (
    <Col span={span}>
        <div className="fl-pageheader-description">
        <div className="fl-pageheader-term">{term}</div>
        <div className="fl-pageheader-detail">{children}</div>
        </div>
    </Col>
);

export const AccoountAdminView : React.FC<any> = () => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        account: {} as any,
        errors: [] as any[],
        fetch : async function() {
            store.view.showLoading();
            try{
                let args = {accountId: store.auth.tenant};
                let account: any = await API.graphql(graphqlOperation(queries.getAccount, args));
                this.account = account.data.getAccount;
            } catch (errorResponse) {
                console.log("ERROR", errorResponse);
                this.errors = errorResponse.errors;
            }
            store.view.hideLoading();
        },
        updateView: function () {
            this.fetch();
        },
        get showErrors() {
            return store.view.debug && this.errors && this.errors.length > 0;
        },
        get createdAt() {
            return this.account ? moment(this.account.createdAt).format("Do MMMM YYYY") : "";
        },
        get updatedAt() {
            return this.account && this.account.updatedAt ? moment(this.account.updatedAt).format("Do MMMM YYYY") : "";
        },
        get mailTo() {
            return `mailto:${this.account.ownedBy.email}`;
        }
    }));

    return useObserver(() => {
        return <>
        {localStore.showErrors && <List dataSource={localStore.errors} renderItem={item => (
            <List.Item>{item.message}</List.Item>
        )}/>}
        {!store.view.isLoading && localStore.account && <PageHeader title={localStore.account.name}
            subTitle={localStore.account.plan ? localStore.account.plan.planType.name : 'FREE'}
            extra={[ <Button key="1">Change Plan</Button> ]}
            footer={
                <Tabs defaultActiveKey="1" animated={false}>
                    <Tabs.TabPane tab="Users" key="1" style={{paddingTop: "20px"}}>
                        <UsersView onUpdate={localStore.updateView} users={localStore.account.users || []}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Subscription" key="2" />
                </Tabs>
            }>
            <div className="fl-pageheader-wrap">
                <Row>
                    <Description term="Primary Contact"><a href={localStore.mailTo}></a>{localStore.account.ownedBy.given_name} {localStore.account.ownedBy.family_name}</Description>
                    <Description term="ID">{localStore.account.id}</Description>
                    <Description term="Created">{localStore.createdAt}</Description>
                    <Description term="Updated">{localStore.updatedAt}</Description>
                </Row>
            </div>
            </PageHeader>
        }
    </>
    })
}
