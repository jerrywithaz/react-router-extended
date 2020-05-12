import React, { FunctionComponent, useEffect } from "react";
import {
  Route as ReactRouterRoute,
  RouteComponentProps
} from "react-router-dom";
import { Http } from "@status/codes";
import { RouteProps } from "./Route.types";
import UnauthorizedRedirect from "../UnauthorizedRedirect";
import useBetterReactRouting from "../../hooks/useBetterReactRouting";

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
  ...restProps
}: RouteProps) => {
  const { authenticated: isAuthenticated, setA11yMessage, setDocumentTitle } = useBetterReactRouting();

  function render(routeProps: RouteComponentProps) {
    if (isSecureRoute) {
      if (isAuthenticated) {
        return <Component {...routeProps} redirectPath={redirectPath} routes={routes} />;
      } else {
        return (
          <UnauthorizedRedirect 
            componentProps={routeProps} 
            componentRedirectPath={redirectPath} 
            reason={Http.Unauthorized} />
        );
      }
    } else {
      return <Component {...routeProps} redirectPath={redirectPath} routes={routes} />;
    }
  }

  useEffect(() => {
    setA11yMessage(a11yMessage);
    setDocumentTitle(title);
  }, []);
  
  return <ReactRouterRoute {...restProps} render={render} />;
};

export default Route;
