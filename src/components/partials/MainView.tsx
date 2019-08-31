import { observer, useObserver, useLocalStore } from 'mobx-react';
import * as React from 'react';
import { Layout } from 'antd';
import { Footer } from "../common/FooterView"
import { Header } from "../common/HeaderView";
import { Loading } from "../common/Loading";

import { appStoreContext } from '../../stores/AppStoreProvider';
import { toJS } from 'mobx';

const Canvas = React.lazy(() => import(/* webpackChunkName: "app-canvas" */ "@kartikrao/lib-forms/lib/components/canvas/Canvas").then((module) => {return {default: module.Canvas}}));
const AccountsView = React.lazy(() => import(/* webpackChunkName: "app-accounts" */ "./AccountsView").then((module) => {return {default: module.AccountsView}}));
const FormsView = React.lazy(() => import(/* webpackChunkName: "app-forms" */ "./FormsView").then((module) => {return {default: module.FormsView}}));
const AdminView = React.lazy(() => import(/* webpackChunkName: "app-admin" */ "./AdminView").then((module) => {return {default: module.AdminView}}));
const UsersView = React.lazy(() => import(/* webpackChunkName: "app-users" */ "./UsersView").then((module) => {return {default: module.UsersView}}));
const AccountAdminView = React.lazy(() => import(/* webpackChunkName: "app-accadmin" */ "./AccountAdminView").then((module) => {return {default: module.AccoountAdminView}}));

export const MainView: React.FC<any> = () => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    return useObserver(() => {
        return <div>
        <Layout.Header className="fl-header">
            <Header />
        </Layout.Header>
        <Layout.Content className="fl-content">
            <div className="fl-main">
                <React.Suspense fallback={<Loading />}>
                    {store.view.currentView.name == 'canvas' && <Canvas />}
                    {store.view.currentView.name == 'forms'  && <FormsView />}
                    {store.view.currentView.name == 'users'  && <UsersView />}
                    {store.view.currentView.name == 'admin'  && store.auth.isAdmin && <AdminView />}
                    {store.view.currentView.name == 'admin'  && store.auth.isAccountAdmin && <AccountAdminView/>}
                    {store.view.currentView.name == 'accounts' && store.auth.isAdmin && <AccountsView />}

                </React.Suspense>
            </div>
        </Layout.Content>
        <Layout.Footer className="fl-footer">
            <Footer />
        </Layout.Footer>
    </div>
    })
}
