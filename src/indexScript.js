var cvs = document.getElementById("playArea");
var con = cvs.getContext("2d");
var INTRO = new Audio();
INTRO.src = "sounds/intro.wav";
var ballRadius = 3;
var x = cvs.width / 2;
var y = cvs.height - 20;
var dx = 1;
var dy = -1;
function moveBall() {
    x += dx;
    y += dy;
}
var paddleHeight = 5;
var paddleWidth = 45;
var paddleStartHeight = 8;
var paddleXPosition = (cvs.width - paddleWidth) / 2;
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
function brickCollision() {
    for (var c = 0; c < brickCols; c++) {
        for (var r = 0; r < brickRows; r++) {
            var b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}
function collision() {
    if (x + dx > cvs.width - ballRadius || x + dx < ballRadius) {
        // Ball bounce off walls
        dx = -dx;
    }
    else if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > cvs.height - ballRadius - paddleHeight) {
        // Ball bounce off paddle
        dy = -dy;
    }
}
// Computer plays
function paddleFollow() {
    paddleXPosition = x - 22;
}
function drawBall() {
    con.beginPath();
    con.arc(x, y, ballRadius, 0, Math.PI * 2);
    con.fillStyle = 'aqua';
    con.fill();
    con.closePath();
}
function drawPaddle() {
    con.beginPath();
    con.rect(paddleXPosition, cvs.height - paddleStartHeight, paddleWidth, paddleHeight);
    con.fillStyle = '#CFD0D2';
    con.fill();
    con.closePath();
}
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
function draw() {
    con.clearRect(0, 0, cvs.width, cvs.height);
    drawBricks();
    drawBall();
    moveBall();
    brickCollision();
    collision();
    drawPaddle();
    paddleFollow();
    INTRO.play();
}
var interval = setInterval(draw, 10);
