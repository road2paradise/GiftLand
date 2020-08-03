import React from "react";
import { Link } from "react-router-dom";

import "./css/LinkRoute.css";

const LinkRoute = (props) => {
  const { linkTo, label, className } = props;
  return (
    <Link className={className} to={linkTo}>
      {label}
    </Link>
  );
};

export default LinkRoute;
