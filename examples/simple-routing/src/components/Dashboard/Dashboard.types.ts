import { RouteConfigComponentProps } from '@jerrywithaz/better-react-router-routing';

export type StyledDashboardLinkProps = {
  isActive: boolean;
};

export type DashboardSidebarLink = {
  to: string;
  name: string;
};

export type DashboardProps = RouteConfigComponentProps;
