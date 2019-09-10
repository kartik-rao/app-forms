import { observable } from 'mobx';

import {Views, Paths} from "../RouteNames";
import { ProgressViewProps } from '../components/partials/ProgressView';

export const createViewStore = () => {
    const store = {
        currentView: {name: ''} as {name: string},
        loading: {} as ProgressViewProps,
        debug: location.href.indexOf('localhost') > -1 as boolean,
        inAccountMenuCollapsed: true as boolean,
        get collapseAccountMenu() : boolean {
            return this.inAccountMenuCollapsed;
        },
        toggleAccountMenu: function() {
            this.inAccountMenuCollapsed = !this.inAccountMenuCollapsed;
        },
        setLoading: function(progress: ProgressViewProps) {
            this.loading = progress;
        },
        resetLoading: function() {
            this.loading = {};
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