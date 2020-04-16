export type BetterReactRoutingContextValue = {
    authenticated: boolean;
    loginPath: string;
};

export type BetterReactRoutingProviderProps = {
    authenticated: boolean;
    loginPath?: string;
};