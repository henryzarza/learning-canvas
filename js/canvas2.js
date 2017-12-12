var imageHide = document.querySelector('.image-hide');
var containerCanvas2 = document.querySelector('.container-canvas2');    
var imgCanvas = document.createElement('canvas');
var imgCanvasCtx = imgCanvas.getContext('2d');
var lineCanvas = document.createElement('canvas');
var lineCanvasCtx = lineCanvas.getContext('2d');
var pointLifetime = 3800;
var points = [];

if (imageHide.complete) {
  start();
} else {
  imageHide.onload = start;
}

function start() {
  containerCanvas2.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', resizeCanvas2);
  containerCanvas2.appendChild(imgCanvas);
  resizeCanvas2();
  tick();
}

function onMouseMove(event) {
  let posX = event.pageX - containerCanvas2.offsetLeft;
  let posY = event.pageY - containerCanvas2.offsetTop;
  points.push({
    time: Date.now(),
    x: posX,
    y: posY
  });
}

function resizeCanvas2() {
  imgCanvas.width = lineCanvas.width = containerCanvas2.clientWidth;
  imgCanvas.height = lineCanvas.height = containerCanvas2.clientHeight;
}

function tick() {
  // Remove old points
  points = points.filter((point) => {
    var age = Date.now() - point.time;
    return age < pointLifetime;
  });

  drawLineCanvas();
  drawImageCanvas();
  requestAnimationFrame(tick);
}

function drawLineCanvas() {
  let minimumLineWidth = 25;
  let maximumLineWidth = 100;
  let lineWidthRange = maximumLineWidth - minimumLineWidth;
  let maximumSpeed = 50;

  lineCanvasCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
  lineCanvasCtx.lineCap = 'round';
  lineCanvasCtx.shadowBlur = 30;
  lineCanvasCtx.shadowColor = '#000';
  
  for (let i = 1; i < points.length; i++) {
    let point = points[i];
    let previousPoint = points[i - 1];

    let distance = getDistanceBetween(point, previousPoint);
    let speed = Math.max(0, Math.min(maximumSpeed, distance));
    let percentageLineWidth = (maximumSpeed - speed) / maximumSpeed;
    lineCanvasCtx.lineWidth = minimumLineWidth + percentageLineWidth * lineWidthRange;

    let age = Date.now() - point.time;
    let opacity = (pointLifetime - age) / pointLifetime;
    lineCanvasCtx.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';
    
    lineCanvasCtx.beginPath();
    lineCanvasCtx.moveTo(previousPoint.x, previousPoint.y);
    lineCanvasCtx.lineTo(point.x, point.y);
    lineCanvasCtx.stroke();
  }
}

function getDistanceBetween(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function drawImageCanvas() {
  // Emulate background-size: cover
  let width = imgCanvas.width;
  let height = imgCanvas.width / containerCanvas2.clientWidth * containerCanvas2.clientHeight;

  imgCanvasCtx.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
  imgCanvasCtx.globalCompositeOperation = 'source-over';
  imgCanvasCtx.drawImage(imageHide, 0, 0, width, height);
  imgCanvasCtx.globalCompositeOperation = 'destination-in';
  imgCanvasCtx.drawImage(lineCanvas, 0, 0);
}