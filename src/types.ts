import { RouteProps, RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import { History } from "history";

export type RouteConfigComponentProps<
  Params = any,
  State = History.LocationState
> = RouteComponentProps<Params, StaticContext, State> & {
  routes?: RouteConfig[];
};

export type RouteConfigComponent<
  Params = any,
  State = History.LocationState
> = React.ComponentType<RouteConfigComponentProps<Params, State>>;

export type RouteConfig = Omit<
  RouteProps,
  "render" | "children" | "component" | "exact"
> & {
  exact: boolean;
  component: RouteConfigComponent<any, any>;
  key: string;
  routes?: RouteConfig[];
  secure: boolean;
};
