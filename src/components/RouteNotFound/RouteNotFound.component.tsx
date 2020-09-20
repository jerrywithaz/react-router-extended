import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import useReactRouterExtended from '../../hooks/useReactRouterExtended';

/**
 * Shows the 404 page when a visited url is not found.
 */
const RouteNotFound = (): JSX.Element => {
    const {
        setA11yMessage,
        setDocumentTitle,
        pageNotFoundA11yMessage,
        pageNotFoundDocumentTitle,
    } = useReactRouterExtended();
    const location = useLocation();
    const { pathname } = location;

    const to = {
        pathname,
        state: {
            status: 404,
        },
    };

    useEffect(() => {
        setA11yMessage(
            pageNotFoundA11yMessage || 'This page could not be found.'
        );
        setDocumentTitle(pageNotFoundDocumentTitle || 'Page Not Found');
    }, [
        pageNotFoundA11yMessage,
        pageNotFoundDocumentTitle,
        setA11yMessage,
        setDocumentTitle,
    ]);

    return <Redirect to={to} push={false} />;
};

export default RouteNotFound;
