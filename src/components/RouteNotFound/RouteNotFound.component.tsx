import React from "react";
import { Redirect, useLocation } from "react-router-dom";

/**
 * Shows the 404 page when a visited url is not found.
 */
const RouteNotFound = () => {
  const location = useLocation();
  const { pathname } = location;

  const to = {
    pathname: pathname,
    state: {
      status: 404
    }
  };

  return <Redirect to={to} push={false} />;
};

export default RouteNotFound;
