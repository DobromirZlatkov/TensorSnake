import React from "react";
import SnakeGameEngine from "../../utils/snake";

class StartGame extends React.Component {
  componentDidMount() {
    let snake = new SnakeGameEngine();
    snake.newGame();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="score" id="score">
              0
            </div>
            <canvas id="canvas" height="500px" width="500px" />
          </div>
        </div>
      </div>
    );
  }
}

export default StartGame;
