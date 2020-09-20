import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { RouteChildrenProps, Route } from 'react-router-dom';
import { BreadcrumbsProps } from './Breadcrumbs.types';
import useReactRouterExtended from '../../hooks/useReactRouterExtended';
import Breadcrumb from './components/Breadcrumb';
import { createRoutesMap } from '../../utils';

/**
 * Creates breadcrumbs for a set of routes. By default breadcrumbs
 * will be created based on the `routes` passed into the Provider.
 */
export const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = ({
    routes,
}) => {
    const { routesMap: globalRoutesMap } = useReactRouterExtended();
    const routesMap = useMemo(
        () => (routes ? createRoutesMap(routes) : globalRoutesMap),
        [globalRoutesMap, routes]
    );
    const getRouteByPath = useCallback(
        (path: string) => {
            return routesMap[path];
        },
        [routesMap]
    );

    return (
        <Route
            path="/:path"
            component={(routeProps: RouteChildrenProps) => (
                <Breadcrumb {...routeProps} getRouteByPath={getRouteByPath} />
            )}
        />
    );
};

export default Breadcrumbs;
