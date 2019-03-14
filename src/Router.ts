import * as director from 'director';
import { autorun } from 'mobx';
import { IRootStore } from './stores/RootStore';

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
        const path = viewStore.currentPath
        if (path !== window.location.pathname)
                window.history.pushState(null, null, path)
    })
}