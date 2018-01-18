import { combineReducers } from 'redux';

import userReducer from './userReducer';
import configurationReducer from './configurationReducer';

const reducers = combineReducers({
    users: userReducer,
    configuration: configurationReducer
});

export default reducers;