'use strict';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const BALLZ = [];

let LEFT, UP, RIGHT, DOWN;


class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.player = false;
    BALLZ.push(this);
  }
  drawBall() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'red';
    ctx.fill();
  }
}

function keyControl(b) {
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


  if (LEFT) {
    b.x--;
  }
  if (UP) {
    b.y--;
  }
  if (RIGHT) {
    b.x++;
  }
  if (DOWN) {
    b.y++;
  }

}


const Ball1 = new Ball(200, 200, 30);
const Ball2 = new Ball(300, 300, 20);

Ball1.player = true;
Ball2.player = true;

function mainLoop() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  BALLZ.forEach((b) => {
    if (b.player) {
      keyControl(b);
    }
    b.drawBall();
  });
  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
