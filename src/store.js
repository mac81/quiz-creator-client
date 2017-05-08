import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import application from './reducers/application';
import quizzes from './reducers/quizzes';
import questions from './reducers/questions';
import user from './reducers/user';

const logger = createLogger({
  collapsed: true
});

export const history = createHistory();
const middleware = routerMiddleware(history);

export const store = createStore(
  combineReducers({
    application,
    quizzes,
    questions,
    user,
    router: routerReducer,
  }),
  applyMiddleware(middleware, thunk, logger)
);

export default store;