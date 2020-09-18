import React from 'react';
import { RouteConfig } from '../../types';

/**
 * Creates test routes.
 * @param routeProps Route config props to override all routes except the login route, use this to override it's default config.
 */
const createTestRoutes = (routeProps?: Partial<RouteConfig>) => [
  {
    key: "route-base-view",
    secure: false,
    path: "/",
    exact: true,
    component: () => <div>Home</div>,
    a11yMessage: "You have navigated to the Home Page",
    title: "Home",
    ...(routeProps || {})
  },
  {
    key: "route-login-view",
    secure: false,
    path: "/login",
    exact: true,
    component: () => <div>Login</div>,
    a11yMessage: "You have navigated to the Login Page",
    title: "Login",
  },
  {
    key: "route-admin-view",
    secure: true,
    path: "/admin",
    exact: true,
    component: () => <div>Admin</div>,
    a11yMessage: "You have navigated to the Admin Page",
    title: "Admin",
    ...(routeProps || {})
  },
];

export default createTestRoutes;