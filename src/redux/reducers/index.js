// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import taskReducer from './taskReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
});

export default rootReducer;
