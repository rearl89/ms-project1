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
const brickGap = 2;
const brickColor = 'red';
let brickCols = 12;
let brickRows = 8;
let liveBricks = 0;
let bricks = Array(brickCols * brickRows);
for(let i = 0; i < brickCols * brickRows; i++){
    bricks[i] = true;
    liveBricks++;
}

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
function drawBricks(){
    for(let row = 0; row < brickRows; row++){
        for(let col = 0; col < brickCols; col++){
            let index = (col + brickCols * row);
            if(bricks[index] == true){
                drawRect(
                    brickWidth*col+brickGap,
                    brickHeight*row+brickGap,
                    brickWidth-brickGap*2,
                    brickHeight-brickGap*2,
                    brickColor
                );
            }
        }
    }
}

function drawRect(x, y, width, height, color){
    con.fillStyle = color;
    con.fillRect(x, y, width, height);
    con.fill();
}

//the draw call
function draw() {
    con.clearRect(0, 0, cvs.width, cvs.height); //clears ball trail
    drawBricks();
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