import React, { FunctionComponent, useState } from 'react';
import { 
    BetterReactRoutingProviderProps, 
    BetterReactRoutingContextValue 
} from './BetterReactRoutingProvider.types';
import A11yMessage from '../../components/A11yMessage';
import DocumentTitle from '../../components/DocumentTitle';
import Capture404 from '../../components/Capture404';

const BetterReactRoutingContext = React.createContext<BetterReactRoutingContextValue | undefined>(undefined);

/**
 * The `BetterReactRoutingProvider` provides your application tree with everything it
 * needs to render a accessible, reliable and consitent navigation. It automatically captures
 * 404 routes and makes it easy to update the document title.
 */
const BetterReactRoutingProvider: FunctionComponent<BetterReactRoutingProviderProps> = ({
    authenticated,
    initialA11yMessage,
    initialDocumentTitle,
    pageNotFoundA11yMessage,
    pageNotFoundDocumentTitle,
    redirectPath = "login",
    NotFoundComponent = () => null,
    FoundComponent
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
            <Capture404
                FoundComponent={FoundComponent}
                NotFoundComponent={NotFoundComponent} />
        </BetterReactRoutingContext.Provider>
    );
};

export { BetterReactRoutingContext };
export default BetterReactRoutingProvider;