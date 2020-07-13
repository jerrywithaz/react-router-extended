import React, { FunctionComponent } from 'react';
import { BreadcrumbsProps } from './Breadcrumbs.types';
import useBetterReactRouting from '../../hooks/useBetterReactRouting';
import Breadcrumb from './components/Breadcrumb';
import { useRouteMatch, useLocation } from 'react-router';

const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = ({ BreadcrumbsComponent = "div" , BreadcrumbItemComponent = "span"}) => {

  const location = useLocation();
  const paths = location.pathname.split("/");
  const { routes } = useBetterReactRouting();
  const route = routes.find((route) => route.path === paths[0]);
  const match = useRouteMatch();

  return (
    <BreadcrumbsComponent>
    </BreadcrumbsComponent>
  );

};

export default Breadcrumbs;