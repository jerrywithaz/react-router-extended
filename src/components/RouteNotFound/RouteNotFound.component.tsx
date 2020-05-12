import React, { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import useBetterReactRouting from "../../hooks/useBetterReactRouting";

/**
 * Shows the 404 page when a visited url is not found.
 */
const RouteNotFound = () => {
  const { setA11yMessage, setDocumentTitle, pageNotFoundA11yMessage, pageNotFoundDocumentTitle } = useBetterReactRouting();
  const location = useLocation();
  const { pathname } = location;

  const to = {
    pathname: pathname,
    state: {
      status: 404
    }
  };

  useEffect(() => {
    setA11yMessage(pageNotFoundA11yMessage || "This page could not be found.");
    setDocumentTitle(pageNotFoundDocumentTitle || "Page Not Found");
  }, []);

  return <Redirect to={to} push={false} />;
};

export default RouteNotFound;
