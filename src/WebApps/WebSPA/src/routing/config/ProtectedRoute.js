import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const nextUrl = rest.location.pathname;
  // Should redirect to login or unauthorized page

  return (
    <Route
      {...rest}
      render={props => {
        return rest.isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to={`/login?next=${nextUrl}`} />
        );
      }}
    />
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated
  };
}

export default connect(
  mapStateToProps,
  null
)(ProtectedRoute);
