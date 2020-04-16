import React, { FunctionComponent } from "react";
import { ConnectedRouter } from "connected-react-router";
import { RouterProviderProps } from "./RouterProvider.types";

const RouterProvider: FunctionComponent<RouterProviderProps> = ({
  children,
  history
}) => {
  return <ConnectedRouter history={history}>{children}</ConnectedRouter>;
};

export default RouterProvider;
