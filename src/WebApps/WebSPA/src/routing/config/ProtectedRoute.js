import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = rest.isAuthenticated;

  const nextUrl = rest.location.pathname;
  // Should redirect to login or unauthorized page
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to={`/login?next=${nextUrl}`} />
        )
      }
    />
  );
};

export default ProtectedRoute;
