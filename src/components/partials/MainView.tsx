import { observer, useObserver, useLocalStore } from 'mobx-react';
import * as React from 'react';
import { Layout } from 'antd';
import { Footer } from "../common/FooterView"
import { Header } from "../common/HeaderView";

import { appStoreContext } from '../../stores/AppStoreProvider';

const Canvas = React.lazy(() => import(/* webpackChunkName: "app-canvas" */ "@kartikrao/lib-forms/lib/components/canvas/Canvas").then((module) => {return {default: module.Canvas}}));
const AccountsView = React.lazy(() => import(/* webpackChunkName: "app-accounts" */ "./AccountsView").then((module) => {return {default: module.AccountsView}}));
const FormsView = React.lazy(() => import(/* webpackChunkName: "app-forms" */ "./FormsView").then((module) => {return {default: module.FormsView}}));
const AdminView = React.lazy(() => import(/* webpackChunkName: "app-admin" */ "./AdminView").then((module) => {return {default: module.AdminView}}));
const UsersView = React.lazy(() => import(/* webpackChunkName: "app-users" */ "./UsersView").then((module) => {return {default: module.UsersView}}));
const AccountAdminView = React.lazy(() => import(/* webpackChunkName: "app-accadmin" */ "./AccountAdminView").then((module) => {return {default: module.AccoountAdminView}}));

export const MainView: React.FC<any> = () => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        isAdmin: store.auth.group == "Admin",
        isAccountAdmin: store.auth.group == "AccountAdmin",
        viewName: store.view.currentView.name
    }));

    console.log("MainView", store.view.currentView);

    return useObserver(() => {
        return <div>
        <Layout.Header className="fl-header">
            <Header />
        </Layout.Header>
        <Layout.Content className="fl-content">
            <div className="fl-main">
                <React.Suspense fallback="Loading...">
                    {localStore.viewName == 'canvas' && <Canvas />}
                    {localStore.viewName == 'forms'  && <FormsView />}
                    {/* {localStore.viewName == 'users'  && <UsersView />} */}
                    {localStore.viewName == 'admin'  && localStore.isAdmin && <AdminView />}
                    {localStore.viewName == 'accounts' && localStore.isAdmin && <AccountsView />}
                    {localStore.viewName == 'admin' && localStore.isAccountAdmin && <AccountAdminView/>}
                </React.Suspense>
            </div>
        </Layout.Content>
        <Layout.Footer className="fl-footer">
            <Footer />
        </Layout.Footer>
    </div>
    })
}
