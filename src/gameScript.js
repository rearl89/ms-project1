//create canvas
var cvs = document.getElementById("playArea");
var con = cvs.getContext("2d");
var livesDisplay = document.querySelector('#lives');
var lives = 3;
var scoreDisplay = document.querySelector('#score');
var score = 0;
//sound
var LOSE = new Audio();
LOSE.src = "sounds/lose.wav";
var WIN = new Audio();
WIN.src = "sounds/win.wav";
var BRICK_BREAK = new Audio();
BRICK_BREAK.src = "sounds/brick_break.wav";
//ball size and position
var ballRadius = 3;
var x = cvs.width / 2;
var y = cvs.height - 20;
//randomly chooses the direction of ball
function randomNum() {
    var num = Math.random();
    if (num < 0.25) {
        return -2;
    }
    else if (num > 0.24 && num < 0.5) {
        return -1;
    }
    else if (num > 0.49 && num < 0.75) {
        return 1;
    }
    else {
        return 2;
    }
}
//movement and speed of ball
var dx = randomNum();
var dy = -2;
function moveBall() {
    x += dx;
    y += dy;
}
//paddle size and position
var paddleHeight = 5;
var paddleWidth = 45;
var paddleStartHeight = 8;
var paddleXPosition = (cvs.width - paddleWidth) / 2;
//bricks size and position
var brickHeight = 8;
var brickWidth = 25;
var brickCols = 10;
var brickRows = 5;
var brickPadding = 5;
var brickOffsetTop = 2;
var brickOffsetLeft = 2.5;
var bricks = [];
for (var c = 0; c < brickCols; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRows; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
//controls
var rightPressed = false;
var leftPressed = false;
document.addEventListener('keydown', pressKey, false);
document.addEventListener('keyup', releaseKey, false);
function pressKey(e) {
    if (e.key === 'ArrowRight') {
        rightPressed = true;
    }
    else if (e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}
function releaseKey(e) {
    if (e.key === 'ArrowRight') {
        rightPressed = false;
    }
    else if (e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}
//move paddle
function movePaddle() {
    if (rightPressed) {
        paddleXPosition = Math.min(paddleXPosition + 4, cvs.width - paddleWidth);
    }
    else if (leftPressed) {
        paddleXPosition = Math.max(paddleXPosition - 4, 0);
    }
}
//restart game
document.addEventListener('keydown', reloadGame);
function reloadGame(e) {
    if (e.key === " ") {
        document.location.reload();
    }
}
//collision with bricks
function brickCollision() {
    for (var c = 0; c < brickCols; c++) {
        for (var r = 0; r < brickRows; r++) {
            var b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    BRICK_BREAK.play();
                    dy = -dy;
                    score += 10;
                    scoreDisplay.innerHTML = score.toString();
                    b.status = 0;
                    if (score == (brickRows * brickCols) * 10) {
                        endScreen();
                        winText();
                        restartText();
                        WIN.play();
                        clearInterval(interval);
                        reloadGame();
                    }
                }
            }
        }
    }
}
//win and lose displays
function endScreen() {
    con.beginPath();
    con.rect(0, 0, cvs.width, cvs.height);
    con.fillStyle = 'black';
    con.fill();
    con.closePath();
}
function winText() {
    con.font = '16px Zen Dots';
    con.fillStyle = '#FFF';
    con.fillText('You win! 😄 Score: ' + score, (cvs.width / 2) - 105, (cvs.height / 2) + 8);
}
function loseText() {
    con.font = '16px Zen Dots';
    con.fillStyle = '#FFF';
    con.fillText("You lose! ☹️ Score: " + score, (cvs.width / 2) - 110, (cvs.height / 2) + 8);
}
function restartText() {
    con.font = '8px Zen Dots';
    con.fillStyle = '#FFF';
    con.fillText('Press spacebar to restart', (cvs.width / 2) - 65, (cvs.height / 2) + 20);
}
//collision with walls and paddle and lose screen
function collision() {
    if (x + dx > cvs.width - ballRadius || x + dx < ballRadius) { //ball bounce off walls
        dx = -dx;
    }
    else if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > (cvs.height - ballRadius) - paddleHeight) { //ball bounce off paddle
        if (x > paddleXPosition && x < paddleXPosition + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            livesDisplay.innerHTML = lives.toString();
            if (!lives) {
                endScreen();
                loseText();
                restartText();
                LOSE.play();
                clearInterval(interval);
                reloadGame();
            }
            else {
                x = cvs.width / 2;
                y = cvs.height - 20;
                dx = randomNum();
                dy = -2;
                paddleXPosition = (cvs.width - paddleWidth) / 2;
            }
        }
    }
}
//draw ball
function drawBall() {
    con.beginPath();
    con.arc(x, y, ballRadius, 0, Math.PI * 2);
    con.fillStyle = 'aqua';
    con.fill();
    con.closePath();
}
//draw paddle
function drawPaddle() {
    con.beginPath();
    con.rect(paddleXPosition, cvs.height - paddleStartHeight, paddleWidth, paddleHeight);
    con.fillStyle = '#CFD0D2';
    con.fill();
    con.closePath();
}
//draw bricks
function drawBricks() {
    for (var c = 0; c < brickCols; c++) {
        for (var r = 0; r < brickRows; r++) {
            if (bricks[c][r].status === 1) {
                var brickXPosition = c * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickYPosition = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickXPosition;
                bricks[c][r].y = brickYPosition;
                con.beginPath();
                con.rect(brickXPosition, brickYPosition, brickWidth, brickHeight);
                con.fillStyle = 'red';
                con.fill();
                con.closePath();
            }
        }
    }
}
//the draw call
function draw() {
    con.clearRect(0, 0, cvs.width, cvs.height); //clears ball trail
    drawBricks();
    drawBall();
    moveBall();
    brickCollision();
    collision();
    drawPaddle();
    movePaddle();
}
var interval = setInterval(draw, 10);
