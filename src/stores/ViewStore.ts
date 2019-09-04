import { observable } from 'mobx';

import {Views, Paths} from "../RouteNames";

export const createViewStore = () => {
    const store = {
        currentView: {name: ''} as {name: string},
        loading: false,
        debug: location.href.indexOf('localhost') > -1,
        get isLoading() {
            return this.loading;
        },
        showLoading: function() {
            this.loading = true;
        },
        hideLoading: function() {
            this.loading = false;
        },
        get currentPath():  string {
            if(!this.currentView || !this.currentView.name || !Views[this.currentView.name]) {
                if(Paths[window.location.pathname]) {
                    return window.location.pathname;
                } else {
                    return "";
                }
            }
            return Views[this.currentView.name].path;
        },
        showView: function(name: string) {
            if (name && Views[name]) {
                this.currentView = Views[name];
                window.history.pushState(null, null, Views[name].path)
            } else {
                console.warn(`ViewStore.showView - view [${name}] does not exist`)
            }
        }
    };
    return observable(store);
}

export type ViewStoreType = ReturnType<typeof createViewStore>;