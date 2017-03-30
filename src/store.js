import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();

let store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
)

export default store;