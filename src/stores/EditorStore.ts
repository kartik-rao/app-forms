import {observable, action, computed} from "mobx";

export interface IEditorStore {
    isLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

class EditorStore implements IEditorStore {
    @observable loading: boolean = false;

    @computed get isLoading  () : boolean {
        return this.loading;
    }

    @action showLoading() {
        this.loading = true;
    }

    @action hideLoading() {
        this.loading = false;
    }
}

export default EditorStore;