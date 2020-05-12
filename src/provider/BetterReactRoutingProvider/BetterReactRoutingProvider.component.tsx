import React, { FunctionComponent, useState } from 'react';
import { 
    BetterReactRoutingProviderProps, 
    BetterReactRoutingContextValue 
} from './BetterReactRoutingProvider.types';
import A11yMessage from '../../components/A11yMessage';
import DocumentTitle from '../../components/DocumentTitle';

const BetterReactRoutingContext = React.createContext<BetterReactRoutingContextValue | undefined>(undefined);

const BetterReactRoutingProvider: FunctionComponent<BetterReactRoutingProviderProps> = ({
    authenticated,
    children,
    initialA11yMessage,
    initialDocumentTitle,
    redirectPath = "login" 
}) => {

    const [ documentTitle, setDocumentTitle ] = useState<string>(initialDocumentTitle);
    const [ a11yMessage, setA11yMessage ] = useState<string>(initialA11yMessage);

    const value = {
        authenticated,
        redirectPath,
        setA11yMessage,
        setDocumentTitle
    };

    return (
        <BetterReactRoutingContext.Provider value={value}>
            <DocumentTitle title={documentTitle}/>
            <A11yMessage message={a11yMessage}/>
            {children}
        </BetterReactRoutingContext.Provider>
    );
};

export { BetterReactRoutingContext };
export default BetterReactRoutingProvider;