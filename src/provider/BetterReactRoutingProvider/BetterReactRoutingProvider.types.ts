import { RedirectPath } from "../../types";

export type BetterReactRoutingContextValue = {
    authenticated: boolean;
    redirectPath: RedirectPath;
};

export type BetterReactRoutingProviderProps = {
    authenticated: boolean;
    redirectPath?: RedirectPath;
};