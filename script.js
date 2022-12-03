const canvas = document.getElementById("playArea");
const con = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

function drawBall() {
    con.beginPath();
    con.arc(x, y, 3, 0, Math.PI * 2);
    con.fillStyle = 'aqua';
    con.fill();
    con.closePath();
}

function draw() {
    con.clearRect(0, 0, canvas.width, canvas.height);
    drawBall()
    x += dx;
    y += dy;
}
setInterval(draw, 10);