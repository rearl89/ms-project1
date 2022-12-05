const cvs = document.getElementById("playArea");
const con = cvs.getContext("2d");

//ball size
const ballRadius = 3;
//paddle size and position
const paddleHeight = 5;
const paddleWidth = 45;
const paddleStartHeight = 8;
let paddleX = (cvs.width - paddleWidth) / 2;
//bricks size
const brickHeight = 8;
const brickWidth = 25;
//controls
let rightPressed = false;
let leftPressed = false;
document.addEventListener('keydown', pressKey, false);
document.addEventListener('keyup', releaseKey, false);

function pressKey(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    }else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}
function releaseKey(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    }else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

//ball start point
let x = cvs.width / 2;
let y = cvs.height - 30;

//movement and speed of ball
let dx = 2 * (Math.random() * 2 -1);
let dy = -2;

//draw ball
function drawBall() {
    con.beginPath();
    con.arc(x, y, ballRadius, 0, Math.PI * 2);
    con.fillStyle = 'aqua';
    con.fill();
    con.closePath();
}

//draw paddle
function drawPaddle(){
    con.beginPath();
    con.rect(paddleX, cvs.height - paddleStartHeight, paddleWidth, paddleHeight);
    con.fillStyle = '#CFD0D2';
    con.fill();
    con.closePath();
}

//draw bricks
function drawBricks() {
    con.beginPath();
    con.rect(14, 3, brickWidth, brickHeight);
    con.rect(49, 3, brickWidth, brickHeight);
    con.rect(84, 3, brickWidth, brickHeight);
    con.rect(119, 3, brickWidth, brickHeight);
    con.rect(154, 3, brickWidth, brickHeight);
    con.rect(189, 3, brickWidth, brickHeight);
    con.rect(224, 3, brickWidth, brickHeight);
    con.rect(259, 3, brickWidth, brickHeight);
    con.rect(32, 15, brickWidth, brickHeight);
    con.rect(67, 15, brickWidth, brickHeight);
    con.rect(102, 15, brickWidth, brickHeight);
    con.rect(137, 15, brickWidth, brickHeight);
    con.rect(172, 15, brickWidth, brickHeight);
    con.rect(207, 15, brickWidth, brickHeight);
    con.rect(242, 15, brickWidth, brickHeight);
    con.rect(14, 27, brickWidth, brickHeight);
    con.rect(49, 27, brickWidth, brickHeight);
    con.rect(84, 27, brickWidth, brickHeight);
    con.rect(119, 27, brickWidth, brickHeight);
    con.rect(154, 27, brickWidth, brickHeight);
    con.rect(189, 27, brickWidth, brickHeight);
    con.rect(224, 27, brickWidth, brickHeight);
    con.rect(259, 27, brickWidth, brickHeight);
    con.fillStyle = 'red';
    con.fill();
    con.closePath();
}

//the draw call
function draw() {
    con.clearRect(0, 0, cvs.width, cvs.height); //clears ball trail
    drawBall();
    if(x + dx > cvs.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }else if(y + dy < ballRadius) {
        dy = -dy;
    }else if(y + dy > cvs.height - ballRadius - paddleHeight) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }else{
        document.location.reload();
        clearInterval(interval);
        }
    }

    drawPaddle();
    if(rightPressed) {
        paddleX = Math.min(paddleX + 4, cvs.width - paddleWidth);
    }else if (leftPressed) {
        paddleX = Math.max(paddleX - 4, 0);
    }
    drawBricks()
    x += dx;
    y += dy;
}
const interval = setInterval(draw, 10);