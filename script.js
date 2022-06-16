/* eslint-disable camelcase */
'use strict';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const BALLZ = [];

let LEFT, UP, RIGHT, DOWN;
const friction = 0.1;

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtr(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  mult(n) {
    return new Vector(this.x * n, this.y * n);
  }

  drawVec(start_x, start_y, n, color) {
    ctx.beginPath();
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.accelereation = 1;
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

  display() {
    this.vel.drawVec(this.x, this.y, 10, 'green');
    this.acc.drawVec(this.x, this.y, 100, 'blue');
  }
}

function keyControl(b) {
  canvas.addEventListener('keydown', (e) => {
    if (e.code === 'KeyA') {
      LEFT = true;
    }
    if (e.code === 'KeyW') {
      UP = true;
    }
    if (e.code === 'KeyD') {
      RIGHT = true;
    }
    if (e.code === 'KeyS') {
      DOWN = true;
    }
  });

  canvas.addEventListener('keyup', (e) => {
    if (e.code === 'KeyA') {
      LEFT = false;
    }
    if (e.code === 'KeyW') {
      UP = false;
    }
    if (e.code === 'KeyD') {
      RIGHT = false;
    }
    if (e.code === 'KeyS') {
      DOWN = false;
    }
  });


  if (LEFT) {
    b.acc.x = -b.accelereation;
  }
  if (UP) {
    b.acc.y = -b.accelereation;
  }
  if (RIGHT) {
    b.acc.x = b.accelereation;
  }
  if (DOWN) {
    b.acc.y = b.accelereation;
  }
  if (!UP && !DOWN) b.acc.y = 0;
  if (!RIGHT && !LEFT) b.acc.x = 0;

  b.vel = b.vel.add(b.acc);
  b.vel = b.vel.mult(1 - friction);
  b.x += b.vel.x;
  b.y += b.vel.y;

}


const Ball1 = new Ball(200, 200, 30);

Ball1.player = true;

function mainLoop() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  BALLZ.forEach((b) => {
    b.drawBall();
    if (b.player) {
      keyControl(b);
    }
    b.display();
  });
  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
