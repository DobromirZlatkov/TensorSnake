import PropTypes from "prop-types";

class SnakeGame {
  constructor(options) {
    this.keyCommands = [];
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.scoreUiContainer = document.getElementById("score");
    this.levelUiContainer = document.getElementById("level");
    this.leftFoodsContainer = document.getElementById("left-food");

    this.direction = "";
    this.directionQueue = "";

    this.timer = false;
    this.options = options;

    this.gameOverCallback = options.gameOverCallback;
    this.foodsPerLevel = options.foodsPerLevel;
    this.levelIncreaseFactor = options.levelIncreaseFactor;
    this.numberOfWalls = options.numberOfWalls;
    this.snakeColor = options.snakeColor;
    this.foodColor = options.foodColor;
    this.wallColor = options.wallColor;
    this.playGroundColor = options.playGroundColor;
    this.playGroundStroke = options.playGroundStroke;
    this.fps = options.fps;

    this.level = 1;
    this.eatenFoods = 0;

    this.snakeLength = 5;
    this.wallMaxLength = 10;
    this.cellSize = 10;

    this.snake = [];
    this.walls = [];
    this.availableX = [];
    this.availableY = [];
    this.food = {
      x: 0,
      y: 0
    };

    this.score = 0;
    this.loop = undefined;

    // pushes possible x and y positions to seperate arrays
    for (
      let i = 0;
      i <= this.canvas.width - this.cellSize;
      i += this.cellSize
    ) {
      this.availableX.push(i);
      this.availableY.push(i);
    }

    // makes canvas interactive upon load
    this.canvas.setAttribute("tabindex", 1);
    this.canvas.focus();
  }

  /**
   * @desc Moves the snake to the next level, when all foods at this level are eaten
   */
  moveToNextLevel = () => {
    this.eatenFoods = 0;
    this.level++;
    this.fps -= this.levelIncreaseFactor + this.level;
    this.walls = [];
    this.numberOfWalls *= this.levelIncreaseFactor;
    this.createWalls();
    this.createFood();
  };

  /**
   * @desc Draws square at board. Used by all main game objects
   * @param {x} square X coordinate
   * @param {y} square Y coordinate
   */
  drawSquare = (x, y, color) => {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
  };

  /**
   * @desc Generates random number in range
   * @param {min} range minimum
   * @param {max} range maximum
   */
  getRandomInt = (min, max) => {
    const ceilMin = Math.ceil(min);
    const ceilMax = Math.floor(max);
    return Math.floor(Math.random() * (ceilMax - ceilMin)) + ceilMin;
  };

  /**
   * @desc Generates random walls data.
   */
  createWalls = () => {
    this.walls = [];
    for (let i = 0; i < this.numberOfWalls; i++) {
      const currWall = [];
      const startX = this.getRandomInt(
        this.snakeLength,
        this.availableX.length
      );
      const startY = this.getRandomInt(1, this.availableY.length);
      const currWallLenght = this.getRandomInt(1, this.wallMaxLength);
      const wallDirection = this.getRandomInt(1, 3);

      currWall.push({ x: startX * this.cellSize, y: startY * this.cellSize });

      for (let k = 0; k < currWallLenght; k++) {
        // validate if pixel is in snake
        let pixel = {};
        if (wallDirection === 1) {
          pixel = {
            x: (startX + k) * this.cellSize,
            y: startY * this.cellSize
          };
        } else {
          pixel = {
            x: startX * this.cellSize,
            y: (startY + k) * this.cellSize
          };
        }

        // validate if generated pixel is at the snakes body
        for (let j = 0; j < this.snake.length; j++) {
          if (
            this.checkCollision(
              this.food.x,
              this.food.y,
              this.snake[j].x,
              this.snake[j].y
            )
          ) {
            continue;
          }
        }

        currWall.push(pixel);
      }

      this.walls.push(currWall);
    }
  };

