/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import createReducer from "./reducers";

export default function configureStore(
  initialState = {},
  history: History<History.PoorMansUnknown>
) {
  const reduxSagaMonitorOptions = {};

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // The Root Reducer
  const reducer = createReducer(history);

  const store = createStore(
    reducer(),
    initialState,
    composeWithDevTools(...enhancers)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept("app/reducers", () => {
      store.replaceReducer(reducer(store.injectedReducers));
    });
  }

  return store;
}
