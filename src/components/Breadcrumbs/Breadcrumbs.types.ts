import { RouteConfig } from '../../types';

export type BreadcrumbsProps = {
    /**
     * A custom set of routes to render breadcrumbs for. You can use this option
     * if you don't want to render breadcrumbs for the entire app but rather just a
     * section of the app.
     */
    routes?: RouteConfig[];
};
