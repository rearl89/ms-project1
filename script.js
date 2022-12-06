//create canvas
const cvs = document.getElementById("playArea");
const con = cvs.getContext("2d");

//ball size and position
const ballRadius = 3;
let x = cvs.width / 2;
let y = cvs.height - 30;

//movement and speed of ball
let dx = 2 * (Math.random() * 2 -1);
let dy = -2;

//paddle size and position
const paddleHeight = 5;
const paddleWidth = 45;
const paddleStartHeight = 8;
let paddleXPosition = (cvs.width - paddleWidth) / 2;

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
    con.rect(paddleXPosition, cvs.height - paddleStartHeight, paddleWidth, paddleHeight);
    con.fillStyle = '#CFD0D2';
    con.fill();
    con.closePath();
}

//draw bricks
const redBrick = {
    row: 1,
    column: 8,
    width: brickWidth,
    height: brickHeight,
    offSetLeft: 20,
    offSetTop: 20,
    fillColor: 'red'
}

let bricks = [redBrick];

//the draw call
function draw() {
    con.clearRect(0, 0, cvs.width, cvs.height); //clears ball trail
    drawBall();
    x += dx;
    y += dy;
    if(x + dx > cvs.width - ballRadius || x + dx < ballRadius) { //ball bounce off walls
        dx = -dx;
    }else if(y + dy < ballRadius) {
        dy = -dy;
    }else if(y + dy > (cvs.height - ballRadius) - paddleHeight) { //ball bounce off paddle
        if(x > paddleXPosition && x < paddleXPosition + paddleWidth) {
            dy = -dy;
        }else{
        //document.location.reload(); //reset game if ball misses paddle
        clearInterval(interval);
        }
    }

    drawPaddle();
    if(rightPressed) {
        paddleXPosition = Math.min(paddleXPosition + 4, cvs.width - paddleWidth);
    }else if (leftPressed) {
        paddleXPosition = Math.max(paddleXPosition - 4, 0);
    }
   

}
const interval = setInterval(draw, 10);