import AuthStore, {IAuthStore} from "./AuthStore";
import EditorStore, {IEditorStore} from "./EditorStore";
import ViewStore from "./ViewStore";
import { simpleFetch } from './fetch';

export interface IRootStore {
    authStore: IAuthStore;
    editorStore: IEditorStore;
    viewStore: ViewStore;
}

class RootStore {
    authStore: AuthStore;
    editorStore: EditorStore;
    viewStore: ViewStore;

    constructor() {
        this.authStore = new AuthStore();
        this.editorStore = new EditorStore();
        this.viewStore = new ViewStore(simpleFetch);
    }
}

export default new RootStore();