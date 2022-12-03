const cvs = document.getElementById("playArea");
const con = cvs.getContext("2d");

const ballRadius = 3;
const paddleHeight = 5;
const paddleWidth = 45;
const paddleStartHeight = 8;
const brickHeight = 8;
const brickWidth = 25;
let paddleX = (cvs.width - paddleWidth) / 2;


//ball start point
let x = cvs.width / 2;
let y = cvs.height - 30;

//speed of ball
let dx = 2;
let dy = -2;

//draw ball
function drawBall() {
    con.beginPath();
    con.arc(x, y, ballRadius, 0, Math.PI * 2);
    con.fillStyle = "aqua";
    con.fill();
    con.closePath();
}

//draw paddle
function drawPaddle(){
    con.beginPath();
    con.rect(paddleX, cvs.height - paddleStartHeight, paddleWidth, paddleHeight);
    con.fillStyle = "#CFD0D2";
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
    con.fillStyle = "red";
    con.fill();
    con.closePath();
}

function draw() {
    con.clearRect(0, 0, cvs.width, cvs.height);
    if(x + dx > cvs.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }else if(y +dy > cvs.height -ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    drawBall();
    drawPaddle();
    drawBricks()
    x += dx;
    y += dy;
}
setInterval(draw, 10);