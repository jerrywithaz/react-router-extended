import { RouteProps, RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import { History } from "history";

export type RedirectPathFunction = (props: any) => History.LocationDescriptor;

export type RedirectPath = RedirectPathFunction | History.LocationDescriptor;

export type RouteTitleFunction = (props: any) => string;

export type RouteConfigComponentProps<
  Params = any,
  State = History.LocationState
> = RouteComponentProps<Params, StaticContext, State> & {
  redirectPath?: RedirectPath;
  routes?: RouteConfig[];
  insufficientPermissions?: boolean;
  insufficientRoles?: boolean;
};

export type RouteConfigComponent<
  Params = any,
  State = History.LocationState
  > = React.ComponentType<RouteConfigComponentProps<Params, State>>;

export type RouteConfig = Omit<
  RouteProps,
  "render" | "children" | "component" | "exact"
  > & {
  /** The screen reader message describing this route that will be read allow to screen reader users. */
  a11yMessage: string;
  exact: boolean;
  component: RouteConfigComponent<any, any>;
  /** The component to be rendered when a user does not have sufficient permissions to access a route */
  fallbackPermissionsComponent?: React.ComponentType;
  /** The component to be rendered when a user does not have the required roles to access a route */
  fallbackRolesComponent?: React.ComponentType;
  /** The route key */
  key: string;
  /** A list of permissions required for a user to access this route. */
  permissions?: string[],
  /** A custom redirect path for this route i.e. useful for when you want to redirect a user to a different route when they try to hit a certain route. */
  redirectPath?: RedirectPath;
  /** Indicates whether or not a user requires all of the permissions defined in `permissions`. If not, it will default to requiring the user to have at least 1 of the permissions */
  requireAllPermissions?: boolean,
  /** Indicates whether or not a user requires all of the roles defined in `roles`. If not, it will default to requiring the user to have at least 1 of the roles */
  requireAllRoles?: boolean,
  /** Child routes for this route i.e. /admin/settings */
  routes?: RouteConfig[];
  /** Whether or not this route requires a user to be authenticated. */
  secure: boolean;
  /** A list of roles required for a user to access this route. */
  roles?: string[],
  /** The document title to be set when this route renders.. */
  title: string;
  /** Indicates whether or not to use the `component` as the fallback. If true, your component will recieve `insufficientPermissions` or `insufficientRoles` as true. */
  useComponentAsFallback?: boolean;
};
