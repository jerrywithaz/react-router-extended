import React, { FunctionComponent } from 'react';
import BetterReactRoutingProvider, { Switch } from '@jerrywithaz/better-react-router-routing';
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

    return (
        <BetterReactRoutingProvider 
            initialA11yMessage={"Welcome to JerryWithAZ"}
            initialDocumentTitle={"JerryWithAZ"}
            authenticated={authenticated}
            routes={routes}
            redirectPath="/login"
            FoundComponent={PageFound}
            NotFoundComponent={PageNotFound}
            permissions={["user.read", "user.write", "user.delete"]}
            roles={["User"]}
            FallbackPermissionsComponent={() => <div>You do not have permissions</div>}
            FallbackRolesComponent={() => <div>You do not have the correct role.</div>}/>
    );
    
}

export default AppRoutes;