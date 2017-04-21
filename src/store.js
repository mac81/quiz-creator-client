import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import quizzes from './reducers/quizzes';
import questions from './reducers/questions';

const logger = createLogger({
  collapsed: true
});

export const history = createHistory();
const middleware = routerMiddleware(history);

export const store = createStore(
  combineReducers({
    quizzes,
    questions,
    router: routerReducer,
  }),
  applyMiddleware(middleware, thunk, logger)
);

export default store;