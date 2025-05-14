
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let velocityX = 0;
let velocityY = 0;
let food = { x: 15, y: 15 };
let tailLength = 1;
let score = 0;

const scoreDisplay = document.getElementById('score');

function gameLoop() {
    update();
    draw();
}

function update() {
    // Move snake
    const head = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };

    // Wrap snake position on edge
    if (head.x < 0) head.x = tileCount - 1;
    if (head.x >= tileCount) head.x = 0;
    if (head.y < 0) head.y = tileCount - 1;
    if (head.y >= tileCount) head.y = 0;

    // Check collision with tail
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            resetGame();
            return;
        }
    }

    snake.unshift(head);

    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
        tailLength++;
        score++;
        placeFood();
    }

    while (snake.length > tailLength) {
        snake.pop();
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake in green color
    ctx.fillStyle = 'lime';
    for (let segment of snake) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    }

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    // Update score display
    scoreDisplay.textContent = 'Pontuação: ' + score;
}

function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);

    // Make sure food is not on the snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            placeFood();
            break;
        }
    }
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    velocityX = 0;
    velocityY = 0;
    tailLength = 1;
    score = 0;
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (velocityY === 1) break;
            velocityX = 0;
            velocityY = -1;
            break;
        case 'ArrowDown':
            if (velocityY === -1) break;
            velocityX = 0;
            velocityY = 1;
            break;
        case 'ArrowLeft':
            if (velocityX === 1) break;
            velocityX = -1;
            velocityY = 0;
            break;
        case 'ArrowRight':
            if (velocityX === -1) break;
            velocityX = 1;
            velocityY = 0;
            break;
    }
    
});

const btnReiniciar = document.getElementById("button-reiniciar");
    btnReiniciar.addEventListener("click", () => (
    resetGame()
    ));

setInterval(gameLoop, 100);
