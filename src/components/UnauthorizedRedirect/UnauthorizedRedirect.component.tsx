import React, { FunctionComponent } from 'react';
import { Redirect, useLocation } from 'react-router';
import { History } from 'history';
import { UnauthorizedRedirectProps } from './UnauthorizedRedirect.types';
import useReactRouterExtended from '../../hooks/useReactRouterExtended';

const UnauthorizedRedirect: FunctionComponent<UnauthorizedRedirectProps> = ({
    componentRedirectPath,
    componentProps,
    reason,
}: UnauthorizedRedirectProps): JSX.Element => {
    const { redirectPath } = useReactRouterExtended();
    const location = useLocation();
    const additionalSearchParams = location.search.length
        ? `&${location.search.slice(1)}`
        : '';
    const search = `?redirect=${location.pathname}${additionalSearchParams}`;

    function getLocationDescriptor(): History.LocationDescriptor {
        if (componentRedirectPath) {
            return typeof componentRedirectPath === 'function'
                ? componentRedirectPath(componentProps)
                : componentRedirectPath;
        }

        return typeof redirectPath === 'function'
            ? redirectPath(componentProps)
            : redirectPath;
    }

    const locationDescriptor = getLocationDescriptor();

    const to =
        typeof locationDescriptor === 'string'
            ? {
                  pathname: locationDescriptor,
              }
            : locationDescriptor;

    return (
        <Redirect
            to={{
                ...to,
                search,
                state: {
                    status: reason,
                    from: location.pathname + location.search,
                },
            }}
        />
    );
};

export default UnauthorizedRedirect;
