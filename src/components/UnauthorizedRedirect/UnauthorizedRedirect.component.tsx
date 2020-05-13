import React, { FunctionComponent } from "react";
import { Redirect, useLocation } from "react-router";
import { History } from 'history';
import { UnauthorizedRedirectProps } from "./UnauthorizedRedirect.types";
import useBetterReactRouting from "../../hooks/useBetterReactRouting";

const UnauthorizedRedirect: FunctionComponent<UnauthorizedRedirectProps> = ({
  componentRedirectPath,
  componentProps,
  reason
}: UnauthorizedRedirectProps): JSX.Element => {
  const { redirectPath } = useBetterReactRouting();
  const location = useLocation();

  function getLocationDescriptor(): History.LocationDescriptor {
    if (componentRedirectPath) {
      return typeof componentRedirectPath === "function" ? componentRedirectPath(componentProps) : componentRedirectPath;
    }
    else {
      return typeof redirectPath === "function" ? redirectPath(componentProps) : redirectPath;
    }
  }

  const locationDescriptor = getLocationDescriptor();

  const to = typeof locationDescriptor === "string" ? {
    pathname: locationDescriptor
  }: locationDescriptor;

  return (
    <Redirect
      to={{
        ...to,
        state: { 
          status: reason, 
          from: location.pathname 
        }
      }}
    />
  );
};

export default UnauthorizedRedirect;
