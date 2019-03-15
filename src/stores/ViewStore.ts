import { observable, computed, action } from 'mobx';

class ViewStore {

    fetch: any;
    @observable currentView = null;

    constructor(fetch: any) {
        this.fetch = fetch;
    }

    @computed get currentPath() {
        if(!this.currentView) {
            return "";
        }

        switch(this.currentView.name) {
            case "home" : return "/home"
            case "accounts" : return "/accounts"
            case "users" : return "/users"
            case "admin" : return "/admin"
            case "forms" : return "/forms"
            case "canvas" : return "/canvas"
            case "profile" : return "/profile"
            default: return "home";
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