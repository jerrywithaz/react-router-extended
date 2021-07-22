import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';
import { History } from 'history';
import { RedirectAfterLoginProps } from './RedirectAfterLogin.types';

/**
 * Takes care of redirecting a user to the main page of
 * an app after they have been authenticated. This will only
 * redirect after an asynchronous authentication change. If the
 * app is initialized with an authentication status of true
 * then the redirect will not occur.
 */
const RedirectAfterLogin = ({
    authenticated: currentlyAuthenticated,
    redirectPathAfterLogin,
}: RedirectAfterLoginProps): JSX.Element | null => {
    const [redirectPath, setRedirectPath] = useState<
        History.LocationDescriptor
    >(redirectPathAfterLogin);
    const { state } = useLocation<{ from?: string }>();

    useEffect(() => {
        if (state?.from) {
            setRedirectPath(state.from);
        }
    }, [currentlyAuthenticated, state]);

    return currentlyAuthenticated && redirectPath && <Redirect to={redirectPath} />
};

export default RedirectAfterLogin;
