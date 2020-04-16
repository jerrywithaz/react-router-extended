import { SwitchProps as ReactRouterSwitchProps } from "react-router";
import { RouteConfig } from "./../../types";

export type SwitchProps = Omit<ReactRouterSwitchProps, "children"> & {
  routes: RouteConfig[];
};
