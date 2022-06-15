'use strict';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let x  = 100;
let y = 100;

let LEFT, UP, RIGHT, DOWN;

function drawBall(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.fillStyle = 'red';
  ctx.fill();
}

canvas.addEventListener('keydown', (e) => {
  console.log(e.key);
  if (e.key === 'a') {
    LEFT = true;
  }
  if (e.key === 'w') {
    UP = true;
  }
  if (e.key === 'd') {
    RIGHT = true;
  }
  if (e.key === 's') {
    DOWN = true;
  }
});

canvas.addEventListener('keyup', (e) => {
  if (e.key === 'a') {
    LEFT = false;
  }
  if (e.key === 'w') {
    UP = false;
  }
  if (e.key === 'd') {
    RIGHT = false;
  }
  if (e.key === 's') {
    DOWN = false;
  }
});


function move() {
  if (LEFT) {
    x--;
  }
  if (UP) {
    y--;
  }
  if (RIGHT) {
    x++;
  }
  if (DOWN) {
    y++;
  }
}

function mainLoop() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  move();
  drawBall(x, y, 30);
  requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);
