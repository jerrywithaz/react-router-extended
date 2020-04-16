import produce, { Draft } from "immer";
import { AuthState, AuthAction } from "./auth.types";

export const initialState: AuthState = {
  authenticated: false,
  user: null
};

const authReducer = (state: AuthState = initialState, action: AuthAction) => {
  return produce(state, (draft: Draft<AuthState>) => {
    switch (action.type) {
      case "AUTH/LOGIN":
        draft.authenticated = true;
        draft.user = {
          firstName: "John",
          lastName: "Smith"
        };
        break;
      case "AUTH/LOGOUT":
        draft.authenticated = false;
        draft.user = null;
        break;
    }
  });
};

export default authReducer;
