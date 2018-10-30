class SnakeGame {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.scoreIs = document.getElementById("score");
    this.direction = "";
    this.directionQueue = "";
    this.fps = 100;
    this.snake = [];
    this.walls = [];
    this.numberOfWalls = 4;
    this.snakeLength = 5;
    this.cellSize = 20;
    this.snakeColor = "#3498db";
    this.foodColor = "#ff3636";
    this.wallColor = "#7ead48";
    this.playGroundColor = "#fff";
    this.playGroundStroke = "#eee";
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
    this.canvas.style.outline = "none";
    this.canvas.focus();
  }

  drawSquare = (x, y, color) => {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
  };

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // creating walls with its coordinates
  createWalls = () => {
    const maxLength = 10;

    for (let i = 0; i < this.numberOfWalls; i++) {
      let currWall = [];
      let startX = this.availableX[
        this.getRandomInt(this.snakeLength, this.availableX.length)
      ];
      let startY = this.availableY[
        this.getRandomInt(1, this.availableY.length)
      ];

      currWall.push({ x: startX * this.cellSize, y: startY * this.cellSize });

      let currWallLenght = this.getRandomInt(1, maxLength);
      for (let k = 0; k < currWallLenght; k++) {
        currWall.push({
          x: (startX + k) * this.cellSize,
          y: startY * this.cellSize
        });
      }

      console.log("currWall", currWall);

      this.walls.push(currWall);
    }

    // this.food.x = this.availableX[
    //   Math.floor(Math.random() * this.availableX.length)
    // ]; // random x position from array
    // this.food.y = this.availableY[
    //   Math.floor(Math.random() * this.availableY.length)
    // ]; // random y position from array
    // // looping through the snake and checking if there is a collision
    // for (let i = 0; i < this.snake.length; i++) {
    //   if (
    //     this.checkCollision(
    //       this.food.x,
    //       this.food.y,
    //       this.snake[i].x,
    //       this.snake[i].y
    //     )
    //   ) {
    //     this.createFood();
    //   }
    // }

    // let wall1 = [{ x: 0, y: 0 }, { x: 1 * this.cellSize, y: 0 }];
    // let wall2 = [
    //   { x: 8, y: 8 * this.cellSize },
    //   { x: 9 * this.cellSize, y: 8 * this.cellSize },
    //   { x: 10 * this.cellSize, y: 8 * this.cellSize }
    // ];
    // this.walls.push(wall1);
    // this.walls.push(wall2);
  };

  // Gets all wall pixels 'extracted because of nested loops for some better code'
  getWallPixels = () => {
    let result = [];
    for (let i = 0; i < this.walls.length; i++) {
      const wallPixels = this.walls[i];
      for (let j = 0; j < wallPixels.length; j++) {
        result.push(wallPixels[j]);
      }
    }
    return result;
  };

  // drawing walls
  drawWalls = () => {
    let wallsPixels = this.getWallPixels();
    for (let i = 0; i < wallsPixels.length; i++) {
      this.drawSquare(wallsPixels[i].x, wallsPixels[i].y, this.wallColor);
    }
  };

  // giving the food object its coordinates
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
  };

  // drawing food on the canvas
  drawFood = () => {
    this.drawSquare(this.food.x, this.food.y, this.foodColor);
  };

  // setting the colors for the canvas. color1 - the background, color2 - the line color
  setBackground = (color1, color2) => {
    this.ctx.fillStyle = color1;
    this.ctx.strokeStyle = color2;

    this.ctx.fillRect(0, 0, this.canvas.height, this.canvas.width);

    for (var x = 0.5; x < this.canvas.width; x += this.cellSize) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
    }
    for (var y = 0.5; y < this.canvas.height; y += this.cellSize) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
    }

    this.ctx.stroke();
  };

  // creating the snake and pushing coordinates to the array
  createSnake = () => {
    this.snake = [];
    for (var i = this.snakeLength; i > 0; i--) {
      var k = i * this.cellSize;
      this.snake.push({ x: k, y: 0 });
    }
  };

  // loops through the snake array and draws each element
  drawSnake = () => {
    for (let i = 0; i < this.snake.length; i++) {
      this.drawSquare(this.snake[i].x, this.snake[i].y, this.snakeColor);
    }
  };

  // keyboard interactions | direction != '...' doesn't let the snake go backwards
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

  // changing the snake's movement
  moveSnake = () => {
    var x = this.snake[0].x; // getting the head coordinates...hhehehe... getting head..
    // anyway... read on...
    var y = this.snake[0].y;

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
    // removes the tail and makes it the new head...very delicate, don't touch this
    var tail = this.snake.pop();
    tail.x = x;
    tail.y = y;
    this.snake.unshift(tail);
  };

  // checks if too coordinates match up
  checkCollision = (x1, y1, x2, y2) => {
    if (x1 === x2 && y1 === y2) {
      return true;
    } else {
      return false;
    }
  };

  restartGame = () => {
    this.setBackground();
    this.createSnake();
    this.drawSnake();
    this.createFood();
    this.drawFood();
    this.directionQueue = "right";
    this.score = 0;
  };

  stopGame = () => {
    clearInterval(this.loop);
  };

  // main game loop
  game = () => {
    let self = this;
    var head = self.snake[0];

    // checking for collision at the end of the screen
    if (
      head.x < 0 ||
      head.x > self.canvas.width - self.cellSize ||
      head.y < 0 ||
      head.y > self.canvas.height - self.cellSize
    ) {
      //self.restartGame();
      this.stopGame();
    }

    // check for collision at wallpixel
    let allWallPixels = self.getWallPixels();
    for (let i = 0; i < allWallPixels.length; i++) {
      const wallPixel = allWallPixels[i];
      if (head.x === wallPixel.x && head.y === wallPixel.y) {
        this.stopGame();
      }
    }

    // checking for colisions with snake's body
    for (let i = 1; i < self.snake.length; i++) {
      if (head.x === self.snake[i].x && head.y === self.snake[i].y) {
        // self.restartGame();
        this.stopGame();
      }
    }

    // checking for collision with food
    if (self.checkCollision(head.x, head.y, self.food.x, self.food.y)) {
      self.snake[self.snake.length] = { x: head.x, y: head.y };
      self.createFood();
      self.drawFood();
      self.score += 10;
    }

    self.canvas.onkeydown = function(evt) {
      evt = evt || window.event;
      self.changeDirection(evt.keyCode);
    };

    self.ctx.beginPath();
    self.setBackground(self.playGroundColor, self.playGroundStroke);
    self.scoreIs.innerHTML = self.score;
    self.drawSnake();
    self.drawFood();
    self.drawWalls();
    self.moveSnake();
  };

  newGame = () => {
    this.direction = "right"; // initial direction
    this.directionQueue = "right";
    this.ctx.beginPath();
    this.createSnake();
    this.createFood();
    this.createWalls();

    if (typeof this.loop !== "undefined") {
      clearInterval(this.loop);
    } else {
      this.loop = setInterval(this.game, this.fps);
    }
  };
}

export default SnakeGame;
