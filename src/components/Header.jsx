import React from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          GiftLand
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={"/orders"}>
              All Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/placeorder"}>
              Place new order
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
