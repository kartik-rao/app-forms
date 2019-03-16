import { observable, computed, action } from 'mobx';

class ViewStore {
    static Paths : any = {
        "/home"    : {name: "home", view: 'Home'},
        "/accounts": {name: "accounts", view: 'Accounts'},
        "/users"   : {name: "users", view: 'Users'},
        "/admin"   : {name: "admin", vieW: "Admin"},
        "/forms"   : {name: "forms", view: "Forms"},
        "/canvas"  : {name: "canvas", view: "Canvas"},
        "/profile" : {name: "profile", view: "Profile"},
    }

    static Views : any = {
        "home"    : {path: "/home", view: 'Home', name: "home"},
        "accounts": {path: "/accounts", view: 'Accounts', name: "accounts"},
        "users"   : {path: "/users", view: 'Users', name: "users"},
        "admin"   : {path: "/admin", view: "Admin", name: "admin"},
        "forms"   : {path: "/forms", view: "Forms", name: "forms"},
        "canvas"  : {path: "/canvas", view: "Canvas", name: "canvas"},
        "profile" : {path: "/profile", view: "Profile", name: "profile"}
    }

    fetch: any;
    @observable currentView = null;

    constructor(fetch: any) {
        this.fetch = fetch;
    }

    @computed get currentPath() {
        if(!this.currentView || !ViewStore.Views[this.currentView.name]) {
            return "";
        }
        return ViewStore.Views[this.currentView.name].path;
    }

    @action showView(name: string) {
        if (name && ViewStore.Views[name]) {
            this.currentView = ViewStore.Views[name]
        } else {
            console.warn(`ViewStore.showView - view [${name}] does not exist`)
        }

    }

    @action showHome() {
        this.currentView = {
            name: 'home'
        }
    }

    @action showAccounts() {
        this.currentView = {
            name: 'accounts'
        }
    }

    @action showAdmin() {
        this.currentView = {
            name: 'admin'
        }
    }

    @action showUsers() {
        this.currentView = {
            name: 'users'
        }
    }

    @action showForms() {
        this.currentView = {
            name: 'forms'
        }
    }

    @action showCanvas() {
        this.currentView = {
            name: 'canvas'
        }
    }

    @action showProfile() {
        this.currentView = {
            name: 'profile'
        }
    }

    @action showLogin() {
        this.currentView = {
            name: 'login'
        }
    }

}

export default ViewStore;