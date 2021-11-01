import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducer from './reducer';
import * as actions from './actions';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const INIT_STATE = {
  userName: null,
  displayName: null,
  userId: null,
  appReady: false,
  actions,
};

const store = createStore(reducer, INIT_STATE, applyMiddleware(...middlewares));

export default store;
