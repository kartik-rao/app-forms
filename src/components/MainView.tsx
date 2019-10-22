import { Layout } from 'antd';
import { useObserver } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { appStoreContext } from '../stores/AppStoreProvider';
import { Footer } from "./common/FooterView";
import Header from "./common/HeaderView";
import { CanvasView } from './form/CanvasView';
import { SiderNavView } from './common/SiderNavView';

const AllAccountsView = React.lazy(() => import(/* webpackChunkName: "app-accounts" */ "./account/AllAccountsView").then((module) => {return {default: module.AllAccountsView}}));
const FormsView = React.lazy(() => import(/* webpackChunkName: "app-forms" */ "./form/FormsView").then((module) => {return {default: module.FormsView}}));
const AdminView = React.lazy(() => import(/* webpackChunkName: "app-admin" */ "./admin/AdminView").then((module) => {return {default: module.AdminView}}));
const UsersView = React.lazy(() => import(/* webpackChunkName: "app-users" */ "./user/UsersView").then((module) => {return {default: module.UsersView}}));
const AccountView = React.lazy(() => import(/* webpackChunkName: "app-account" */ "./account/AccountView").then((module) => {return {default: module.AccountView}}));
const FormView = React.lazy(() => import(/* webpackChunkName: "app-form" */ "./form/FormView").then((module) => {return {default: module.FormView}}));
const ProfileView = React.lazy(() => import(/* webpackChunkName: "app-profile" */ "./user/ProfileView").then((module) => {return {default: module.ProfileView}}));

const AllPaths = [
    "/",
    "/profile",
    "/admin",
    "/accounts",
    "/users",
    "/profile/:userId",
    "/account/:accountId",
    "/account/:accountId/users",
    "/account/:accountId/forms",
    "/account/:accountId/forms/:formId",
    "/account/:accountId/forms/:formId/canvas/:versionId?"
]

export const MainView: React.FC<any> = () => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    return useObserver(() => {
        return <Layout >
            <BrowserRouter>
                <Layout.Header className="fl-header">
                    <Route component={Header} exact={true} path={AllPaths} />
                </Layout.Header>
                <Layout.Content className="fl-content">
                    <React.Suspense fallback="">
                    <Layout style={{height: '100%', backgroundColor: "#ffff"}} hasSider={true}>
                        <Route component={SiderNavView} exact={true} path={AllPaths} />
                        <Layout.Content style={{borderLeft: "1px solid gray"}}>
                            <Route exact={true} path="/accounts"                    component={AllAccountsView} key="allaccountsview"/>
                            <Route exact={true} path="/admin"                       component={AdminView}   key="adminview"/>
                            <Route exact={true} path="/users"                       component={UsersView}   key="allusersview"/>
                            <Route exact path="/account/:accountId"                 component={AccountView} key="accountview"/>
                            <Route path="/account/:accountId/users"                 component={UsersView}   key="usersview"/>
                            <Route path="/profile/:userId"                          component={ProfileView} key="profileview"/>
                            <Route exact={true} path="/account/:accountId/forms"    component={FormsView}   key="formsview"/>
                            <Route exact={true} path="/account/:accountId/forms/:formId"       component={FormView}    key="formview"/>
                            <Route path="/account/:accountId/forms/:formId/canvas/:versionId?" component={CanvasView}  key="canvasview"/>
                            <Route exact path="/" render={() => (
                                !store.auth.isAdmin ? <Redirect to={`/account/${store.auth.tenant}`}/> : <Redirect to={`/accounts`}/>
                            )}/>
                        </Layout.Content>
                    </Layout>
                    </React.Suspense>
                </Layout.Content>
                <Layout.Footer className="fl-footer">
                    <Footer />
                </Layout.Footer>
        </BrowserRouter>
    </Layout>
    });
}
