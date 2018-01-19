import {combineReducers} from 'redux';
import userReducer from './userReducer';
import configurationReducer from './configurationReducer';
import logsReducer from "./logsReducer";

const reducers = combineReducers({
    users: userReducer,
    configuration: configurationReducer,
    logs: logsReducer
});

export default reducers;