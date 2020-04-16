import { RouteConfigComponentProps } from "../../types";

export type StyledDashboardLinkProps = {
  isActive: boolean;
};

export type DashboardSidebarLink = {
  to: string;
  name: string;
};

export type DashboardProps = RouteConfigComponentProps;
