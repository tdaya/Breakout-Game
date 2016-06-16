

//library is all the code, including functions put at the top of the js

var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var WIDTH;
var HEIGHT;
var ctx;


function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
    // the return setInterval tells my ball to be drawn, deleted and redrawn to make it look like its moving within 10 miliseconds
  return setInterval(draw,30);
}

//this is my circle
function circle(x,y,r) {
  ctx.fillStyle= "#00BFFF";
  //this colours my circle blue
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
  
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
//end library

ctx.fillStyle= "#00BFFF";
// adds blue color to the circle 
ctx.beginPath();
ctx.arc(150, 150, 30, 0, Math.PI*2, true); 
ctx.closePath();
ctx.fill();

//the x and y coordinates determine the circle's coordinates (75) 10 is the radius and 0 is the starting point, true is counterclockwise 


var x = 100;
var y = 200;
var dx = 5;
var dy = 6;
var ctx;
// x and y are the coordinates of the circle, dx and dy determine the direction the circle moves 
function init() {
ctx = $('#canvas')[0].getContext("2d");
return setInterval(draw, 50);
  //this tells my ball to be drawn, deleted and redrawn to make it look like its moving within 10 miliseconds
}

function draw() {
  ctx.clearRect(0,0,500,500);
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI*2, true); 
  ctx.closePath();
  ctx.fill();
  x += dx;
  y += dy;
  // this is the moving ball, calling the same x, y, dx, and dy 
 }

init();



getcontext(2d) - overrides everything
need to change/add 2d variable an xml ex ball/paddle 

ctx.fillstyle getrandomcolour 

// this is the bounce function
function draw() {
  clear();
  circle(x, y, 10);
 
//if x + dx is greater than width or x + dx is less than 0, then x=-dx which means the ball is moving in a negtive width direction, left
  if (x + dx > WIDTH || x + dx < 0)
    dx = -dx;
//if y + dy is greather than height or y + dy is less than zero then the ball is moving in a negative height direction causing the bounce
  if (y + dy > HEIGHT || y + dy < 0)
    dy = -dy;
 
  x += dx;
  y += dy;
}

init();