  /**
   * @desc Gets all wall pixels 'extracted because of nested loops for some better code'
   */
  getWallPixels = () => {
    const result = [];
    for (let i = 0; i < this.walls.length; i++) {
      const wallPixels = this.walls[i];
      for (let j = 0; j < wallPixels.length; j++) {
        result.push(wallPixels[j]);
      }
    }
    return result;
  };

  /**
   * @desc Gets all wall pixesls and draws them to the board
   */
  drawWalls = () => {
    const wallsPixels = this.getWallPixels();
    for (let i = 0; i < wallsPixels.length; i++) {
      this.drawSquare(wallsPixels[i].x, wallsPixels[i].y, this.wallColor);
    }
  };

  /**
   * @desc Generates random food data
   */
  createFood = () => {
    this.food.x = this.availableX[
      Math.floor(Math.random() * this.availableX.length)
    ]; // random x position from array
    this.food.y = this.availableY[
      Math.floor(Math.random() * this.availableY.length)
    ]; // random y position from array

    // looping through the snake and checking if there is a collision
    for (let i = 0; i < this.snake.length; i++) {
      if (
        this.checkCollision(
          this.food.x,
          this.food.y,
          this.snake[i].x,
          this.snake[i].y
        )
      ) {
        this.createFood();
      }
    }

    // check walls for collision
    const wallsPixels = this.getWallPixels();
    for (let i = 0; i < wallsPixels.length; i++) {
      if (
        this.checkCollision(
          this.food.x,
          this.food.y,
          wallsPixels[i].x,
          wallsPixels[i].y
        )
      ) {
        this.createFood();
      }
    }
  };

  /**
   * @desc Draws the food on the board
   */
  drawFood = () => {
    this.drawSquare(this.food.x, this.food.y, this.foodColor);
  };

