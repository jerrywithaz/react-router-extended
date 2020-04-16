import { createSelector } from "reselect";
import { AppState } from "../types";

const authenticated = createSelector(
  (state: AppState) => state.auth.authenticated,
  authenticated => authenticated
);

const user = createSelector(
  (state: AppState) => state.auth.user,
  user => user
);

const AuthSelectors = {
  authenticated,
  user
};

export default AuthSelectors;
