import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      Page not found<Link to="/login">Go Home</Link>
    </div>
  );
};

export default PageNotFound;
