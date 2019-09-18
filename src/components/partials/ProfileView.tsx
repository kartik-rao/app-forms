import API, { graphqlOperation } from "@aws-amplify/api";
import { Col, PageHeader, Row, Skeleton, Tag } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import short from 'short-uuid';
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";
import dayjs from 'dayjs';

let transform = short();
export interface IUsersViewProps {
    userId: string;
}

const Description = ({ term, children, span = 12 }) => (
    <Col span={span}>
        <div className="fl-pageheader-description">
        <div className="fl-pageheader-term">{term}</div>
        <div className="fl-pageheader-detail">{children}</div>
        </div>
    </Col>
);

export const ProfileView: React.FC<RouteComponentProps<any>> = ({match, history}) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        loading: true,
        user: null as any,
        errors: [] as any[],
        get groupColor() : string {
            if (this.user) {
                switch(this.user.userGroup) {
                    case "Admin":
                        return "blue";
                    case "AccountAdmin":
                        return "red";
                    case "AccountEditor":
                        return "orange"
                    default:
                        return "green"
                }
            }
            return ""
        }
    }));

    React.useEffect(() => {
        async function fetch () {
            localStore.loading = true;
            store.view.setLoading({show: true, message: "Loading profile", status: "active", type : "line", percent: 100});
            let query = "";
            try {
                query = "GetAccount";
                let response = await API.graphql(graphqlOperation(queries.getUser, {"userId": match.params.userId}));
                localStore.user = response['data']['getUser'];
            } catch (errorResponse) {
                console.log(query, errorResponse.errors);
                localStore.errors = errorResponse.errors;
            }
            store.view.resetLoading();
            localStore.loading = false;
        }
        fetch();
    }, []);

    return useObserver(() => {
        return <Row>
        <Col span={24} style={{padding:"25px"}}>
            {
                localStore.loading ? <Skeleton active />: <PageHeader 
                    title={`${localStore.user.given_name} ${localStore.user.family_name}`} onBack={() => history.goBack()}
                    subTitle={<Tag color={localStore.groupColor}>{localStore.user.userGroup}</Tag>}>
                    <div className="fl-pageheader-wrap">
                    <Row>
                        {localStore.user.ownedBy && <Description term="Created By"><a href={`mailto:${localStore.user.ownedBy.email}`}></a>{localStore.user.ownedBy.given_name} {localStore.user.ownedBy.family_name}</Description>}
                        <Description term="ID">{localStore.user.id}</Description>
                        <Description term="SFTP User Name">{transform.fromUUID(localStore.user.id)}</Description>
                        <Description term="Created"> {dayjs(localStore.user.createdAt).format('D MMM YY hh:mm a')}</Description>
                        <Description term="Updated"> {localStore.user.updateAt ? dayjs(localStore.user.updateAt).format('D MMM YY hh:mm a'): "-"}</Description>
                    </Row>
                </div>
                </PageHeader>
            }
        </Col>
    </Row>
    });
}