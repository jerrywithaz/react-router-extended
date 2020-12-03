import { RouteConfig } from '../../../../types';

export type BreadcrumbLinkProps<
    PassthroughProps extends Record<string, unknown> = Record<string, unknown>
> = {
    to: string;
    isExact: boolean;
    isLink: boolean;
    isDisabled: boolean;
    name: string;
    route: RouteConfig<PassthroughProps>;
};
