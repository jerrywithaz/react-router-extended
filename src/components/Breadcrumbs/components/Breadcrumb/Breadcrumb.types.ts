import { RouteConfig } from "../../../../types";
import { RouteChildrenProps } from "react-router-dom";

export type BreadcrumbProps = RouteChildrenProps & {
  route: RouteConfig;
  Component: React.ComponentType | React.ElementType;
};