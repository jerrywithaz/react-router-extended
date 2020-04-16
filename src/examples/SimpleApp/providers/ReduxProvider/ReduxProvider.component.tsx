import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { configureStore } from "../../app-redux";

const history = createBrowserHistory();
const store = configureStore({}, history);

/**
 * The top-level app redux provider for managing global state
 * such as auth or alerts.
 */
const ReduxProvider: FunctionComponent = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export { store, history };
export default ReduxProvider;
