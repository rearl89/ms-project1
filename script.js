const canvas = document.getElementById("playArea");
const con = canvas.getContext("2d");


con.beginPath();
con.arc(150, 100, 3, 0, Math.PI * 2, false);
con.fillStyle = 'blue';
con.fill();
con.closePath;