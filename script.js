const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Game settings
const PADDLE_WIDTH = 14;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 16;
const PLAYER_X = 20;
const AI_X = canvas.width - PLAYER_X - PADDLE_WIDTH;

// Game objects
let player = {
    x: PLAYER_X,
    y: canvas.height/2 - PADDLE_HEIGHT/2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: '#fff'
};

let ai = {
    x: AI_X,
    y: canvas.height/2 - PADDLE_HEIGHT/2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: '#fff'
};

let ball = {
    x: canvas.width/2 - BALL_SIZE/2,
    y: canvas.height/2 - BALL_SIZE/2,
    size: BALL_SIZE,
    speed: 6,
    velocityX: 6 * (Math.random() > 0.5 ? 1 : -1),
    velocityY: (Math.random() - 0.5) * 8,
    color: '#0f0'
};

let scores = {
    player: 0,
    ai: 0
};

// Draw functions
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + size/2, y + size/2, size/2, 0, 2 * Math.PI, false);
    ctx.fill();
}

function drawNet() {
    ctx.strokeStyle = "#fff3";
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawScores() {
    ctx.font = "40px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(scores.player, canvas.width/2 - 60, 60);
    ctx.fillText(scores.ai, canvas.width/2 + 35, 60);
}

// Game logic
function resetBall() {
    ball.x = canvas.width/2 - BALL_SIZE/2;
    ball.y = canvas.height/2 - BALL_SIZE/2;
    ball.velocityX = ball.speed * (Math.random() > 0.5 ? 1 : -1);
    ball.velocityY = (Math.random() - 0.5) * 8;
}

function collisionDetect(paddle, ball) {
    return (
        ball.x < paddle.x + paddle.width &&
        ball.x + ball.size > paddle.x &&
        ball.y < paddle.y + paddle.height &&
        ball.y + ball.size > paddle.y
    );
}

// Player paddle follows mouse
canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    let mouseY = e.clientY - rect.top;
    player.y = mouseY - player.height/2;

    // Clamp paddle within canvas
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
});

// AI paddle follows ball with basic prediction
function moveAI() {
    let target = ball.y - (ai.height - ball.size) / 2;
    if (ai.y < target) {
        ai.y += Math.min(5, target - ai.y);
    } else if (ai.y > target) {
        ai.y -= Math.min(5, ai.y - target);
    }
    // Clamp
    if (ai.y < 0) ai.y = 0;
    if (ai.y + ai.height > canvas.height) ai.y = canvas.height - ai.height;
}

function update() {
    // Move Ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Top/bottom wall collision
    if (ball.y < 0) {
        ball.y = 0;
        ball.velocityY *= -1;
    }
    if (ball.y + ball.size > canvas.height) {
        ball.y = canvas.height - ball.size;
        ball.velocityY *= -1;
    }

    // Paddle collision
    if (collisionDetect(player, ball)) {
        ball.x = player.x + player.width;
        let collidePoint = (ball.y + ball.size/2) - (player.y + player.height/2);
        collidePoint = collidePoint / (player.height/2);
        let angleRad = collidePoint * Math.PI/4;
        let direction = 1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
    }
    if (collisionDetect(ai, ball)) {
        ball.x = ai.x - ball.size;
        let collidePoint = (ball.y + ball.size/2) - (ai.y + ai.height/2);
        collidePoint = collidePoint / (ai.height/2);
        let angleRad = collidePoint * Math.PI/4;
        let direction = -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
    }

    // Score check
    if (ball.x < 0) {
        scores.ai++;
        resetBall();
    }
    if (ball.x + ball.size > canvas.width) {
        scores.player++;
        resetBall();
    }

    moveAI();
}

function render() {
    // Clear
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawNet();
    drawScores();
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
    drawBall(ball.x, ball.y, ball.size, ball.color);
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();