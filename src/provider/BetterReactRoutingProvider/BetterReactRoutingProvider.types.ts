type RedirectPathFunction = (props: any) => string;

export type BetterReactRoutingContextValue = {
    authenticated: boolean;
    redirectPath: RedirectPathFunction | string;
};

export type BetterReactRoutingProviderProps = {
    authenticated: boolean;
    redirectPath?: RedirectPathFunction | string;
};