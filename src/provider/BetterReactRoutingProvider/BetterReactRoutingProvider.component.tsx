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
    pageNotFoundA11yMessage,
    pageNotFoundDocumentTitle,
    redirectPath = "login" 
}): JSX.Element => {

    const [ documentTitle, setDocumentTitle ] = useState<string>(initialDocumentTitle);
    const [ a11yMessage, setA11yMessage ] = useState<string>(initialA11yMessage);

    const value = {
        authenticated,
        pageNotFoundA11yMessage,
        pageNotFoundDocumentTitle,
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