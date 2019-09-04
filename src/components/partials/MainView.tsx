import { observer, useObserver, useLocalStore } from 'mobx-react';
import * as React from 'react';
import { Layout } from 'antd';
import { Footer } from "../common/FooterView"
import { Header } from "../common/HeaderView";
import { Loading } from "../common/Loading";

import { appStoreContext } from '../../stores/AppStoreProvider';
import { toJS } from 'mobx';
import AccountList from './AccountList';
import { CanvasView } from './CanvasView';
import { startRouter } from '../../Router';

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
        <Layout.Header className="fl-header">
            <Header />
        </Layout.Header>
        <Layout.Content className="fl-content">
            <React.Suspense fallback={<Loading />}>
                {store.view.currentPath == '/forms'  && <FormsView />}
                {store.view.currentPath == '/users'  && <UsersView />}
                {store.view.currentPath == '/admin'  && store.auth.isAdmin && <AdminView />}
                {store.view.currentPath == '/admin'  && store.auth.isAccountAdmin && <AccountAdminView/>}
                {store.view.currentPath == '/accounts' && store.auth.isAdmin && <AccountsView />}
            </React.Suspense>
        </Layout.Content>
        <Layout.Footer className="fl-footer">
            <Footer />
        </Layout.Footer>
    </Layout>
    })
}
