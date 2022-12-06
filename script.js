//create canvas
const cvs = document.getElementById("playArea");
const con = cvs.getContext("2d");

//ball size
const ballRadius = 3;

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
    con.rect(paddleXPosition, cvs.height - paddleStartHeight, paddleWidth, paddleHeight);
    con.fillStyle = '#CFD0D2';
    con.fill();
    con.closePath();
}



//draw bricks
function drawBricks() {
    con.beginPath();
    con.rect(14, 3, brickWidth, brickHeight);
    con.fillStyle = 'red';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(49, 3, brickWidth, brickHeight);
    con.fillStyle = 'red';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(84, 3, brickWidth, brickHeight);
    con.fillStyle = 'red';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(119, 3, brickWidth, brickHeight);
    con.fillStyle = 'red';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(154, 3, brickWidth, brickHeight);
    con.fillStyle = 'red';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(189, 3, brickWidth, brickHeight);
    con.fillStyle = 'red';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(224, 3, brickWidth, brickHeight);
    con.fillStyle = 'red';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(259, 3, brickWidth, brickHeight);
    con.fillStyle = 'red';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(32, 15, brickWidth, brickHeight);
    con.fillStyle = 'yellow';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(67, 15, brickWidth, brickHeight);
    con.fillStyle = 'yellow';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(102, 15, brickWidth, brickHeight);
    con.fillStyle = 'yellow';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(137, 15, brickWidth, brickHeight);
    con.fillStyle = 'yellow';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(172, 15, brickWidth, brickHeight);
    con.fillStyle = 'yellow';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(207, 15, brickWidth, brickHeight);
    con.fillStyle = 'yellow';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(242, 15, brickWidth, brickHeight);
    con.fillStyle = 'yellow';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(14, 27, brickWidth, brickHeight);
    con.fillStyle = '#FF00FF';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(49, 27, brickWidth, brickHeight);
    con.fillStyle = '#FF00FF';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(84, 27, brickWidth, brickHeight);
    con.fillStyle = '#FF00FF';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(119, 27, brickWidth, brickHeight);
    con.fillStyle = '#FF00FF';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(154, 27, brickWidth, brickHeight);
    con.fillStyle = '#FF00FF';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(189, 27, brickWidth, brickHeight);
    con.fillStyle = '#FF00FF';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(224, 27, brickWidth, brickHeight);
    con.fillStyle = '#FF00FF';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(259, 27, brickWidth, brickHeight);
    con.fillStyle = '#FF00FF';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(32, 39, brickWidth, brickHeight);
    con.fillStyle = '#16FC10';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(67, 39, brickWidth, brickHeight);
    con.fillStyle = '#16FC10';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(102, 39, brickWidth, brickHeight);
    con.fillStyle = '#16FC10';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(137, 39, brickWidth, brickHeight);
    con.fillStyle = '#16FC10';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(172, 39, brickWidth, brickHeight);
    con.fillStyle = '#16FC10';
    con.fill();
    con.closePath();
    con.beginPath();
    con.rect(207, 39, brickWidth, brickHeight);
    con.fillStyle = '#16FC10';
    con.fill();
    con.closePath();
    con.rect(242, 39, brickWidth, brickHeight);
    con.fillStyle = '#16FC10';
    con.fill();
    con.closePath();
}

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
   drawBricks();

}
const interval = setInterval(draw, 10);