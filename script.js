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

  unit() {
    if (this.mag() === 0) {
      return new Vector(0, 0);
    } else {
      return new Vector(this.x / this.mag(), this.y / this.mag());
    }
  }

  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  normal() {
    return new Vector(-this.y, this.x).unit();
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
    this.pos = new Vector(x, y);
    this.r = r;
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.accelereation = 1;
    this.player = false;
    BALLZ.push(this);
  }
  drawBall() {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.font = '30px Arial';
    ctx.fillText(`N: ${BALLZ.indexOf(this) + 1}`, this.pos.x, this.pos.y);
  }

  display() {
    this.vel.drawVec(550, 400, 10, 'green');
    this.acc.unit().drawVec(550, 400, 50, 'blue');
    this.acc.normal().drawVec(550, 400, 50, 'black');
    ctx.beginPath();
    ctx.arc(550, 400, 50, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }
}

function keyControl(b) {
  canvas.addEventListener('keydown', (e) => {
    const index = e.code.slice(-1) - 1;
    if (!isNaN(index)) {
      BALLZ.forEach((b) => {
        b.player = false;
      });
      BALLZ[index].player = true;
    }
  });

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

  b.acc = b.acc.unit().mult(b.accelereation);
  b.vel = b.vel.add(b.acc);
  b.vel = b.vel.mult(1 - friction);
  b.pos = b.pos.add(b.vel);

  if (b.pos.x < 0) b.pos.x = ctx.canvas.clientWidth - 10;
  if (b.pos.x >= ctx.canvas.clientWidth) b.pos.x = 0;
  if (b.pos.y <= 0) b.pos.y = ctx.canvas.clientHeight - 10;
  if (b.pos.y >= ctx.canvas.clientHeight) b.pos.y = 0;
}

const Ball1 = new Ball(200, 200, 30);
const Ball2 = new Ball(300, 250, 40);
const Ball3 = new Ball(250, 220, 35);

Ball1.player = true;

function round(number, precision) {
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
}

function coll_det_bb(b1, b2) {
  if (b1.r + b2.r >= b2.pos.subtr(b1.pos).mag()) {
    return true;
  } else {
    return false;
  }
}

function pen_res_bb(b1, b2) {
  const dist = b1.pos.subtr(b2.pos);
  const pen_depth = b1.r + b2.r - dist.mag();
  const pen_res = dist.unit().mult(pen_depth / 2);
  b1.pos = b1.pos.add(pen_res);
  b2.pos = b2.pos.add(pen_res.mult(-1));
}

function mainLoop() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  BALLZ.forEach((b, index) => {
    b.drawBall();
    if (b.player) {
      keyControl(b);
    }
    for (let i = index + 1; i < BALLZ.length; i++) {
      if (coll_det_bb(BALLZ[index], BALLZ[i])) {
        pen_res_bb(BALLZ[index], BALLZ[i]);
      }
    }
    b.display();
  });

  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
