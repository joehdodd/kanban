import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { boards, lists, cards } from './reducers';

export const history = createHistory();
// eslint-disable-next-line
const loggerMiddleware = createLogger();
const routeMiddleware = routerMiddleware(history);
// const preloadedState = loadState();

export const appStore = createStore(
  combineReducers({
    boards,
    lists,
    cards,
    router: routerReducer
  }),
  // preloadedState,
  applyMiddleware(
    routeMiddleware,
    thunkMiddleware,
    loggerMiddleware
  )
);
