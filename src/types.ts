import { RouteProps, RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { History } from 'history';

export type RedirectPathFunction = (props: any) => History.LocationDescriptor;

export type RedirectPath = RedirectPathFunction | History.LocationDescriptor;

export type RedirectPathAfterLogin = History.LocationDescriptor;

export type RouteTitleFunction = (props: any) => string;

export type RouteConfigComponentProps<
    Params = any,
    State = History.LocationState,
    ComponentProps extends Record<string, unknown> = Record<string, unknown>,
    RouteConfigProps extends Record<string, unknown> = Record<string, unknown>
> = RouteComponentProps<Params, StaticContext, State> & {
    /** The custom redirect path for the component.  */
    redirectPath?: RedirectPath;
    /** The sub-routes passed to the component. Use the `Switch` to render sub-routes.  */
    routes?: RouteConfig<RouteConfigProps>[];
    /** A boolean indicating whether or not the component was rendered with insufficient permission access  */
    insufficientPermissions?: boolean;
    /** A boolean indicating whether or not the component was rendered with insufficient role access  */
    insufficientRoles?: boolean;
    /** Additional props that can be passed to the component. This is useful if you are transforming components defined in a `RouteConfig` and have additional props you are passing to the component. */
    componentProps: ComponentProps;
};

export type RouteConfigComponent<
    Params = any,
    State = History.LocationState,
    ComponentProps extends Record<string, unknown> = Record<string, unknown>
> = React.ComponentType<
    RouteConfigComponentProps<Params, State, ComponentProps>
>;

export type RouteConfig<
    ExtraConfig extends Record<string, unknown> = Record<string, unknown>
> = Omit<RouteProps, 'render' | 'children' | 'component' | 'exact'> & {
    /** The screen reader message describing this route that will be read allow to screen reader users. */
    a11yMessage?: string;
    /** A flag indicating whether or not the breadcrumb for this route should be rendered as a link or just text. */
    breadcrumbIsLink?: boolean;
    /** A flag indicating whether or not the breadcrumb for this route should be disabled i.e. not rendered. */
    breadcrumbIsDisabled?: boolean;
    /** The title of the breadcrumb for this route if you are using breadcrumbs. */
    breadcrumbTitle?: string;
    /** React Routers `exact` prop. */
    exact: boolean;
    /** The component to be rendered for the route. */
    component: RouteConfigComponent<any, any, any>;
    /** The component to be rendered when a user does not have sufficient permissions to access a route */
    fallbackPermissionsComponent?: React.ComponentType;
    /** The component to be rendered when a user does not have the required roles to access a route */
    fallbackRolesComponent?: React.ComponentType;
    /** The route key */
    key: string;
    /** The path of this route. */
    path: Exclude<RouteProps['path'], undefined>;
    /** A list of permissions required for a user to access this route. */
    permissions?: string[];
    /** A custom redirect path for this route i.e. useful for when you want to redirect a user to a different route when they try to hit a certain route. */
    redirectPath?: RedirectPath;
    /** Indicates whether or not a user requires all of the permissions defined in `permissions`. If not, it will default to requiring the user to have at least 1 of the permissions */
    requireAllPermissions?: boolean;
    /** Indicates whether or not a user requires all of the roles defined in `roles`. If not, it will default to requiring the user to have at least 1 of the roles */
    requireAllRoles?: boolean;
    /** Child routes for this route i.e. /admin/settings */
    routes?: RouteConfig[];
    /** Whether or not this route requires a user to be authenticated. Defaults to `true` */
    secure?: boolean;
    /** A list of roles required for a user to access this route. */
    roles?: string[];
    /** The document title to be set when this route renders.. */
    title: string;
    /** Indicates whether or not to use the `component` as the fallback. If true, your component will recieve `insufficientPermissions` or `insufficientRoles` as true. */
    useComponentAsFallback?: boolean;
} & ExtraConfig;
