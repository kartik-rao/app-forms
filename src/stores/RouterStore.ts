import * as history from "history";
import { observable } from 'mobx';

export const createRouterStore = () => {
    const store = {
        location: {},
        match: {},
        history: history.createBrowserHistory(),
        setRoute: function (location, match, history) {
            this.location = location;
            this.match = match;
            this.history = history;
        }
    };
    return observable(store);
}
export type RouterStoreType = ReturnType<typeof createRouterStore>;