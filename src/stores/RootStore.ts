import { EditorStore } from "@kartikrao/lib-forms";
import { action, computed, observable, configure } from "mobx";
import AuthStore, { IAuthStore } from "./AuthStore";
import { ContentStore } from "./ContentStore";
import { simpleFetch } from './fetch';
import ViewStore from "./ViewStore";

configure({enforceActions: "never"});

export interface IRootStore {
    isLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
    authStore: IAuthStore;
    editorStore: EditorStore;
    viewStore: ViewStore;
    debug: boolean;
}

class RootStore {
    authStore: AuthStore;
    editorStore: EditorStore;
    viewStore: ViewStore;
    contentStore: ContentStore;
    debug: boolean = location.href.indexOf('localhost') > -1;

    @observable loading: boolean;

    @computed get isLoading  () : boolean {
        return this.loading;
    }

    @action showLoading() {
        this.loading = true;
    }

    @action hideLoading() {
        this.loading = false;
    }

    constructor() {
        this.initialize();
    }

    @action initialize() {
        this.authStore = new AuthStore();
        this.editorStore = new EditorStore(null);
        this.viewStore = new ViewStore(simpleFetch);
        this.contentStore = new ContentStore();
        this.hideLoading();
    }
}

export default new RootStore();