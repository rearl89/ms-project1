//create canvas
const cvs = document.getElementById("playArea");
const con = cvs.getContext("2d");

//ball size and position
const ballRadius = 3;
let x = cvs.width / 2;
let y = cvs.height - 20;



//movement and speed of ball
let dx = 1;
let dy = -1;

//paddle size and position
const paddleHeight = 5;
const paddleWidth = 45;
const paddleStartHeight = 8;
let paddleXPosition = (cvs.width - paddleWidth) / 2;

//bricks size and position
const brickHeight = 8;
const brickWidth = 25;
const brickCols = 10;
const brickRows = 5;
const brickPadding = 5;
const brickOffsetTop = 2;
const brickOffsetLeft = 2.5;
const bricks = [];
for(let c = 0; c < brickCols; c++) {
    bricks[c] = [];
    for(let r = 0; r < brickRows; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

//collision with bricks
function brickCollision() {
    for(let c = 0; c < brickCols; c++) {
        for(let r = 0; r < brickRows; r++){
            const b = bricks[c][r];
            if (b.status === 1){
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

//collision with walls and paddle and lose screen
function collision() {
    if(x + dx > cvs.width - ballRadius || x + dx < ballRadius) { //ball bounce off walls
        dx = -dx;
    }else if(y + dy < ballRadius) {
        dy = -dy;
    }else if(y + dy > (cvs.height - ballRadius) - paddleHeight) { //ball bounce off paddle
            dy = -dy;
    }
}

function paddleFollow() {
    paddleXPosition = x - 22;
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
    for(let c = 0; c < brickCols; c++) {
        for(let r = 0; r < brickRows; r++) {
            if(bricks[c][r].status === 1) {
                const brickXPosition = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickYPosition = r * (brickHeight + brickPadding) + brickOffsetTop;
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
    brickCollision();
    collision();
    drawPaddle();
    paddleFollow();
    x += dx;
    y += dy;

}
const interval = setInterval(draw, 10);