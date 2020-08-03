import React from "react";
import LinkRoute from "./LinkRoute";

import "./css/Header.css";

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <LinkRoute className="nav-brand" label="GiftLand" linkTo="/" />
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <LinkRoute
              className="nav-link"
              label="All Orders"
              linkTo="/orders"
            />
          </li>
          <li className="nav-item">
            <LinkRoute
              className="nav-link"
              label="Place Order"
              linkTo="/placeorder"
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};
