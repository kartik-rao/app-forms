import AuthStore, {IAuthStore} from "./AuthStore";
import EditorStore, {IEditorStore} from "./EditorStore";
import ViewStore from "./ViewStore";
import { simpleFetch } from './fetch';
import { ContentStore } from "./ContentStore";

export interface IRootStore {
    authStore: IAuthStore;
    editorStore: IEditorStore;
    viewStore: ViewStore;
    debug: boolean;
}

class RootStore {
    authStore: AuthStore;
    editorStore: EditorStore;
    viewStore: ViewStore;
    contentStore: ContentStore;
    isDebug: boolean = location.href.indexOf('localhost') > -1;

    constructor() {
        this.authStore = new AuthStore();
        this.editorStore = new EditorStore();
        this.viewStore = new ViewStore(simpleFetch);
        this.contentStore = new ContentStore();
    }
}

export default new RootStore();