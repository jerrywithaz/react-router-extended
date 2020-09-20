import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Http } from '@status/codes';
import {
    ReactRouterExtendedProviderProps,
    ReactRouterExtendedContextValue,
} from './ReactRouterExtendedProvider.types';
import A11yMessage from '../../components/A11yMessage';
import DocumentTitle from '../../components/DocumentTitle';
import Capture404 from '../../components/Capture404';
import RedirectAfterLogin from '../../components/RedirectAfterLogin';
import { BreadcrumbLink } from '../../components/Breadcrumbs';
import { createRoutesMap } from '../../utils';

const ReactRouterExtendedContext = React.createContext<
    ReactRouterExtendedContextValue | undefined
>(undefined);

/**
 * The `ReactRouterExtendedProvider` provides your application with the extended react
 * router functionality such as 404 erros, permission/role based routing and everything it
 * needs to render a accessible, reliable and consitent navigation. It automatically captures
 * 404 routes and makes it easy to update the document title.
 */
function ReactRouterExtendedProvider({
    authenticated,
    authenticating,
    BreadcrumbLinkComponent = BreadcrumbLink,
    initialA11yMessage,
    initialDocumentTitle,
    pageNotFoundA11yMessage,
    pageNotFoundDocumentTitle,
    redirectPath = '/login',
    NotFoundComponent = () => null,
    FoundComponent,
    permissions,
    routes,
    roles,
    requireAllPermissions = false,
    requireAllRoles = false,
    FallbackPermissionsComponent = () => null,
    FallbackRolesComponent = () => null,
    redirectPathAfterLogin,
}: ReactRouterExtendedProviderProps): JSX.Element {
    const [documentTitle, setDocumentTitle] = useState<string>(
        initialDocumentTitle
    );
    const [a11yMessage, setA11yMessage] = useState<string>(initialA11yMessage);
    const routesMap = createRoutesMap(routes);
    const {
        state = {
            status: 200,
        },
    } = useLocation();
    const is404 = state.status === Http.NotFound;

    const value = {
        authenticated,
        authenticating,
        BreadcrumbLinkComponent,
        is404,
        pageNotFoundA11yMessage,
        pageNotFoundDocumentTitle,
        redirectPath,
        setA11yMessage,
        setDocumentTitle,
        permissions,
        routes,
        roles,
        requireAllPermissions,
        requireAllRoles,
        routesMap,
        FallbackPermissionsComponent,
        FallbackRolesComponent,
        redirectPathAfterLogin,
    };

    return (
        <ReactRouterExtendedContext.Provider value={value}>
            <DocumentTitle title={documentTitle} />
            <A11yMessage message={a11yMessage} />
            <Capture404
                authenticating={authenticating}
                FoundComponent={FoundComponent}
                NotFoundComponent={NotFoundComponent}
            />
            <RedirectAfterLogin />
        </ReactRouterExtendedContext.Provider>
    );
}

export { ReactRouterExtendedContext };
export default ReactRouterExtendedProvider;
