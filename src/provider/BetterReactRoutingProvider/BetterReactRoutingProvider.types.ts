import { RedirectPath } from "../../types";

export type BetterReactRoutingContextValue = {
    authenticated: boolean;
    redirectPath: RedirectPath;
    setA11yMessage: (message: string) => void;
    setDocumentTitle: (message: string) => void;
};

export type BetterReactRoutingProviderProps = {
    authenticated: boolean;
    initialA11yMessage: string;
    initialDocumentTitle: string;
    redirectPath?: RedirectPath;
};