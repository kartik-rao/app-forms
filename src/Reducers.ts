import { combineReducers } from 'redux';
import { authReducer } from './reducers/Auth';
import { constantsReducer } from './reducers/Config';
import { routerReducer } from 'react-router-redux'
import {canvasReducer} from "./reducers/Canvas";

const reducers = {
  auth: authReducer,
  constants: constantsReducer,
  canvas: canvasReducer
};

const reducer = combineReducers({ ...reducers, router: routerReducer });

export default reducer;