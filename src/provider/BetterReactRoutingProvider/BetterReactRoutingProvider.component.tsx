import React, { FunctionComponent } from 'react';
import { 
    BetterReactRoutingProviderProps, 
    BetterReactRoutingContextValue 
} from './BetterReactRoutingProvider.types';

const BetterReactRoutingContext = React.createContext<BetterReactRoutingContextValue | undefined>(undefined);

const BetterReactRoutingProvider: FunctionComponent<BetterReactRoutingProviderProps> = ({
    authenticated,
    children,
    redirectPath = "login" 
}) => {

    const value = {
        authenticated,
        redirectPath
    };

    return (
        <BetterReactRoutingContext.Provider value={value}>
            {children}
        </BetterReactRoutingContext.Provider>
    );
};

export { BetterReactRoutingContext };
export default BetterReactRoutingProvider;