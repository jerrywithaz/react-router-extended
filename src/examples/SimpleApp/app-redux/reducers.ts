/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import { authReducer } from "./auth";

/**
 * Merges the main reducer with the router state and
 * dynamically injected reducers
 */
export default function createReducer(
  history: History<History.PoorMansUnknown>
) {
  return (injectedReducers = {}) => {
    const routerReducer = connectRouter(history);

    const rootReducer = combineReducers({
      auth: authReducer,
      router: routerReducer,
      ...injectedReducers
    });

    return rootReducer;
  };
}
