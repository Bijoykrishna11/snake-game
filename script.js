// Game variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 20;
let snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
];
let food = { x: 15, y: 10 };
let dx = 1;
let dy = 0;
let score = 0;
let gameInterval;

// Function to start the game
function startGame() {
    clearInterval(gameInterval);
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    food = { x: 15, y: 10 };
    dx = 1;
    dy = 0;
    score = 0;
    gameInterval = setInterval(gameLoop, 100);
}

// Function to update the game state
function gameLoop() {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
}

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to move the snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
}

// Function to draw the snake
function drawSnake() {
    snake.forEach((segment) => {
        ctx.fillStyle = "#333";
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

// Function to generate food at a random location
function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
}

// Function to draw the food
function drawFood() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Function to check for collision with walls or self
function checkCollision() {
    const head = snake[0];
    if (
        head.x < 0 || head.x >= canvas.width / gridSize ||
        head.y < 0 || head.y >= canvas.height / gridSize ||
        isSnakeCollision()
    ) {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
    }
}

// Function to check if the snake collides with itself
function isSnakeCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

// Event listener for keyboard input
document.addEventListener("keydown", changeDirection);

// Function to change the snake's direction
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingLeft = dx === -1;
    const goingRight = dx === 1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

// lllllllllllllll

