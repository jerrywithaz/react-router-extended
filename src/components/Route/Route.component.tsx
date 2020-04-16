import React, { FunctionComponent } from "react";
import {
  Route as ReactRouterRoute,
  RouteComponentProps
} from "react-router-dom";
import { Http } from "@status/codes";
import { RouteProps } from "./Route.types";
import useAuthenticated from "../../hooks/useAuthenticated";
import RedirectToLogin from "../RedirectToLogin";

/**
 * A wrapper around the react router `route` that providers
 * authentication and sub-routes for the application.
 */
const Route: FunctionComponent<RouteProps> = ({
  secure: isSecureRoute = true,
  component: Component,
  routes,
  ...restProps
}: RouteProps) => {
  const isAuthenticated = useAuthenticated();

  function render(routeProps: RouteComponentProps) {
    if (isSecureRoute) {
      if (isAuthenticated) {
        return <Component {...routeProps} routes={routes} />;
      } else {
        return <RedirectToLogin reason={Http.Unauthorized} />;
      }
    } else {
      return <Component {...routeProps} routes={routes} />;
    }
  }

  return <ReactRouterRoute {...restProps} render={render} />;
};

export default Route;
