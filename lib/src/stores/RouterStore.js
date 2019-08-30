import createHistory from 'history/createBrowserHistory';
import { observable } from 'mobx';
export const createRouterStore = () => {
    const store = {
        location: observable({}),
        match: observable({}),
        history: observable(createHistory()),
        setRoute: function (location, match, history) {
            this.location = location;
            this.match = match;
            this.history = history;
        }
    };
    return store;
};
//# sourceMappingURL=RouterStore.js.map