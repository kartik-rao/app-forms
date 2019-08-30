import * as director from 'director';
import { autorun } from 'mobx';
import { Paths } from "./RouteNames";
import { AppStoreType } from './stores/AppStore';

export function startRouter(store: AppStoreType) {
    // update state on url change
    const router = new director.Router({
        "/home": () => store.view.showHome(),
        "/users": () => store.view.showUsers(),
        "/profile": () => store.view.showProfile(),
        "/forms": () => store.view.showForms(),
        "/canvas": () => store.view.showCanvas()
    });

    router.configure({
        notfound: () => store.view.showLogin(),
        html5history: true
    });

    // update url on state changes
    autorun(() => {
        const path = store.view.currentPath;
        const windowPath = window.location.pathname;
        if (path == "" && windowPath.length > 0 && windowPath != "/") {
            store.view.showView(Paths[windowPath].name)
            window.history.pushState(null, null, windowPath)
        } else if (path !== window.location.pathname){
            window.history.pushState(null, null, path)
        }
    })
}