  /**
   * @desc Sets the background color for the canvas
   */
  setBackground = (color1, color2) => {
    this.ctx.fillStyle = color1;
    this.ctx.strokeStyle = color2;

    this.ctx.fillRect(0, 0, this.canvas.height, this.canvas.width);

    for (let x = 0.5; x < this.canvas.width; x += this.cellSize) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
    }
    for (let y = 0.5; y < this.canvas.height; y += this.cellSize) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
    }

    this.ctx.stroke();
  };

  /**
   * @desc Generates snake data
   */
  createSnake = () => {
    this.snake = [];
    for (let i = this.snakeLength; i > 0; i--) {
      const k = i * this.cellSize;
      this.snake.push({ x: k, y: 0 });
    }
  };

  /**
   * @desc Draws snake data to the board
   */
  drawSnake = () => {
    for (let i = 0; i < this.snake.length; i++) {
      this.drawSquare(this.snake[i].x, this.snake[i].y, this.snakeColor);
    }
  };

  /**
   * @desc Keyboard commands handle. Changing direction logic.
   */
  changeDirection = keycode => {
    if (keycode === 37 && this.direction !== "right") {
      this.directionQueue = "left";
    } else if (keycode === 38 && this.direction !== "down") {
      this.directionQueue = "up";
    } else if (keycode === 39 && this.direction !== "left") {
      this.directionQueue = "right";
    } else if (keycode === 40 && this.direction !== "up") {
      this.directionQueue = "down";
    }
  };

  /**
   * @desc Moves the snake depending the direction.
   */
  moveSnake = () => {
    let x = this.snake[0].x;
    let y = this.snake[0].y;

    this.direction = this.directionQueue;

    if (this.direction === "right") {
      x += this.cellSize;
    } else if (this.direction === "left") {
      x -= this.cellSize;
    } else if (this.direction === "up") {
      y -= this.cellSize;
    } else if (this.direction === "down") {
      y += this.cellSize;
    }

    const tail = this.snake.pop();
    tail.x = x;
    tail.y = y;
    this.snake.unshift(tail);
  };

  /**
   * @desc Checks for collision between two coordinates
   * @param {x1} first pixel x coordinate
   * @param {x2} second pixel x coordinate
   * @param {y1} first pixel y coordinate
   * @param {y2} second pixel y coordinate
   */
  checkCollision = (x1, y1, x2, y2) => {
    if (x1 === x2 && y1 === y2) {
      return true;
    }
    return false;
  };

  /**
   * @desc Stops game. Stops frames refreshing
   */
  stopGame = () => {
    clearInterval(this.loop);
    this.timer = false;
  };

  /**
   * @desc Starts game. Starts frames refreshing
   */
  startGame = () => {
    if (!this.timer) {
      this.loop = setInterval(this.game, this.fps);
      this.timer = true;
      this.canvas.focus();
    }
  };

  /**
   * @desc Game over. Stops the game and executes callback from the UI component, to enable ui manipulations.
   */
  gameOver = () => {
    this.stopGame();
    this.gameOverCallback();
  };

  /**
   * @desc The game engine. Runs the entire logic of the game
   */
  game = () => {
    const self = this;
    const currCommand = self.keyCommands.shift();
    self.changeDirection(currCommand);
    const head = self.snake[0];

    // checking for collision at the end of the screen
    if (
      head.x < 0 ||
      head.x > self.canvas.width - self.cellSize ||
      head.y < 0 ||
      head.y > self.canvas.height - self.cellSize
    ) {
      this.gameOver();
    }

    // check for collision at wallpixel
    const allWallPixels = self.getWallPixels();
    for (let i = 0; i < allWallPixels.length; i++) {
      const wallPixel = allWallPixels[i];
      if (head.x === wallPixel.x && head.y === wallPixel.y) {
        this.gameOver();
      }
    }

    // checking for colisions with snake's body
    for (let i = 1; i < self.snake.length; i++) {
      if (head.x === self.snake[i].x && head.y === self.snake[i].y) {
        this.gameOver();
      }
    }

    // checking for collision with food
    if (self.checkCollision(head.x, head.y, self.food.x, self.food.y)) {
      self.snake[self.snake.length] = { x: head.x, y: head.y };
      self.createFood();
      self.drawFood();
      self.score += 10;
      self.eatenFoods++;

      // check if is time for new level
      if (self.eatenFoods >= self.foodsPerLevel) {
        self.moveToNextLevel();
      }
    }

    self.canvas.onkeydown = function(evt) {
      evt = evt || window.event;
      self.keyCommands.push(evt.keyCode);
    };

    self.ctx.beginPath();
    self.setBackground(self.playGroundColor, self.playGroundStroke);
    self.scoreUiContainer.innerHTML = self.score;
    self.levelUiContainer.innerHTML = self.level;
    self.leftFoodsContainer.innerHTML = self.foodsPerLevel - self.eatenFoods;
    self.drawSnake();
    self.drawFood();
    self.drawWalls();
    self.moveSnake();
  };

  /**
   * @desc Resets the state of the game
   */
  resetState = () => {
    this.gameOverCallback = this.options.gameOverCallback;
    this.foodsPerLevel = this.options.foodsPerLevel;
    this.levelIncreaseFactor = this.options.levelIncreaseFactor;
    this.numberOfWalls = this.options.numberOfWalls;
    this.snakeColor = this.options.snakeColor;
    this.foodColor = this.options.foodColor;
    this.wallColor = this.options.wallColor;
    this.playGroundColor = this.options.playGroundColor;
    this.playGroundStroke = this.options.playGroundStroke;
    this.fps = this.options.fps;

    this.level = 1;
    this.eatenFoods = 0;
    this.snakeLength = 5;
    this.score = 0;
    this.loop = undefined;
  };

  /**
   * @desc Creates new game and starts the frames on the game engine
   */
  newGame = () => {
    this.resetState();
    this.direction = "right"; // initial direction
    this.directionQueue = "right";
    this.ctx.beginPath();
    this.createSnake();
    this.createWalls();
    this.createFood();

    if (typeof this.loop !== "undefined") {
      this.stopGame();
    } else {
      this.startGame();
    }
  };
}

export default SnakeGame;
