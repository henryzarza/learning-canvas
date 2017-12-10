"use strict";

function generateRandom(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue) + 7);
}

function inicializateFirtCanvas() {

  var containerCanvas = document.getElementById("container__canvas1");
  var canvas = document.getElementById("canvas1");
  var canvasWidth = canvas.width = containerCanvas.clientWidth;
  var canvasHeight = canvas.height = containerCanvas.clientHeight;
  var ctx = canvas.getContext("2d");
  var heightScale = 0.85;

  return (() => {b

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.lineWidth = 1;
    var initHue = generateRandom(0, 360);
    var populatedTriangle = 45;
    var middleSide = populatedTriangle / 2;
    var rowHeight = Math.floor(populatedTriangle * heightScale) + 1;
    var colums = Math.ceil(canvasWidth / populatedTriangle);
    var rows = Math.ceil(canvasHeight / rowHeight);

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
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + middleSide, y + rowHeight);
        ctx.lineTo(x - middleSide, y + rowHeight);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Triangles downwards
        color = "hsl(" + hue + ", 30%, " + generateRandom(0, 70) + "%)";
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + populatedTriangle, y);
        ctx.lineTo(x + middleSide, rowHeight + y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }
  });

}

var canvas1 = inicializateFirtCanvas();
canvas1();
setInterval(() => canvas1(), 3000);