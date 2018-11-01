import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = props => {
  if (props.isAuthenticated) {
    return <Redirect to="/start-game/" />;
  } else {
    return <Route {...props} />;
  }
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated
  };
}

export default connect(
  mapStateToProps,
  null
)(PublicRoute);
