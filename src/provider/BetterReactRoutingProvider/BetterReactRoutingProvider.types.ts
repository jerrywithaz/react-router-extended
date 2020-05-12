import { RedirectPath } from "../../types";

export type BetterReactRoutingContextValue = {
    authenticated: boolean;
    pageNotFoundA11yMessage: string | undefined;
    pageNotFoundDocumentTitle: string | undefined;
    redirectPath: RedirectPath;
    setA11yMessage: (message: string) => void;
    setDocumentTitle: (message: string) => void;
};

export type BetterReactRoutingProviderProps = {
    authenticated: boolean;
    initialA11yMessage: string;
    initialDocumentTitle: string;
    pageNotFoundA11yMessage?: string;
    pageNotFoundDocumentTitle?: string;
    redirectPath?: RedirectPath;
};