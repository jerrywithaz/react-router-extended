import { RouteChildrenProps } from 'react-router-dom';
import { RouteConfig } from '../../../../types';

export type BreadcrumbProps = RouteChildrenProps & {
    getRouteByPath: (path: string) => RouteConfig | undefined;
};
