import * as director from 'director';
import { autorun } from 'mobx';
import ViewStore from "./stores/ViewStore";
export function startRouter(store) {
    let { viewStore } = store;
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
        if (path == "" && windowPath.length > 0 && windowPath != "/") {
            viewStore.showView(ViewStore.Paths[windowPath].name);
            window.history.pushState(null, null, windowPath);
        }
        else if (path !== window.location.pathname) {
            window.history.pushState(null, null, path);
        }
    });
}
//# sourceMappingURL=Router.js.map