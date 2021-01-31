import React from "react";
import NavCard from "../../NavCards/NavCards";
import "./HomePage.css";

export class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page">
        <div className="home-page-inner">
          <div className="navigation-card-container">
            <NavCard
              link="/orders"
              header="All orders"
              body="Click here to see all orders."
            />
            <NavCard
              link="/placeorder"
              header="Place new order"
              body="Click here to start a new order."
            />
          </div>
        </div>
      </div>
    );
  }
}
