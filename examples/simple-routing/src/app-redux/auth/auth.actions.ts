import { LoginAction, LogoutAction } from "./auth.types";

function login(username: string, password: string): LoginAction {
  return {
    type: "AUTH/LOGIN",
    payload: { username, password }
  };
}

function logout(): LogoutAction {
  return {
    type: "AUTH/LOGOUT"
  };
}

const AuthActions = {
  login,
  logout
};

export default AuthActions;
