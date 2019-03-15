import * as director from 'director';
import { autorun } from 'mobx';
import { IRootStore } from './stores/RootStore';
import ViewStore from "./stores/ViewStore";

export function startRouter(store: IRootStore) {
    let {viewStore} = store;

    // update state on url change
    const router = new director.Router({
        "/home": () => viewStore.showHome(),
        "/users": () => viewStore.showUsers(),
        "/profile": () => viewStore.showProfile(),
        "/forms": () => viewStore.showForms(),
        "/canvas": () => viewStore.showCanvas()
    });

    router.configure({
        notfound: () => viewStore.showLogin(),
        html5history: true
    });

    // update url on state changes
    autorun(() => {
        const path = viewStore.currentPath;
        const windowPath = window.location.pathname;

        console.log("Router", path, windowPath);
        if (path == "" && windowPath.length > 0) {
            viewStore.showView(ViewStore.Paths[windowPath].name)
            window.history.pushState(null, null, windowPath)
        } else if (path !== window.location.pathname){
            window.history.pushState(null, null, path)
        }
    })
}