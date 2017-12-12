"use strict";

function DotEffect() {
  var wordShow = "LADY GAGA";
  var canvas;
  var ctx;
  var bgCanvas;
  var bgCtx;
  var dotDensity = 3;
  var itercount = 0;
  var iterRendering = 45;
  var particles = [];
  var mouse = { x: -100, y: -100 };
  var mouseOnScreen = false;
  var waveMouse = 10;

  this.initialize = function(canvas_id) {
    let containerCanvas = document.querySelector(".container-canvas3");
    canvas = document.getElementById(canvas_id);
    ctx = canvas.getContext("2d");
    bgCanvas = document.createElement("canvas");
    bgCtx = bgCanvas.getContext("2d");
    canvas.width = bgCanvas.width = containerCanvas.clientWidth;
    canvas.height = bgCanvas.height = containerCanvas.clientHeight;

    canvas.addEventListener("mousemove", setPositionMouse);
    canvas.addEventListener("mouseout", resetPositionMouse);
    window.addEventListener("resize", resizeCanvas);
    start();
  };

  var resizeCanvas = function() {
    canvas.width = bgCanvas.width = containerCanvas1.clientWidth;
    canvas.height = bgCanvas.height = containerCanvas1.clientHeight;
    renderTriangles();
  }

  var start = function() {
    bgCtx.font = "150px impact";
    bgCtx.fillText(wordShow, 15, 150);
    clear();
    getCoords();
  };

  var getCoords = function() {
    let imageData = bgCtx.getImageData(0, 0, canvas.width, canvas.height);

    for (let height = 0; height < bgCanvas.height; height += dotDensity) {
      for (let width = 0; width < bgCanvas.width; width += dotDensity) {
        let pixel = imageData.data[(width + height * bgCanvas.width) * 4 - 1];
        if (pixel == 255) {
          drawCircle(width, height);
        }
      }
    }

    setInterval(update, 40);
  };

  var drawCircle = function(x, y) {
    let startx = Math.random() * canvas.width;
    let starty = Math.random() * canvas.height;
    let velx = (x - startx) / iterRendering;
    let vely = (y - starty) / iterRendering;
    let color = '#' + (Math.random() * 0x949494 + 0xaaaaaa | 0).toString(16); //"rgb(" + generateRandom(0, 255) + ", " + generateRandom(0, 255) + ", " + generateRandom(0, 250) + ")";
    particles.push({
      c: color,
      x: x,
      y: y,
      x2: startx,
      y2: starty,
      r: true,
      v: { x: velx, y: vely }
    });
  };

  var update = function() {
    itercount++;
    clear();
    for (let i = 0; i < particles.length; i++) {
        if (particles[i].r) {
            particles[i].x2 += particles[i].v.x;
            particles[i].y2 += particles[i].v.y;
        }
        if (itercount == iterRendering) {
            particles[i].v = {
                x: Math.random() * 6 * 2 - 6,
                y: Math.random() * 6 * 2 - 6
            };
            particles[i].r = false;
        }

        let dx = particles[i].x - mouse.x;
        let dy = particles[i].y - mouse.y;
        let sqrDist = Math.sqrt(dx * dx + dy * dy);

        if (sqrDist < waveMouse) {
            particles[i].r = true;
        }

        ctx.fillStyle = particles[i].c;
        ctx.beginPath();
        ctx.arc(particles[i].x2, particles[i].y2, 4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
  };

  var setPositionMouse = function(event) {
    if (event.layerX || event.layerX == 0) {
        mouseOnScreen = true;
        mouse.x = event.layerX - canvas.offsetLeft;
        mouse.y = event.layerY - canvas.offsetTop;
    }
  };

  var resetPositionMouse = function(event) {
    mouseOnScreen = false;
    mouse.x = -100;
    mouse.y = -100;
  };

  var clear = function() {
    ctx.fillStyle = "#232524";
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    ctx.fill();
  };
}

var dot = new DotEffect();
dot.initialize("canvas3");
