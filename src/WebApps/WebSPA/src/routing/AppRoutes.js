import React from "react";
import { Switch } from "react-router-dom";

import PublicRoute from "../routing/config/PublicRoute";
import ProtectedRoute from "../routing/config/ProtectedRoute";

import Home from "../components/auth/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import StartGame from "../components/game/StartGame";
import SnakeGame from "../components/game/SnakeGame";

class AppRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <PublicRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/"
          component={Home}
        />
        <PublicRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/login"
          component={Login}
        />
        <PublicRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/register"
          component={Register}
        />
        <ProtectedRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/start-game"
          component={StartGame}
        />
        <ProtectedRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/snake-game"
          component={SnakeGame}
        />
      </Switch>
    );
  }
}

export default AppRoutes;
