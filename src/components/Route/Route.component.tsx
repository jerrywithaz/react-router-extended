import React, { FunctionComponent, useEffect, useCallback } from 'react';
import {
    Route as ReactRouterRoute,
    RouteComponentProps,
} from 'react-router-dom';
import { Http } from '@status/codes';
import { RouteProps } from './Route.types';
import UnauthorizedRedirect from '../UnauthorizedRedirect';
import useReactRouterExtended from '../../hooks/useReactRouterExtended';
import { checkPermissions, checkRoles } from './Route.utils';
import { RouteConfigComponentProps } from '../../types';

/**
 * A wrapper around the react router `route` that provides
 * authentication and sub-routes for the application.
 */
const Route: FunctionComponent<RouteProps> = ({
    a11yMessage,
    secure: isSecureRoute = true,
    component: Component,
    routes,
    redirectPath,
    title,
    permissions: routesRequiredPermissions = [],
    roles: routesRequiredRoles = [],
    requireAllPermissions = false,
    requireAllRoles = false,
    fallbackPermissionsComponent: FallbackPermissionsComponent,
    fallbackRolesComponent: FallbackRolesComponent,
    useComponentAsFallback = false,
    ...restProps
}: RouteProps): JSX.Element => {
    const {
        authenticated: isAuthenticated,
        setA11yMessage,
        setDocumentTitle,
        permissions: usersPermissions = [],
        roles: usersRoles = [],
        requireAllPermissions: globalRequireAllPermissions,
        requireAllRoles: globalRequireAllRoles,
        FallbackPermissionsComponent: GlobalFallbackPermissionsComponent,
        FallbackRolesComponent: GlobalFallbackRolesComponent,
    } = useReactRouterExtended();

    const renderRouteComponent = useCallback(
        (
            componentProps: RouteConfigComponentProps<any, any, any>,
            LocalFallbackComponent: React.ComponentType | undefined,
            GlobalFallbackComponent: React.ComponentType
        ) => {
            if (useComponentAsFallback) {
                return (
                    <Component
                        {...componentProps}
                        redirectPath={redirectPath}
                        routes={routes}
                    />
                );
            }
            if (LocalFallbackComponent) {
                return <LocalFallbackComponent />;
            }
            return <GlobalFallbackComponent />;
        },
        [useComponentAsFallback, redirectPath, routes]
    );

    const handleRender = useCallback(
        (routeProps: RouteComponentProps) => {
            const hasPermission = checkPermissions(
                routesRequiredPermissions,
                usersPermissions,
                globalRequireAllPermissions || requireAllPermissions
            );
            const hasRoles = checkRoles(
                routesRequiredRoles,
                usersRoles,
                globalRequireAllRoles || requireAllRoles
            );

            if (isSecureRoute) {
                if (isAuthenticated) {
                    if (!hasPermission) {
                        return renderRouteComponent(
                            {
                                ...routeProps,
                                insufficientPermissions: true,
                            },
                            FallbackPermissionsComponent,
                            GlobalFallbackPermissionsComponent
                        );
                    }
                    if (!hasRoles) {
                        return renderRouteComponent(
                            {
                                ...routeProps,
                                insufficientRoles: true,
                            },
                            FallbackRolesComponent,
                            GlobalFallbackRolesComponent
                        );
                    }
                    return (
                        <Component
                            {...routeProps}
                            redirectPath={redirectPath}
                            routes={routes}
                        />
                    );
                }
                return (
                    <UnauthorizedRedirect
                        componentProps={routeProps}
                        componentRedirectPath={redirectPath}
                        reason={Http.Unauthorized}
                    />
                );
            }
            return (
                <Component
                    {...routeProps}
                    redirectPath={redirectPath}
                    routes={routes}
                />
            );
        },
        [
            FallbackPermissionsComponent,
            FallbackRolesComponent,
            GlobalFallbackPermissionsComponent,
            GlobalFallbackRolesComponent,
            globalRequireAllPermissions,
            globalRequireAllRoles,
            isAuthenticated,
            isSecureRoute,
            redirectPath,
            renderRouteComponent,
            requireAllPermissions,
            requireAllRoles,
            routes,
            routesRequiredPermissions,
            routesRequiredRoles,
            usersPermissions,
            usersRoles,
        ]
    );

    useEffect(() => {
        if (a11yMessage) setA11yMessage(a11yMessage);
        setDocumentTitle(title);
    }, [a11yMessage, setA11yMessage, setDocumentTitle, title]);

    return <ReactRouterRoute {...restProps} render={handleRender} />;
};

export default Route;
