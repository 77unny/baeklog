import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import authReducer from './authReducer';
import postReducer from './postReducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth  : authReducer,
  posts : postReducer
});

export default createRootReducer;