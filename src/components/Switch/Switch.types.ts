import { SwitchProps as ReactRouterSwitchProps } from "react-router";
import { RouteConfig } from "../../types";

export type SwitchProps = ReactRouterSwitchProps & {
  canView?: boolean;
  Animation?: React.ComponentType;
  routes?: RouteConfig[];
};
