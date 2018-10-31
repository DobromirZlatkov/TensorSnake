import React from "react";

import SnakeGameEngine from "../../utils/snake";

const jumbotronStyles = {
  alignItems: "center"
};

class StartGame extends React.Component {
  constructor() {
    super();
    this.state = {
      gamePaused: false,
      gameOver: false
    };
  }

  componentDidMount() {
    const snakeGameOptions = {
      gameOverCallback: this.gameOverCallback,
      foodsPerLevel: 5,
      levelIncreaseFactor: 2,
      fps: 100,
      numberOfWalls: 5,
      cellSize: 10,
      snakeColor: "#3498db",
      foodColor: "#ff3636",
      wallColor: "#7ead48",
      playGroundColor: "#fff",
      playGroundStroke: "#fff"
    };
    this.snake = new SnakeGameEngine(snakeGameOptions);
    this.snake.newGame();

    this.canvas = document.getElementById("canvas");

    let self = this;
    this.canvas.onfocusout = function(evt) {
      self.snake.stopGame();
      self.setState({ gamePaused: true });
    };
  }

  gameOverCallback = () => {
    this.setState({ gameOver: true });
  };

  restartGame = () => {
    this.snake.newGame();
    this.setState({ gameOver: false });
    this.setState({ gamePaused: false });
  };

  resumeGame = () => {
    this.snake.startGame();
    this.setState({ gamePaused: false });
  };

  render() {
    return (
      <div className="jumbotron" style={jumbotronStyles}>
        <div className="container">
          <div className="row">
            <div className="col-sm-8 text-center">
              <div className="snake-game-container">
                <div
                  className="overlay"
                  style={
                    this.state.gamePaused
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <h3 className="overlay-title">PAUSED</h3>
                  <button
                    class="btn btn-default centered-button"
                    id="resume-btn"
                    onClick={this.resumeGame}
                  >
                    Resume
                  </button>
                </div>
                <div
                  className="overlay"
                  style={
                    this.state.gameOver
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <h3 className="overlay-title">GAME OVER</h3>
                  <button
                    class="btn btn-default centered-button"
                    id="resume-btn"
                    onClick={this.restartGame}
                  >
                    New game
                  </button>
                </div>
                <canvas id="canvas" height="500px" width="500px" />
              </div>
            </div>
            <div className="col-sm-4">
              <ul className="list-group">
                <li className="list-group-item">
                  Score <span id="score">0</span>
                </li>
                <li className="list-group-item">
                  Level <span id="level">0</span>
                </li>
                <li className="list-group-item">
                  Left Food <span id="left-food">0</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StartGame;
