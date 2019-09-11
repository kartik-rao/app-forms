import API, { graphqlOperation } from "@aws-amplify/api";
import { Col, Row, Skeleton, Menu } from "antd";
import PageHeader from "antd/lib/page-header";
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as moment from "moment";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";

const Description = ({ term, children, span = 12 }) => (
    <Col span={span}>
        <div className="fl-pageheader-description">
        <div className="fl-pageheader-term">{term}</div>
        <div className="fl-pageheader-detail">{children}</div>
        </div>
    </Col>
);

export interface AccountViewProps {
    accountId: string;
}

export const AccountView : React.FC<RouteComponentProps<AccountViewProps>> = (props) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        account: {} as any,
        errors: [] as any[],
        loading: true,
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

    React.useEffect(() => {
        let fetch = async function() {
            localStore.loading = true;
            store.view.setLoading({show: true, message: "Loading account", status: "active", type : "line", percent: 100});
            try {
                let args = {accountId: props.match.params.accountId};
                let account: any = await API.graphql(graphqlOperation(queries.getAccount, args));
                localStore.account = account.data.getAccount;
                localStore.loading = false;
            } catch (errorResponse) {
                store.view.currentAccount = null;
                localStore.errors = errorResponse.errors;
            }
            store.view.resetLoading();
        }
        fetch();
    }, [])

    return useObserver(() => {
        return  <>{localStore.loading ? <Skeleton active /> :
            <PageHeader title={localStore.account.name}
                subTitle={localStore.account.plan ? localStore.account.plan.planType.name : 'FREE'}>
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
