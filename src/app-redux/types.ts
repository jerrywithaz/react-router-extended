import { AuthState } from "./auth/index";

export type AppState = {
  auth: AuthState;
};

declare module "react-redux" {
  export interface DefaultRootState extends AppState {}
}
