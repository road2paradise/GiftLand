import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Route, Switch } from "react-router-dom";

import { Header } from "./components/Header.jsx";
import { NewOrder } from "./components/NewOrder";
import { HomePage } from "./components/HomePage";
import { Orders } from "./components/Orders";
const App = () => {
  return (
    <>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/placeorder" component={NewOrder} />
          <Route exact path="/orders" component={Orders} />
        </Switch>
      </div>
    </>
  );
};

export default withAuthenticator(App);
