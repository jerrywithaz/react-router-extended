import React, { FunctionComponent } from 'react';
import BetterReactRoutingProvider, { Switch, Capture404 } from '@jerrywithaz/better-react-router-routing';
import useAuthenticated from '../../hooks/useAuthenticated';
import routes from '../../routes';
import PageNotFound from '../PageNotFound';

const PageFound = () => {
    return <Switch routes={routes}/>
};

/**
 * Renders the root application routes as well as the 404 catcher.
 */
const AppRoutes: FunctionComponent = () => {

    const authenticated = useAuthenticated();

    function redirectPath(componentProps: any) {
        console.log(componentProps);
        return "/login";
    }

    return (
        <BetterReactRoutingProvider authenticated={authenticated} redirectPath={redirectPath}>
            <Capture404
                FoundComponent={PageFound}
                NotFoundComponent={PageNotFound}/>
        </BetterReactRoutingProvider>
    );
    
}

export default AppRoutes;