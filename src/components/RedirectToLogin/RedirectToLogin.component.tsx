import React, { FunctionComponent } from "react";
import { Redirect, useLocation } from "react-router";
import { RedirectToLoginProps } from "./RedirectToLogin.types";

const RedirectToLogin: FunctionComponent<RedirectToLoginProps> = ({
  reason
}: RedirectToLoginProps) => {
  const location = useLocation();

  return (
    <Redirect
      to={{
        pathname: "/login",
        state: { status: reason, from: location.pathname }
      }}
    />
  );
};

export default RedirectToLogin;
