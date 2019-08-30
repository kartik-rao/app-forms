import { observable } from 'mobx';
const Paths = {
    "/home": { name: "home", view: 'Home' },
    "/accounts": { name: "accounts", view: 'Accounts' },
    "/users": { name: "users", view: 'Users' },
    "/admin": { name: "admin", vieW: "Admin" },
    "/forms": { name: "forms", view: "Forms" },
    "/canvas": { name: "canvas", view: "Canvas" },
    "/profile": { name: "profile", view: "Profile" },
};
const Views = {
    "home": { path: "/home", view: 'Home', name: "home" },
    "accounts": { path: "/accounts", view: 'Accounts', name: "accounts" },
    "users": { path: "/users", view: 'Users', name: "users" },
    "admin": { path: "/admin", view: "Admin", name: "admin" },
    "forms": { path: "/forms", view: "Forms", name: "forms" },
    "canvas": { path: "/canvas", view: "Canvas", name: "canvas" },
    "profile": { path: "/profile", view: "Profile", name: "profile" }
};
export const createViewStore = () => {
    const store = {
        currentView: observable({}),
        get currentPath() {
            if (!this.currentView || !this.currentView.name || !Views[this.currentView.name]) {
                return "";
            }
            return Views[this.currentView.name].path;
        },
        showView(name) {
            if (name && Views[name]) {
                this.currentView = Views[name];
            }
            else {
                console.warn(`ViewStore.showView - view [${name}] does not exist`);
            }
        },
        showHome() {
            this.currentView = {
                name: 'home'
            };
        },
        showAccounts() {
            this.currentView = {
                name: 'accounts'
            };
        },
        showAdmin() {
            this.currentView = {
                name: 'admin'
            };
        },
        showUsers() {
            this.currentView = {
                name: 'users'
            };
        },
        showForms() {
            this.currentView = {
                name: 'forms'
            };
        },
        showCanvas() {
            this.currentView = {
                name: 'canvas'
            };
        },
        showProfile() {
            this.currentView = {
                name: 'profile'
            };
        },
        showLogin() {
            this.currentView = {
                name: 'login'
            };
        }
    };
    return store;
};
//# sourceMappingURL=ViewStore.js.map