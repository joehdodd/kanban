import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { boards, lists, cards, moveCardToNewList } from './reducers';
import { dummyState } from './state';

export const history = createHistory();
// eslint-disable-next-line
const loggerMiddleware = createLogger();
const routeMiddleware = routerMiddleware(history);
// const preloadedState = loadState();
const preloadedState = dummyState;

export const appStore = createStore(
  combineReducers({
    boards,
    lists,
    cards,
    moveCardToNewList,
    router: routerReducer,
  }),
  preloadedState,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    routeMiddleware,
    thunkMiddleware,
    loggerMiddleware
  )
);
