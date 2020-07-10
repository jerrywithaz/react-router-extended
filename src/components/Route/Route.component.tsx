import React, { FunctionComponent, useEffect } from "react";
import {
  Route as ReactRouterRoute,
  RouteComponentProps,
} from "react-router-dom";
import { Http } from "@status/codes";
import { RouteProps } from "./Route.types";
import UnauthorizedRedirect from "../UnauthorizedRedirect";
import useBetterReactRouting from "../../hooks/useBetterReactRouting";
import { checkPermissions, checkRoles } from "./Route.utils";

/**
 * A wrapper around the react router `route` that providers
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
  } = useBetterReactRouting();

  function handlerRender(routeProps: RouteComponentProps): JSX.Element {
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
          return useComponentAsFallback ? (
            <Component
              {...routeProps}
              insufficientPermissions={true}
              redirectPath={redirectPath}
              routes={routes}
            />
          ) : FallbackPermissionsComponent ? (
            <FallbackPermissionsComponent />
          ) : (
            <GlobalFallbackPermissionsComponent />
          );
        } else if (!hasRoles) {
          return useComponentAsFallback ? (
            <Component
              {...routeProps}
              insufficientRoles={true}
              redirectPath={redirectPath}
              routes={routes}
            />
          ) : FallbackRolesComponent ? (
            <FallbackRolesComponent />
          ) : (
            <GlobalFallbackRolesComponent />
          );
        } else {
          return (
            <Component
              {...routeProps}
              redirectPath={redirectPath}
              routes={routes}
            />
          );
        }
      } else {
        return (
          <UnauthorizedRedirect
            componentProps={routeProps}
            componentRedirectPath={redirectPath}
            reason={Http.Unauthorized}
          />
        );
      }
    } else {
      return (
        <Component
          {...routeProps}
          redirectPath={redirectPath}
          routes={routes}
        />
      );
    }
  }

  useEffect(() => {
    setA11yMessage(a11yMessage);
    setDocumentTitle(title);
  }, []);

  return <ReactRouterRoute {...restProps} render={handlerRender} />;
};

export default Route;
