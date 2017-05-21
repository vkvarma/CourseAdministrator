import { Counter } from './counter-reducer';
import { combineReducers } from 'redux';
let rootReducer = <any>combineReducers({ Counter });

export default rootReducer;