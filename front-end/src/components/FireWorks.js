/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-bitwise */
/* eslint-disable no-multi-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable react/style-prop-object */
import React from 'react';
import './FireWorks.css';

const FireWorks = () => {
  window.addEventListener('resize', resizeCanvas, false);
  window.addEventListener('DOMContentLoaded', onLoad, false);

  window.requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  let canvas; let ctx; let w; let h; let particles = [];
  const probability = 0.04;
  let xPoint; let
    yPoint;

  function onLoad() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();

    window.requestAnimationFrame(updateWorld);
  }

  function resizeCanvas() {
    if (canvas) {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
  }

  function updateWorld() {
    update();
    paint();
    window.requestAnimationFrame(updateWorld);
  }

  function update() {
    if (particles.length < 500 && Math.random() < probability) {
      createFirework();
    }
    const alive = [];
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].move()) {
        alive.push(particles[i]);
      }
    }
    particles = alive;
  }

  function paint() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < particles.length; i++) {
      particles[i].draw(ctx);
    }
  }

  function createFirework() {
    xPoint = Math.random() * (w - 200) + 100;
    yPoint = Math.random() * (h - 200) + 100;
    const nFire = Math.random() * 50 + 100;
    const c = `rgb(${~~(Math.random() * 200 + 55)},${
      ~~(Math.random() * 200 + 55)},${~~(Math.random() * 200 + 55)})`;
    for (let i = 0; i < nFire; i++) {
      const particle = new Particle();
      particle.color = c;
      const vy = Math.sqrt(25 - particle.vx * particle.vx);
      if (Math.abs(particle.vy) > vy) {
        particle.vy = particle.vy > 0 ? vy : -vy;
      }
      particles.push(particle);
    }
  }

  function Particle() {
    this.w = this.h = Math.random() * 4 + 1;

    this.x = xPoint - this.w / 2;
    this.y = yPoint - this.h / 2;

    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10;

    this.alpha = Math.random() * 0.5 + 0.5;

    this.color;
  }

  Particle.prototype = {
    gravity: 0.05,
    move() {
      this.x += this.vx;
      this.vy += this.gravity;
      this.y += this.vy;
      this.alpha -= 0.01;
      if (this.x <= -this.w || this.x >= screen.width
        || this.y >= screen.height
        || this.alpha <= 0) {
        return false;
      }
      return true;
    },
    draw(c) {
      c.save();
      c.beginPath();

      c.translate(this.x + this.w / 2, this.y + this.h / 2);
      c.arc(0, 0, this.w, 0, Math.PI * 2);
      c.fillStyle = this.color;
      c.globalAlpha = this.alpha;

      c.closePath();
      c.fill();
      c.restore();
    }
  };
  return (
    <div>
      <canvas id="canvas"> </canvas>
    </div>
  );
};

export default FireWorks;
