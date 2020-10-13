/* eslint-disable no-console */
import React, { FunctionComponent } from 'react';
import { Route, RouteChildrenProps } from 'react-router-dom';
import { BreadcrumbProps } from './Breadcrumb.types';
import useReactRouterExtended from '../../../../hooks/useReactRouterExtended';

const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({
    match,
    getRouteByPath,
}) => {
    const route = match ? getRouteByPath(match.url) : null;
    const { BreadcrumbLinkComponent } = useReactRouterExtended();

    if (!route || !match) return null;

    const { breadcrumbTitle, breadcrumbIsLink = true } = route;

    if (!breadcrumbTitle) {
        console.warn(
            `You are attemting to render a breadcrumb for ${match.url} but you did not set a 'breadcrumbTitle' in the configuration for this route. `
        );
    }

    return (
        <>
            <BreadcrumbLinkComponent
                name={breadcrumbTitle || ''}
                to={match.url}
                isExact={match.isExact}
                isLink={breadcrumbIsLink}
                route={route}
            />
            <Route
                path={`${match.url}/:path`}
                component={(props: RouteChildrenProps) => (
                    <Breadcrumb {...props} getRouteByPath={getRouteByPath} />
                )}
            />
        </>
    );
};

export default Breadcrumb;
