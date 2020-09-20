import { RouteConfig } from '../../types';

export type Capture404ComponentProps = {
    is404: boolean;
    authenticating?: boolean;
    routes: RouteConfig[];
};

export type Capture404Props = {
    authenticating?: boolean;
    FoundComponent: React.ComponentType<Capture404ComponentProps>;
    NotFoundComponent: React.ComponentType<Capture404ComponentProps>;
};
