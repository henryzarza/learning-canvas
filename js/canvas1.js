"use strict";

var containerCanvas1 = document.getElementById("container-canvas1");
var canvas1 = document.getElementById("canvas1");
var canvas1Width = (canvas1.width = containerCanvas1.clientWidth);
var canvas1Height = (canvas1.height = containerCanvas1.clientHeight);
var canvas1Ctx = canvas1.getContext("2d");
var heightScale = 0.85;

function generateRandom(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue) + 7);
}

function resizeCanvas1() {
  canvas1Width = canvas1.width = containerCanvas1.clientWidth;
  canvas1Height = canvas1.height = containerCanvas1.clientHeight;
  renderTriangles();
}

function renderTriangles() {
  canvas1Ctx.fillStyle = "rgb(0,0,0)";
  canvas1Ctx.fillRect(0, 0, canvas1Width, canvas1Height);
  canvas1Ctx.lineWidth = 1;
  let initHue = generateRandom(0, 360);
  let populatedTriangle = 45;
  let middleSide = populatedTriangle / 2;
  let rowHeight = Math.floor(populatedTriangle * heightScale) + 1;
  let colums = Math.ceil(canvas1Width / populatedTriangle);
  let rows = Math.ceil(canvas1Height / rowHeight);

  for (let row = 0; row < rows; row++) {
    var hue = initHue + row * 3;
    for (let colum = 0; colum < colums; colum++) {
      let x = colum * populatedTriangle;
      let y = row * rowHeight;
      let color;
      if (row % 2 != 0) {
        x -= middleSide;
      }
      //Triangles upwards
      color = "hsl(" + hue + ", 40%, " + generateRandom(0, 60) + "%)";
      canvas1Ctx.fillStyle = color;
      canvas1Ctx.strokeStyle = color;
      canvas1Ctx.beginPath();
      canvas1Ctx.moveTo(x, y);
      canvas1Ctx.lineTo(x + middleSide, y + rowHeight);
      canvas1Ctx.lineTo(x - middleSide, y + rowHeight);
      canvas1Ctx.closePath();
      canvas1Ctx.fill();
      canvas1Ctx.stroke();

      //Triangles downwards
      color = "hsl(" + hue + ", 30%, " + generateRandom(0, 70) + "%)";
      canvas1Ctx.fillStyle = color;
      canvas1Ctx.strokeStyle = color;
      canvas1Ctx.beginPath();
      canvas1Ctx.moveTo(x, y);
      canvas1Ctx.lineTo(x + populatedTriangle, y);
      canvas1Ctx.lineTo(x + middleSide, rowHeight + y);
      canvas1Ctx.closePath();
      canvas1Ctx.fill();
      canvas1Ctx.stroke();
    }
  }
}

window.addEventListener("resize", resizeCanvas1);

resizeCanvas1();
setInterval(() => renderTriangles(), 3000);
