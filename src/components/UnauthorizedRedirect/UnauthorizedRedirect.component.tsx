import React, { FunctionComponent } from "react";
import { Redirect, useLocation } from "react-router";
import { UnauthorizedRedirectProps } from "./UnauthorizedRedirect.types";
import useBetterReactRouting from "../../hooks/useBetterReactRouting";

const UnauthorizedRedirect: FunctionComponent<UnauthorizedRedirectProps> = ({
  componentRedirectPath,
  componentProps,
  reason
}: UnauthorizedRedirectProps) => {
  const { redirectPath } = useBetterReactRouting();
  const location = useLocation();

  function getLocationDescriptor() {
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
