export type LoginAction = {
  type: "AUTH/LOGIN";
  payload: {
    username: string;
    password: string;
  };
};

export type LogoutAction = {
  type: "AUTH/LOGOUT";
};

export type AuthAction = LoginAction | LogoutAction;

export type AuthUser = {
  firstName: string;
  lastName: string;
};

export type AuthState = {
  authenticated: boolean;
  user: AuthUser | null;
};
