// import {makeMainRoutes} from "./Routes";
import * as ReactDOM from "react-dom";

// console.log("index.render"); ReactDOM.render(makeMainRoutes(),
// document.getElementById('root'))

import * as React from 'react';
import ConnectedApp from './App';

import {Provider} from "react-redux";
import {AppStore} from "./Store";
import {PersistGate} from 'redux-persist/integration/react'
import {ConnectedRouter} from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const store = AppStore.getInstance(history);

ReactDOM.render(
    <Provider store={store.store}>
    <PersistGate loading={<div> Loading </div>} persistor={store.persistor}>
        <ConnectedRouter history={history}>
            <ConnectedApp history={history} location={location}/>
        </ConnectedRouter>
    </PersistGate>
</Provider>, document.getElementById('root'));
