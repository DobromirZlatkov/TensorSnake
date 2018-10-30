import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = props => {
  const isAuthenticated = props.isAuthenticated;

  if (isAuthenticated) {
    return <Redirect to="/start-game/" />;
  } else {
    return <Route {...props} />;
  }
};

export default PublicRoute;
