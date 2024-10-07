import React, { useEffect, useRef } from 'react';
import './Intro.css';

const Intro = () => {
  const canvasRef = useRef(null);
 
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const hw = w / 2;
    const hh = h / 2;

    const opts = {
      strings: ['HAPPY', 'BIRTHDAY!'],
      charSize: 30,
      charSpacing: 35,
      lineHeight: 40,
      cx: hw,
      cy: hh,
      fireworkPrevPoints: 10,
      fireworkBaseLineWidth: 5,
      fireworkAddedLineWidth: 8,
      fireworkSpawnTime: 200,
      fireworkBaseReachTime: 30,
      fireworkAddedReachTime: 30,
      fireworkCircleBaseSize: 20,
      fireworkCircleAddedSize: 10,
      fireworkCircleBaseTime: 30,
      fireworkCircleAddedTime: 30,
      fireworkCircleFadeBaseTime: 10,
      fireworkCircleFadeAddedTime: 5,
      fireworkBaseShards: 5,
      fireworkAddedShards: 5,
      fireworkShardPrevPoints: 3,
      fireworkShardBaseVel: 4,
      fireworkShardAddedVel: 2,
      fireworkShardBaseSize: 3,
      fireworkShardAddedSize: 3,
      gravity: 0.1,
      upFlow: -0.1,
      letterContemplatingWaitTime: 360,
      balloonSpawnTime: 20,
      balloonBaseInflateTime: 10,
      balloonAddedInflateTime: 10,
      balloonBaseSize: 20,
      balloonAddedSize: 20,
      balloonBaseVel: 0.4,
      balloonAddedVel: 0.4,
      balloonBaseRadian: -(Math.PI / 2 - 0.5),
      balloonAddedRadian: -1,
    };

    const Tau = Math.PI * 2;
    let letters = [];

    ctx.font = `${opts.charSize}px Verdana`;

    function Letter(char, x, y) {
      this.char = char;
      this.x = x;
      this.y = y;

      this.dx = -ctx.measureText(char).width / 2;
      this.dy = opts.charSize / 2;
      this.fireworkDy = this.y - hh;
      const hue = (x / w) * 360;
      this.color = `hsl(${hue}, 80%, 50%)`;
      this.lightAlphaColor = `hsla(${hue}, 80%, 70%, alp)`;
      this.alphaColor = `hsla(${hue}, 80%, 50%, alp)`;
      this.reset();
    }

    Letter.prototype.reset = function () {
      this.phase = 'firework';
      this.tick = 0;
      this.spawned = false;
      this.spawningTime = opts.fireworkSpawnTime * Math.random() | 0;
      this.reachTime = opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random() | 0;
      this.lineWidth = opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
      this.prevPoints = [[0, hh, 0]];
    };

    Letter.prototype.step = function () {
      if (this.phase === 'firework') {
        if (!this.spawned) {
          ++this.tick;
          if (this.tick >= this.spawningTime) {
            this.tick = 0;
            this.spawned = true;
          }
        } else {
          ++this.tick;
          const linearProportion = this.tick / this.reachTime;
          const armonicProportion = Math.sin(linearProportion * (Math.PI / 2));
          const x = linearProportion * this.x;
          const y = hh + armonicProportion * this.fireworkDy;

          if (this.prevPoints.length > opts.fireworkPrevPoints) {
            this.prevPoints.shift();
          }
          this.prevPoints.push([x, y, linearProportion * this.lineWidth]);

          const lineWidthProportion = 1 / (this.prevPoints.length - 1);

          for (let i = 1; i < this.prevPoints.length; ++i) {
            const point = this.prevPoints[i];
            const point2 = this.prevPoints[i - 1];

            ctx.strokeStyle = this.alphaColor.replace('alp', i / this.prevPoints.length);
            ctx.lineWidth = point[2] * lineWidthProportion * i;
            ctx.beginPath();
            ctx.moveTo(point[0], point[1]);
            ctx.lineTo(point2[0], point2[1]);
            ctx.stroke();
          }

          if (this.tick >= this.reachTime) {
            this.phase = 'contemplate';
            this.circleFinalSize = opts.fireworkCircleBaseSize + opts.fireworkCircleAddedSize * Math.random();
            this.circleCompleteTime = opts.fireworkCircleBaseTime + opts.fireworkCircleAddedTime * Math.random() | 0;
            this.circleCreating = true;
            this.circleFading = false;
            this.circleFadeTime = opts.fireworkCircleFadeBaseTime + opts.fireworkCircleFadeAddedTime * Math.random() | 0;
            this.tick = 0;
            this.tick2 = 0;
            this.shards = [];

            const shardCount = opts.fireworkBaseShards + opts.fireworkAddedShards * Math.random() | 0;
            const angle = Tau / shardCount;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            let x = 1;
            let y = 0;

            for (let i = 0; i < shardCount; ++i) {
              const x1 = x;
              x = x * cos - y * sin;
              y = y * cos + x1 * sin;
              this.shards.push(new Shard(this.x, this.y, x, y, this.alphaColor));
            }
          }
        }
      } else if (this.phase === 'contemplate') {
        ++this.tick;
        if (this.circleCreating) {
          ++this.tick2;
          const proportion = this.tick2 / this.circleCompleteTime;
          const armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

          ctx.beginPath();
          ctx.fillStyle = this.lightAlphaColor.replace('alp', proportion);
          ctx.arc(this.x, this.y, armonic * this.circleFinalSize, 0, Tau);
          ctx.fill();

          if (this.tick2 > this.circleCompleteTime) {
            this.tick2 = 0;
            this.circleCreating = false;
            this.circleFading = true;
          }
        } else if (this.circleFading) {
          ++this.tick2;
          const proportion = this.tick2 / this.circleFadeTime;
          const armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

          ctx.beginPath();
          ctx.fillStyle = this.lightAlphaColor.replace('alp', 1 - armonic);
          ctx.arc(this.x, this.y, this.circleFinalSize, 0, Tau);
          ctx.fill();

          if (this.tick2 >= this.circleFadeTime) this.circleFading = false;
        }

        this.shards.forEach((shard) => shard.step());
        if (this.shards.every((shard) => !shard.alive)) {
          this.phase = 'balloon';
          this.tick = 0;
        }
      }
    };

    function Shard(x, y, vx, vy, color) {
      const vel = opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random();
      this.vx = vx * vel;
      this.vy = vy * vel;
      this.x = x;
      this.y = y;
      this.color = color;
      this.alive = true;
    }

    Shard.prototype.step = function () {
      this.x += this.vx;
      this.y += this.vy += opts.gravity;

      ctx.fillStyle = this.color.replace('alp', 0.5);
      ctx.beginPath();
      ctx.arc(this.x, this.y, opts.fireworkShardBaseSize, 0, Tau);
      ctx.fill();

      if (this.y > h) this.alive = false;
    };

    function anim() {
      window.requestAnimationFrame(anim);
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, w, h);

      letters.forEach((letter) => letter.step());
    }

    opts.strings.forEach((str, i) => {
      str.split('').forEach((char, j) => {
        letters.push(
          new Letter(
            char,
            j * opts.charSpacing + opts.charSpacing / 2 - str.length * opts.charSize / 2,
            i * opts.lineHeight + opts.lineHeight / 2 - opts.strings.length * opts.lineHeight / 2
          )
        );
      });
    });

    anim();

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} id="c"></canvas>
      <p>
        From the codepals to{' '}
        <a href="https://codepen.io/tmrDevelops" target="_blank" rel="noopener noreferrer">
          Tiffany
        </a>
        <span>, by{' '}
          <a href="https://codepen.io/towc" target="_blank" rel="noopener noreferrer">
            Matei
          </a>
        </span>
      </p>
    </div>
  );
};

export default Intro;
