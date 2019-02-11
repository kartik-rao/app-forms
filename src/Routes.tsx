import * as React from 'react';
import App from './App';

import { Provider } from "react-redux";
import { AppStore } from "./Store";
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const store = AppStore.getInstance(history);

export const makeMainRoutes = () => {
    window['appstore'] = store;
    return (
        <Provider store={store.store}>
            <PersistGate loading={<div>Loading</div>} persistor={store.persistor}>
                <ConnectedRouter history={history}>
                    <App history={history} location={location} />
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
};