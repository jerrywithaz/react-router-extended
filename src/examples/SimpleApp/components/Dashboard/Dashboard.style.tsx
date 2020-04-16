import styled from "styled-components";
import { Link } from "react-router-dom";
import { StyledDashboardLinkProps } from "./Dashboard.types";

const Dashboard = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

Dashboard.displayName = "Styled.Dashboard";

const DashboardSidebar = styled.div`
  width: 300px;
  background: #efefef;
  height: 100%;
`;

DashboardSidebar.displayName = "Styled.DashboardSidebar";

const DashboardContent = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  padding: 20px;
`;

DashboardContent.displayName = "Styled.DashboardContent";

const DashboardLink = styled(Link)<StyledDashboardLinkProps>`
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #000000;
  background: ${props => (props.isActive ? "#ccc" : "transparent")};
  &:hover {
    background: #ccc;
  }
`;

DashboardLink.displayName = "Styled.DashboardLink";

export { Dashboard, DashboardSidebar, DashboardContent, DashboardLink };
