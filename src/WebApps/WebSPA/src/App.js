import React from "react";
import "./App.css";

import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import AppRoutes from "./routing/AppRoutes";
import { getStorageValue } from "./services/storageService";

class App extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const token = getStorageValue("authentication");
    let isAuthenticated = false;
    if (token !== null) {
      isAuthenticated = true;
    }

    return (
      <div className="App">
        <div
          style={
            this.props.isLoading ? { display: "block" } : { display: "none" }
          }
          className="loader"
        >
          <Loader type="Puff" color="#00BFFF" height="100" width="100" />
        </div>

        <div
          style={
            this.props.isLoading ? { display: "none" } : { display: "block" }
          }
        >
          <Navigation isAuthenticated={isAuthenticated} token={token} />
          <AppRoutes isAuthenticated={isAuthenticated} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
