import { createStore, applyMiddleware, combineReducers } from 'redux'
import questions from './reducers/questions'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const logger = createLogger();

export const history = createHistory();
const middleware = routerMiddleware(history);

export const store = createStore(
  combineReducers({
    questions,
    router: routerReducer,
  }),
  applyMiddleware(middleware, thunk, logger)
);

export default store;