// the $ is jquery, assigning a ctx variable to get context, ctx calls the whole line now so I don't have to type getContext every time
var ctx = $('#canvas')[0].getContext("2d");

//library is all the code, including functions put at the top of the js for good practice

//BEGIN LIBRARY CODE

var x = 25;		// x and y are the coordinates of the circle 
var y = 250;
var dx = 1.5;	//dx and dy determine the direction the circle moves
var dy = -4;
var ctx;
var WIDTH;
var HEIGHT;
var paddlex;
var paddleh = 10;
var paddlew = 75;
var rightDown = false;	//this code stops the paddle from moving on its own when the ball drops, allowing the user to control it 
var leftDown = false;
var canvasMinX = 0;
var canvasMaxX = 0;
var intervalId = 0;
var bricks;
var NROWS = 5;
var NCOLS = 5;
var BRICKWIDTH;
var BRICKHEIGHT = 15;
var PADDING = 1;

function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  paddlex = WIDTH / 2;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
   // the return setInterval tells my ball to be drawn, deleted and redrawn to make it look like its moving within 30 miliseconds
  intervalId = setInterval(draw, 30);
}

//this is my circle
function circle(x,y,r) {
  ctx.fillStyle= "#00BFFF";		 //this colours my circle blue
  ctx.beginPath();
  //the x and y coordinates determine the circle's coordinates, r is the radius and 0 is the starting point, true is the counterclockwise direction
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
  rect(0,0,WIDTH,HEIGHT);
}

function onKeyDown(evt) {						
  if (evt.keyCode == 39) rightDown = true;         
  else if (evt.keyCode == 37) leftDown = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = Math.max(evt.pageX - canvasMinX - (paddlew/2), 0);
    paddlex = Math.min(WIDTH - paddlew, paddlex);
  }
}

$(document).mousemove(onMouseMove);

function initbricks() {
    bricks = new Array(NROWS);
    for (i=0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j=0; j < NCOLS; j++) {
            bricks[i][j] = 1;
        }
    }
}

function drawbricks() {
  for (i=0; i < NROWS; i++) {
    ctx.fillStyle = rowcolors[i];
    for (j=0; j < NCOLS; j++) {
      if (bricks[i][j] == 1) {
        rect((j * (BRICKWIDTH + PADDING)) + PADDING, 
             (i * (BRICKHEIGHT + PADDING)) + PADDING,
             BRICKWIDTH, BRICKHEIGHT);
      }
    }
  }
}


//END LIBRARY CODE

/*//CREATE CIRCLE 
//this is my ball
function circle(x,y,r) {
  ctx.fillStyle= "#00BFFF";		 //this colours my circle blue
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();

//CREATE ACTION 
//this is the bounce function
var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var ctx;
 
function init() {
  ctx = $('#canvas')[0].getContext("2d");
  return setInterval(draw, 10);		// the circle is deleted and redrawn every 10 miliseconds, its the speed the ball bounces at
}
 
function draw() {
  ctx.clearRect(0,0,300,300);
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI*2, true); 
  ctx.closePath();
  ctx.fill();
  x += dx;
  y += dy;
}
 
init();

//CREATE BOUNCE
//this code contains the ball bouncing in the box by rebounding off the walls 
function draw() {
  clear();
  circle(x, y, 10);

//if x + dx is greater than width or x + dx is less than 0, then x=-dx which means the ball is moving in a negtive width direction, left   
  if (x + dx > WIDTH || x + dx < 0)		
    dx = -dx;
//if y + dy is greather than height else if y + dy is less than height then the ball is moving in a negative height direction causing the bounce
  if (y + dy > HEIGHT || y + dy < 0)
    dy = -dy;
 
  x += dx;
  y += dy;
}

init();

//CREATE PADDLE
var paddlex;	//x is starting point: 0,0 paddle starts in the middle of the page
var paddleh;	//h is height of paddle
var paddlew;	//w is width of oaddle

function init_paddle() {		//this is drawing the paddle
  paddlex = WIDTH / 2;
  paddleh = 10;
  paddlew = 75;
}

function draw() {
  clear();
  circle(x, y, 10);
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
 
  if (x + dx > WIDTH || x + dx < 0)
    dx = -dx;

  if (y + dy < 0)
    dy = -dy;
  else if (y + dy > HEIGHT) {
    if (x > paddlex && x < paddlex + paddlew)
      dy = -dy;
    else
      //game over, so stop the animation
      clearInterval(intervalId);
  }
 
  x += dx;
  y += dy;
}

init();
init_paddle();

//KEYBOARD CONTROL - paddle moving right and left

//for keyboard input control
//this code stops the paddle from moving on its own when the ball drops, allowing the user to control it 
	rightDown = false;
	leftDown = false;

//set rightDown or leftDown if the right or left keys are down
//this allows the paddle to move right and left, if rightDown/leftDown is false then the paddle will not move right/left when the key is pressed down
	function onKeyDown(evt) {
		if (evt.keyCode == 39) rightDown = true;
		else if (evt.keyCode == 37) leftDown = true;
}
//and unset them when the right or left key is released
// this stops the paddle from moving off the canvas on KeyUp
	function onKeyUp(evt) {
		if (evt.keyCode == 39) rightDown = false;
		else if (evt.keyCode == 37) leftDown = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
       
function draw() {
  clear();
  circle(x, y, 10);

//move the paddle if left or right is currently pressed
  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
 
  if (x + dx > WIDTH || x + dx < 0)
    dx = -dx;

  if (y + dy < 0)
    dy = -dy;
  else if (y + dy > HEIGHT) {
    if (x > paddlex && x < paddlex + paddlew)
      dy = -dy;
    else
      clearInterval(intervalId);
  }
 
  x += dx;
  y += dy;
}

init();

//MOUSE CONTROL

var canvasMinX;		// if the mouse moves off the canvas, this will recognize that the mouse is no longer altering the game
var canvasMaxX;		

function init_mouse() {
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
}

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX;
  }
}

$(document).mousemove(onMouseMove);
     
function draw() {
  clear();
  circle(x, y, 10);

  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
 
  if (x + dx > WIDTH || x + dx < 0)
    dx = -dx;

  if (y + dy < 0)
    dy = -dy;
  else if (y + dy > HEIGHT) {
    if (x > paddlex && x < paddlex + paddlew)
      dy = -dy;
    else
      clearInterval(intervalId);
  }
 
  x += dx;
  y += dy;
}

init();
init_mouse();

//CREATE THE BRICKS
var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;

function initbricks() {
  NROWS = 5;
  NCOLS = 5;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  BRICKHEIGHT = 15;
  PADDING = 1;

  bricks = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
      bricks[i][j] = 1;
    }
  }
}
       
function draw() {
  clear();
  circle(x, y, 10);

  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

  //draw bricks
  for (i=0; i < NROWS; i++) {
    for (j=0; j < NCOLS; j++) {
      if (bricks[i][j] == 1) {
		  rect((j * (BRICKWIDTH + PADDING)) + PADDING, 
             (i * (BRICKHEIGHT + PADDING)) + PADDING,
             BRICKWIDTH, BRICKHEIGHT);
      }
    }
  }

  //have we hit a brick?
  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  //if so, reverse the ball and mark the brick as broken
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy;
    bricks[row][col] = 0;
  }
 
  if (x + dx > WIDTH || x + dx < 0)
    dx = -dx;

  if (y + dy < 0)
    dy = -dy;
  else if (y + dy > HEIGHT) {
    if (x > paddlex && x < paddlex + paddlew)
      dy = -dy;
    else
      clearInterval(intervalId);
  }
 
  x += dx;
  y += dy;
}

init();
initbricks();
*/

