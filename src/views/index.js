import React, { Component } from "react";
import { Redirect,Switch ,Route } from "react-router-dom";


class Main extends Component {
  render() {
    return(
      
      <Switch>
          <Redirect from="/user-operations" to="/user-operations" />

          <Redirect to="/app" />
      
      </Switch>
    );
  }
}
export default Main;
