import { observable, action } from 'mobx';
import createHistory from 'history/createBrowserHistory';

export interface IRouterStore {
    location: any;
    match: any;
    history: any;
    setRoute: (location: any, match: any, history: any) => void;
}

class RouterStore implements IRouterStore {
  @observable location = {};
  @observable match = {};
  @observable history = createHistory();

  @action setRoute(location, match, history) {
    this.location = location;
    this.match = match;
    this.history = history;
  }
}

export default new RouterStore();