import { RedirectPath, RouteConfig, RedirectPathAfterLogin } from '../../types';
import { Capture404ComponentProps } from '../../components/Capture404';
import { BreadcrumbLinkProps } from '../../components/Breadcrumbs';

export type ReactRouterExtendedContextValue = {
    authenticated: boolean;
    authenticating?: boolean;
    BreadcrumbLinkComponent: React.ComponentType<BreadcrumbLinkProps>;
    is404: boolean;
    FallbackPermissionsComponent: React.ComponentType;
    FallbackRolesComponent: React.ComponentType;
    pageNotFoundA11yMessage: string | undefined;
    pageNotFoundDocumentTitle: string | undefined;
    permissions?: string[];
    redirectPath: RedirectPath;
    redirectPathAfterLogin: RedirectPathAfterLogin;
    requireAllPermissions: boolean;
    requireAllRoles: boolean;
    roles?: string[];
    routes: RouteConfig[];
    routesMap: Record<string, RouteConfig>;
    setA11yMessage: (message: string) => void;
    setDocumentTitle: (message: string) => void;
};

export type ReactRouterExtendedProviderProps = {
    /** Whether or not the user is currently authenicated. This allows you to use your own authenication protocol. */
    authenticated: boolean;
    /** Whether or not the application is currently authenticating the user */
    authenticating?: boolean;
    /** The component to render for a link in the breadcrumb component. This allows you to customize the ui of your breadcrumbs. */
    BreadcrumbLinkComponent?: React.ComponentType<BreadcrumbLinkProps>;
    /** The component to be rendered when a user does not have sufficient permissions to access a route */
    FallbackPermissionsComponent?: React.ComponentType;
    /** The component to be rendered when a user does not have the required roles to access a route */
    FallbackRolesComponent?: React.ComponentType;
    /** The Component to be rendered when a route is found i.e. you App's routes. */
    FoundComponent: React.ComponentType<Capture404ComponentProps>;
    /** The screen reader message that is read to a user when the app first renders. */
    initialA11yMessage: string;
    /** The initial title of the document when the app first loads. */
    initialDocumentTitle: string;
    /** The component to be rendered when a route is not found i.e. your 404 page. */
    NotFoundComponent?: React.ComponentType<Capture404ComponentProps>;
    /** The screen reader message that is read to a user when a page is not found. */
    pageNotFoundA11yMessage?: string;
    /** The title of the document when your 404 page is rendered. */
    pageNotFoundDocumentTitle?: string;
    /** A list of the current users permissions */
    permissions?: string[];
    /** The url in which your app will be redirected to when a user is not authenticated i.e. /login. */
    redirectPath?: RedirectPath;
    /** The url in which your app will be redirected to once a user has been authenticated */
    redirectPathAfterLogin: RedirectPathAfterLogin;
    /** A global flag to ndicate whether or not a user always requires all of the permissions defined in `permissions`. If not, it will default to requiring the user to have at least 1 of the permissions */
    requireAllPermissions?: boolean;
    /** A global flag to ndicate whether or not a user always requires all of the roles defined in `roles`. If not, it will default to requiring the user to have at least 1 of the roles */
    requireAllRoles?: boolean;
    /** A list of the current users permissions */
    roles?: string[];
    /** Your applications routes. */
    routes: RouteConfig[];
};
