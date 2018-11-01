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
        <PublicRoute exact path="/" component={Home} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
        <ProtectedRoute exact path="/start-game" component={StartGame} />
        <ProtectedRoute exact path="/snake-game" component={SnakeGame} />
      </Switch>
    );
  }
}

export default AppRoutes;
