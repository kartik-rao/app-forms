import { observable } from 'mobx';

import {Views} from "../RouteNames";

export const createViewStore = () => {
    const store = {
        currentView: null as string,
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
                return "";
            }
            return Views[this.currentView.name].path;
        },
        showView: function(name: string) {
            if (name && Views[name]) {
                this.currentView = Views[name]
            } else {
                console.warn(`ViewStore.showView - view [${name}] does not exist`)
            }
        },
        showHome: function() {
            this.currentView = {
                name: 'home'
            }
        },
        showAccounts: function() {
            this.currentView = {
                name: 'accounts'
            }
        },
        showAdmin: function() {
            this.currentView = {
                name: 'admin'
            }
        },
        showUsers: function() {
            this.currentView = {
                name: 'users'
            }
        },
        showForms: function() {
            this.currentView = {
                name: 'forms'
            }
        },
        showCanvas: function() {
            this.currentView = {
                name: 'canvas'
            }
        },
        showProfile: function() {
            this.currentView = {
                name: 'profile'
            }
        },
        showLogin: function() {
            this.currentView = {
                name: 'login'
            }
        }
    };
    return observable(store);
}

export type ViewStoreType = ReturnType<typeof createViewStore>;