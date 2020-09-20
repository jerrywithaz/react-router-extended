import React, { FunctionComponent } from 'react';
import { useLocation } from 'react-router';
import { Http } from '@status/codes';
import { Capture404Props } from './Capture404.types';
import useReactRouterExtended from '../../hooks/useReactRouterExtended';

/**
 * Captures http 404 errors thrown by the `RouteNotFound` component
 * and shows a given 404 page.
 */
const Capture404: FunctionComponent<Capture404Props> = ({
    FoundComponent,
    NotFoundComponent,
    authenticating,
}: Capture404Props): JSX.Element => {
    const { routes } = useReactRouterExtended();
    const {
        state = {
            status: 200,
        },
    } = useLocation();

    if (state.status === Http.NotFound) {
        return (
            <NotFoundComponent
                is404
                authenticating={authenticating}
                routes={routes}
            />
        );
    }
    return (
        <FoundComponent
            is404={false}
            authenticating={authenticating}
            routes={routes}
        />
    );
};

export default Capture404;
