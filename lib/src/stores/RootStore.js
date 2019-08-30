var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { EditorStore } from "@kartikrao/lib-forms";
import { action, computed, observable, configure } from "mobx";
import AuthStore from "./AuthStore";
import { ContentStore } from "./ContentStore";
import { simpleFetch } from './fetch';
import ViewStore from "./ViewStore";
configure({ enforceActions: "never" });
class RootStore {
    constructor() {
        this.debug = location.href.indexOf('localhost') > -1;
        this.initialize();
    }
    get isLoading() {
        return this.loading;
    }
    showLoading() {
        this.loading = true;
    }
    hideLoading() {
        this.loading = false;
    }
    initialize() {
        this.authStore = new AuthStore();
        this.editorStore = new EditorStore(null);
        this.viewStore = new ViewStore(simpleFetch);
        this.contentStore = new ContentStore();
        this.hideLoading();
    }
}
__decorate([
    observable
], RootStore.prototype, "loading", void 0);
__decorate([
    computed
], RootStore.prototype, "isLoading", null);
__decorate([
    action
], RootStore.prototype, "showLoading", null);
__decorate([
    action
], RootStore.prototype, "hideLoading", null);
__decorate([
    action
], RootStore.prototype, "initialize", null);
export default new RootStore();
//# sourceMappingURL=RootStore.js.map