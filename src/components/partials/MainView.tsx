import { Layout } from 'antd';
import { useObserver } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { appStoreContext } from '../../stores/AppStoreProvider';
import { Footer } from "../common/FooterView";
import Header from "../common/HeaderView";
import { Loading } from "../common/Loading";
import { CanvasView } from './CanvasView';
import { InAccountMenuView } from './InAccountMenu';

const AllAccountsView = React.lazy(() => import(/* webpackChunkName: "app-accounts" */ "./AllAccountsView").then((module) => {return {default: module.AllAccountsView}}));
const FormsView = React.lazy(() => import(/* webpackChunkName: "app-forms" */ "./FormsView").then((module) => {return {default: module.FormsView}}));
const AdminView = React.lazy(() => import(/* webpackChunkName: "app-admin" */ "./AdminView").then((module) => {return {default: module.AdminView}}));
const UsersView = React.lazy(() => import(/* webpackChunkName: "app-users" */ "./UsersView").then((module) => {return {default: module.UsersView}}));
const AccountView = React.lazy(() => import(/* webpackChunkName: "app-accadmin" */ "./AccountView").then((module) => {return {default: module.AccountView}}));

export const MainView: React.FC<any> = () => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    return useObserver(() => {
        return <Layout>
            <BrowserRouter>
                <Layout.Header className="fl-header">
                    <Header />
                </Layout.Header>
                <Layout.Content className="fl-content">
                    <React.Suspense fallback={<Loading />}>
                        <Route exact={true} path="/admin"                component={AdminView} key="adminview"/>
                        <Route exact={true} path="/accounts"             component={AllAccountsView}  key="allaccountsview"/>
                        <Route exact={true} path="/users"                component={UsersView}  key="allusersview"/>
                        <Layout style={{height: '100%', backgroundColor: "#ffff" }}>
                            <Route path="/account/:accountId"  component={InAccountMenuView}/>
                            <Layout.Content>
                                <Route exact path="/account/:accountId"          component={AccountView} key="accountview"/>
                                <Route path="/account/:accountId/forms"          component={FormsView}   key="formsview"/>
                                <Route path="/account/:accountId/users"          component={UsersView}   key="usersview"/>
                                <Route path="/account/:accountId/form/:formId"   component={CanvasView}  key="formview"/>
                                <Route path="/account/:accountId/canvas/:formId" component={CanvasView}  key="canvasview"/>
                            </Layout.Content>
                        </Layout>
                        {/* {!store.auth.isAdmin && <Redirect to={`/account/${store.auth.tenant}`}/>} */}
                    </React.Suspense>
                </Layout.Content>
                <Layout.Footer className="fl-footer">
                    <Footer />
                </Layout.Footer>
        </BrowserRouter>
    </Layout>
    });
}
