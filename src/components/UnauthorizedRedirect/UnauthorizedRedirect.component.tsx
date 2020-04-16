import React, { FunctionComponent } from "react";
import { Redirect, useLocation } from "react-router";
import { UnauthorizedRedirectProps } from "./UnauthorizedRedirect.types";
import useBetterReactRouting from "../../hooks/useBetterReactRouting";

const UnauthorizedRedirect: FunctionComponent<UnauthorizedRedirectProps> = ({
  componentProps,
  reason
}: UnauthorizedRedirectProps) => {
  const { redirectPath } = useBetterReactRouting();
  const location = useLocation();

  const pathname = typeof redirectPath === "function" ? redirectPath(componentProps) : redirectPath;
  
  return (
    <Redirect
      to={{
        pathname: pathname,
        state: { status: reason, from: location.pathname }
      }}
    />
  );
};

export default UnauthorizedRedirect;
