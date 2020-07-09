import React from 'react';

/**
 * Creates test routes.
 * @param secureHomePageRoute Whether or not the home page is secure.
 */
const createRoutes = (secureHomePageRoute?: boolean) => [
  {
    key: "route-base-view",
    secure: secureHomePageRoute || false,
    path: "/",
    exact: true,
    component: () => <div>Home</div>,
    a11yMessage: "You have navigated to the Home Page",
    title: "Home",
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
];

export default createRoutes;