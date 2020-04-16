import * as Redux from "redux";

declare module "redux" {
  export interface Store {
    injectedReducers: any;
    injectedSagas: any;
    runSaga: any;
  }
}
