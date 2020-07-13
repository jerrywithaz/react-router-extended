import React, { FunctionComponent, useEffect, useState } from 'react';
import useBetterReactRouting from '../../hooks/useBetterReactRouting';
import { Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';
import { History } from "history";

/**
 * Takes care of redirecting a user to the main page of 
 * an app after they have been authenticated. This will only
 * redirect after an asynchronous authentication change. If the
 * app is initialized with an authentication status of true
 * then the redirect will not occur.
 */
const RedirectAfterLogin: FunctionComponent = () => {

  const { authenticated: currentlyAuthenticated, redirectPathAfterLogin } = useBetterReactRouting();
  const [initialAuthentication] = useState<boolean>(currentlyAuthenticated);
  const [authenticatedAsync, setAuthenticatedAsync] = useState<boolean>(false);
  const [redirectPath, setRedirectPath] = useState<History.LocationDescriptor>(redirectPathAfterLogin);
  const { state } = useLocation<{from?: string}>();

  useEffect(() => {
    if (state?.from) {
      setRedirectPath(state.from);
    }
    if (initialAuthentication === false) {
      setAuthenticatedAsync(currentlyAuthenticated);
    }
  }, [currentlyAuthenticated, initialAuthentication, state]);

  return authenticatedAsync ? <Redirect to={redirectPath} /> : null;
  
}

export default RedirectAfterLogin;