//CODE
var ballr = 10;
var rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
var paddlecolor = "#FFFFFF";
var ballcolor = "#FFFFFF";
var backcolor = "#000000";
//ADD LIVES 
var lives = 5;		//this is declaring the amount of lives I'm giving the player	
//ADD SCOREBOARD
var score = 0;		//this is declaring the score


function draw() {				//the function that draws on the canvaas
  ctx.fillStyle = backcolor;
  clear();
  ctx.fillStyle = ballcolor;
  circle(x, y, ballr);
  drawLives();		//this actually giving the player lives
  drawScore();		//this is actually drawing the score on the screen
  

  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  ctx.fillStyle = paddlecolor;
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
 

  drawbricks();
									//want to learn about real collision detection? go read http://www.metanetsoftware.com/technique/tutorialA.html
  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  //reverse the ball and mark the brick as broken
  //this if statement is for when the ball breaks the brick, it disappears and the ball goes in a new direction
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy;
    bricks[row][col] = 0;
	score ++; 		//this increments the score by one each time the ball hits a brick
  }
 
  if (x + dx + ballr > WIDTH || x + dx - ballr < 0)
    dx = -dx;

  if (y + dy - ballr < 0)
    dy = -dy;
  else if (y + dy + ballr > HEIGHT - paddleh) {
	  if (x > paddlex && x < paddlex + paddlew) {
		//move the ball differently based on where it hit the paddle
      dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);		//if the ball hits the paddle, it changes direction
      dy = -dy;
    }						
    else {					// if the ball doesnt hit the paddle then -1 from lives and reset paddle and ball position
		lives--;
		if (!lives){		//when lives =0 reload the ga
			alert("Game Over");
			document.location.reload();
		}
		else {								
			x = canvas.width/2;
			y = canvas.height-30;
			dx = 2;
			dy = -2;
			paddleX = (canvas.width-paddleWidth)/2;
		}
	}
  }
 
  x += dx;
  y += dy;
}

init();
initbricks();

//GIVE PLAYER LIVES

function drawLives() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "#00BFFF";
    //ctx.fillText("Lives: "+lives, canvas.width-65, canvas.height/3);
	ctx.fillText("Lives: "+ lives, 17, 145);
}
setInterval(draw, 10);
draw();
requestAnimationFrame(draw);

//CREATE SCOREBOARD
function drawScore(){						//this is creating/declaring the scoreboard
	ctx.font = "18px Arial"
	ctx.fillStyle = "#00BFFF";
	ctx.fillText("Score:" + score, 16, 120); 	// these are the coordinates for where the score goes
	
}
