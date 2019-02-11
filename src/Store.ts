import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/es/storage';
import { createStore, Store, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer, Persistor } from 'redux-persist';

import rootReducer from "./Reducers";

export interface IStore {
    store: Store<{}>,
    persistor: Persistor
};

const persistConfig = {
    key: 'root',
    storage,
};

export class AppStore {
    private static _instance: IStore;
    private constructor() { }
    public static getInstance(history: any) : IStore {
        if (!this._instance) {
            let historyRouterMiddleware = routerMiddleware(history);
            let middlewares = [thunkMiddleware, historyRouterMiddleware, logger];
            let persistedReducer = persistReducer(persistConfig, rootReducer);
            let store = createStore(persistedReducer, applyMiddleware(...middlewares))
            let persistor = persistStore(store)
            this._instance = { store, persistor }
        }
        return this._instance;
    }
}