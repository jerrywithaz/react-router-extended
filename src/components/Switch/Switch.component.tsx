import React, { FunctionComponent } from "react";
import { Switch as ReactRouterSwitch } from "react-router";
import RouteNotFound from "../RouteNotFound";
import Route from "../Route";
import { SwitchProps } from "./Switch.types";

/**
 * Renders a set of routes using react router `Switch` and
 * a `RouteNotfound` to capture invalid routes to
 * throw 404 errors to a user.
 */
const Switch: FunctionComponent<SwitchProps> = ({
  Animation = React.Fragment,
  canView = true,
  routes,
  ...switchProps
}: SwitchProps) => {
  return (
    <ReactRouterSwitch {...switchProps}>
      {canView && (
        routes.map(route => (
          <Route {...route} />
        ))
      )}
      <RouteNotFound />
    </ReactRouterSwitch>
  );
};

export default Switch;
