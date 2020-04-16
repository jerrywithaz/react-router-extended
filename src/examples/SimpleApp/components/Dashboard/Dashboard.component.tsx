import React, { FunctionComponent } from "react";
import { useLocation } from "react-router";
import * as Styled from "./Dashboard.style";
import Switch from "../../../../lib/components/Switch";
import { DashboardProps } from "./Dashboard.types";
import { SIDEBAR_LINKS } from "./Dashboard.constants";

const Dashboard: FunctionComponent<DashboardProps> = ({
  routes = []
}: DashboardProps) => {
  const { pathname } = useLocation();

  return (
    <Styled.Dashboard>
      <Styled.DashboardSidebar>
        {SIDEBAR_LINKS.map(link => (
          <Styled.DashboardLink
            key={link.to}
            to={link.to}
            isActive={link.to === pathname}
          >
            {link.name}
          </Styled.DashboardLink>
        ))}
      </Styled.DashboardSidebar>
      <Styled.DashboardContent>
        <Switch routes={routes} />
      </Styled.DashboardContent>
    </Styled.Dashboard>
  );
};

export default Dashboard;
