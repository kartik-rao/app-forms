import { Layout } from 'antd';
import { useObserver } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { appStoreContext } from '../../stores/AppStoreProvider';
import { Footer } from "../common/FooterView";
import { Header } from "../common/HeaderView";
import { Loading } from "../common/Loading";
import { CanvasView } from './CanvasView';



const AccountsView = React.lazy(() => import(/* webpackChunkName: "app-accounts" */ "./AccountsView").then((module) => {return {default: module.AccountsView}}));
const FormsView = React.lazy(() => import(/* webpackChunkName: "app-forms" */ "./FormsView").then((module) => {return {default: module.FormsView}}));
const AdminView = React.lazy(() => import(/* webpackChunkName: "app-admin" */ "./AdminView").then((module) => {return {default: module.AdminView}}));
const UsersView = React.lazy(() => import(/* webpackChunkName: "app-users" */ "./UsersView").then((module) => {return {default: module.UsersView}}));
const AccountAdminView = React.lazy(() => import(/* webpackChunkName: "app-accadmin" */ "./AccountAdminView").then((module) => {return {default: module.AccoountAdminView}}));

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
                        <Route path="/forms" component={FormsView} />
                        <Route path="/users" component={UsersView} />
                        <Route path="/canvas/:mode/:formId" component={CanvasView}/>
                        {store.auth.isAccountAdmin && <Route path="/admin" component={AccountAdminView}/>}
                        {store.auth.isAdmin && <Route path="/accounts" component={AccountsView} />}
                        {store.auth.isAdmin && <Route path="/admin" component={AdminView}/>}
                    </React.Suspense>
                </Layout.Content>
                <Layout.Footer className="fl-footer">
                    <Footer />
                </Layout.Footer>
        </BrowserRouter>
    </Layout>
    });
}
