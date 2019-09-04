import * as director from 'director';
import { autorun } from 'mobx';
import { Paths, Views } from "./RouteNames";
import { AppStoreType } from './stores/AppStore';
import React from 'react';
import { useObservable } from 'mobx-react-lite';

export function startRouter(store: AppStoreType) {
    // update state on url change
    // const router = new director.Router({
    //     "/home": () => store.view.showView(Views.home.name),
    //     "/users": () => store.view.showView(Views.users.name),
    //     "/profile": () => store.view.showView(Views.profile.name),
    //     "/forms": () => store.view.showView(Views.forms.name),
    //     "/canvas": () => store.view.showView(Views.canvas.name)
    // });

    // router.configure({
    //     notfound: () => store.view.showView(Views.home.name),
    //     html5history: true
    // });

    // React.useEffect(() => {
    //     console.log("Path Change");
    // }, [store.view.currentPath]);

    // autorun(() => {
    //     const path = store.view.currentPath;
    //     const windowPath = window.location.pathname;
    //     console.log("Auto RUN", path);
    //     if (path == "" && windowPath.length > 0 && windowPath != "/") {
    //         store.view.showView(Paths[windowPath].name)
    //         window.history.pushState(null, null, windowPath)
    //     } else if (path !== window.location.pathname) {
    //         window.history.pushState(null, null, path)
    //     }
    // }, {onError: (e) => {console.error(e)}})
}