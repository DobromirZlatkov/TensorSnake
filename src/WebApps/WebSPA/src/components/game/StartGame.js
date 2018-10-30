import React from "react";
import { Link } from "react-router-dom";

const jumbotronStyles = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center"
};

class StartGame extends React.Component {
  render() {
    return (
      <div className="jumbotron" style={jumbotronStyles}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Link className="btn btn-default" to={"/snake-game"}>
                Start Game
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StartGame;
