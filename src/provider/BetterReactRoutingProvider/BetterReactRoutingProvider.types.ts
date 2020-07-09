import { RedirectPath, RouteConfig } from "../../types";
import { Capture404ComponentProps } from "../../components/Capture404";

export type BetterReactRoutingContextValue = {
    authenticated: boolean;
    pageNotFoundA11yMessage: string | undefined;
    pageNotFoundDocumentTitle: string | undefined;
    redirectPath: RedirectPath;
    setA11yMessage: (message: string) => void;
    setDocumentTitle: (message: string) => void;
};

export type BetterReactRoutingProviderProps = {
    /** Whether or not the user is currently authenicated. This allows you to use your own authenication protocol. */
    authenticated: boolean;
    /** The Component to be rendered when a route is found i.e. you App's routes. */
    FoundComponent: React.ComponentType<Capture404ComponentProps>;
    /** The screen reader message that is read to a user when the app first renders. */
    initialA11yMessage: string;
    /** The initial title of the document when the app first loads. */
    initialDocumentTitle: string;
    /** The component to be rendered when a route is not found i.e. your 404 page. */
    NotFoundComponent?: React.ComponentType<Capture404ComponentProps>;
    /** The screen reader message that is read to a user when a page is not found. */
    pageNotFoundA11yMessage?: string;
    /** The title of the document when your 404 page is rendered. */
    pageNotFoundDocumentTitle?: string;
    /** The url in which your app will be redirected to when a user is not authenticated i.e. /login. */
    redirectPath?: RedirectPath;
    /** Your applications routes. */
    routes: RouteConfig[];
};