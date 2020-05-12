import React from "react";
import { Link } from "react-router-dom";
import useFocusOnMount from "../../hooks/useFocusOnMount";

const PageNotFound = () => {

  const linkRef = useFocusOnMount<HTMLAnchorElement>();

  return (
    <div>
      Page not found<Link to="/login" ref={linkRef}>Go Home</Link>
    </div>
  );
};

export default PageNotFound;
