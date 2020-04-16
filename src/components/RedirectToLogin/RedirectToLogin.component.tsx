import React, { FunctionComponent } from "react";
import { Redirect, useLocation } from "react-router";
import { RedirectToLoginProps } from "./RedirectToLogin.types";
import useBetterReactRouting from "../../hooks/useBetterReactRouting";

const RedirectToLogin: FunctionComponent<RedirectToLoginProps> = ({
  reason
}: RedirectToLoginProps) => {
  const { loginPath } = useBetterReactRouting();
  const location = useLocation();

  return (
    <Redirect
      to={{
        pathname: loginPath,
        state: { status: reason, from: location.pathname }
      }}
    />
  );
};

export default RedirectToLogin;
