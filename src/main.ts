import "./style.scss";
import "./introOutro";
import { drawInstructions, gameOver, victory } from "./introOutro";

type Direction = "up" | "down" | "left" | "right";
type Piece = {
  x: number;
  y: number;
};
type Snake = {
  body: Piece[];
};

const scoreDisplay = document.querySelector<HTMLOutputElement>(".controls__score-value");
const startBtn = document.querySelector<HTMLButtonElement>(".controls__start");
const canvas = document.querySelector<HTMLCanvasElement>(".game");
const context = canvas!.getContext("2d");
canvas!.width = 400;
canvas!.height = 400;
context!.fillStyle = "green";

let rdyForNextMove:boolean = true;
let animationStop :any;
let score: number = 0;
let speed: number = 0;
let food: Piece;
let snake: Snake;
let snakeBodyTracker: boolean[][];
let moveDir: Direction;

const cellSize: number = 10;

drawInstructions(context, canvas);

/////////////
///////////// Bellow are the main functions used by the animation loop function 'play' bellow.
/////////////

const rnd = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const updateHead = (headX: number, headY: number): undefined => {
snakeBodyTracker[headX][headY] = true;
snake.body.unshift({ x: headX, y: headY });
context!.fillRect(snake.body[0].x, snake.body[0].y, cellSize - 1, cellSize - 1);
return;
};

const updateHeadTail = (headX: number, headY: number, tailX: number, tailY: number): undefined => {
updateHead(headX, headY);
snakeBodyTracker[tailX][tailY] = false;
snake.body.pop();
context!.fillStyle = "black";
context!.fillRect(tailX, tailY, cellSize - 1, cellSize - 1);
context!.fillStyle = "green";
return;
};

const drawFood = ():undefined =>{
food = { x: rnd(0, 40)*cellSize, y: rnd(0, 40)*cellSize };
while (snakeBodyTracker[food.x][food.y]) {
  food.x = rnd(0, 40)*cellSize;
  food.y = rnd(0, 40)*cellSize;
}
context!.fillStyle = "red";
context!.fillRect(food.x, food.y, cellSize - 1, cellSize - 1);
context!.fillStyle = "green";
return;
}

/////////////
///////////// Bellow are are event listners for tablet and mobile. We are looking for taps on one of 4 sccreen sides.
///////////// Each screen side will get an arrow painted by 'drawTouchZones' function bellow.

canvas!.addEventListener('touchstart', function(e) {
    e.preventDefault();
    
    if (!rdyForNextMove) return;
    
    const touch = e.touches[0];
    const rect = canvas!.getBoundingClientRect();
    
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    
    const centerX = canvas!.width / 2;
    const centerY = canvas!.height / 2;
    
    const deltaX = touchX - centerX;
    const deltaY = touchY - centerY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && (moveDir == "up" || moveDir == "down")) {
            moveDir = "right";
            rdyForNextMove = false;
        } else if (deltaX < 0 && (moveDir == "up" || moveDir == "down")) {
            moveDir = "left";
            rdyForNextMove = false;
        }
    } else {
        if (deltaY < 0 && (moveDir == "left" || moveDir == "right")) {
            moveDir = "up";
            rdyForNextMove = false;
        } else if (deltaY > 0 && (moveDir == "left" || moveDir == "right")) {
            moveDir = "down";
            rdyForNextMove = false;
        }
    }
});

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function drawTouchZones() {
if (isMobileDevice()) {
  context!.fillStyle = "rgba(255, 255, 255, 0.8)";
  const arrowSize = 10;

  context!.beginPath();
  context!.moveTo(canvas!.width / 2, 0);
  context!.lineTo(canvas!.width / 2 - arrowSize, arrowSize);
  context!.lineTo(canvas!.width / 2 + arrowSize, arrowSize);
  context!.closePath();
  context!.fill();
  
  context!.beginPath();
  context!.moveTo(canvas!.width / 2, canvas!.height);
  context!.lineTo(canvas!.width / 2 - arrowSize, canvas!.height - arrowSize);
  context!.lineTo(canvas!.width / 2 + arrowSize, canvas!.height - arrowSize);
  context!.closePath();
  context!.fill();
  
  context!.beginPath();
  context!.moveTo(0, canvas!.height / 2);
  context!.lineTo(arrowSize, canvas!.height / 2 - arrowSize);
  context!.lineTo(arrowSize, canvas!.height / 2 + arrowSize);
  context!.closePath();
  context!.fill();
  
  context!.beginPath();
  context!.moveTo(canvas!.width, canvas!.height / 2);
  context!.lineTo(canvas!.width - arrowSize, canvas!.height / 2 - arrowSize);
  context!.lineTo(canvas!.width - arrowSize, canvas!.height / 2 + arrowSize);
  context!.closePath();
  context!.fill();

  context!.fillStyle = "green";
}
}
/////////////
///////////// Bellow are event listners for keyboard. We are looking for arrow key presses. 
///////////// Game starts/re-stars with the press of start/re-start button. 

document.addEventListener("keydown", function (e) {
  if (rdyForNextMove && e.key == "ArrowUp" && (moveDir == "left" || moveDir == "right")) {
    moveDir = "up";
    rdyForNextMove = false;
  }

  if (rdyForNextMove && e.key == "ArrowDown" && (moveDir == "left" || moveDir == "right")) {
    moveDir = "down";
    rdyForNextMove = false;
  }

  if (rdyForNextMove && e.key == "ArrowLeft" && (moveDir == "up" || moveDir == "down")) {
    moveDir = "left";
    rdyForNextMove = false;
  }

  if (rdyForNextMove && e.key == "ArrowRight" && (moveDir == "up" || moveDir == "down")) {
    moveDir = "right";
    rdyForNextMove = false;
  }
});

startBtn!.addEventListener("click", function () {
 cancelAnimationFrame(animationStop);
 context!.clearRect(0, 0, canvas!.width, canvas!.height);
 score = 0;
 scoreDisplay!.innerHTML = score.toString();

moveDir = "up";

food = { x: rnd(0, 40)*cellSize, y: rnd(0, 40)*cellSize };
snake = { body: [{ x: rnd(10, 30)*cellSize, y: rnd(10, 30)*cellSize }] };
while (snake.body[0].x == food.x && snake.body[0].y == food.y) {
  snake.body[0].x = rnd(10, 30)*cellSize;
  snake.body[0].y = rnd(10, 30)*cellSize;
}

snakeBodyTracker = Array(400).fill(null).map(() => Array(400).fill(false));
snakeBodyTracker[snake.body[0].x][snake.body[0].y] = true;

drawFood();
requestAnimationFrame(play);
});

/////////////
///////////// Bellow is the main animation loop that which progresses the game appropriately depending on which direction the
///////////// snake is presently moving.


let counter: number = 0;
const play = (): undefined => {
drawTouchZones();
animationStop = requestAnimationFrame(play);
speed = 7 - Math.floor(score/20);

if(score == 100) {cancelAnimationFrame(animationStop); victory(context, canvas);}
if (++counter < speed) {return;}
counter = 0;

if (moveDir === "up") {
  const headX: number = snake.body[0].x;
  const headY: number = snake.body[0].y - cellSize;
  const tailX: number = snake.body[snake.body.length - 1].x;
  const tailY: number = snake.body[snake.body.length - 1].y;
  
  if(headX < 0 || headX >= 400 || headY < 0 || headY >= 400) {cancelAnimationFrame(animationStop); gameOver(context, canvas);}
  if(snakeBodyTracker[headX][headY]) {cancelAnimationFrame(animationStop); gameOver(context, canvas);}
  
  if(headX == food.x && headY == food.y)
  {
    ++score;
    scoreDisplay!.innerHTML = score.toString();
    context!.fillStyle = "black";
    context!.fillRect(food.x, food.y, cellSize - 1, cellSize - 1);
    context!.fillStyle = "green";
    updateHead(headX, headY);
    drawFood();
  }
  else
  {
    updateHeadTail(headX, headY, tailX, tailY);
  }
  rdyForNextMove = true;
}

if (moveDir === "down") {
  const headX: number = snake.body[0].x;
  const headY: number = snake.body[0].y + cellSize;
  const tailX: number = snake.body[snake.body.length - 1].x;
  const tailY: number = snake.body[snake.body.length - 1].y;
  
  if(headX < 0 || headX >= 400 || headY < 0 || headY >= 400) {cancelAnimationFrame(animationStop); gameOver(context, canvas);}
  if(snakeBodyTracker[headX][headY]) {cancelAnimationFrame(animationStop); gameOver(context, canvas);}

  if(headX == food.x && headY == food.y)
  {
    ++score;
    scoreDisplay!.innerHTML = score.toString();
    context!.fillStyle = "black";
    context!.fillRect(food.x, food.y, cellSize - 1, cellSize - 1);
    context!.fillStyle = "green";
    updateHead(headX, headY);
    drawFood();
  }
  else
  {
    updateHeadTail(headX, headY, tailX, tailY);
  }
  rdyForNextMove = true;
}

if (moveDir === "right") {
  const headX: number = snake.body[0].x + cellSize;
  const headY: number = snake.body[0].y;
  const tailX: number = snake.body[snake.body.length - 1].x;
  const tailY: number = snake.body[snake.body.length - 1].y;
  
  if(headX < 0 || headX >= 400 || headY < 0 || headY >= 400) {cancelAnimationFrame(animationStop); gameOver(context, canvas);}
  if(snakeBodyTracker[headX][headY]) {cancelAnimationFrame(animationStop); gameOver(context, canvas);}

  if(headX == food.x && headY == food.y)
  {
    ++score;
    scoreDisplay!.innerHTML = score.toString();
    context!.fillStyle = "black";
    context!.fillRect(food.x, food.y, cellSize - 1, cellSize - 1);
    context!.fillStyle = "green";
    updateHead(headX, headY);
    drawFood();
  }
  else
  {
    updateHeadTail(headX, headY, tailX, tailY);
  }
  rdyForNextMove = true;
}

if (moveDir === "left") {
  const headX: number = snake.body[0].x - cellSize;
  const headY: number = snake.body[0].y;
  const tailX: number = snake.body[snake.body.length - 1].x;
  const tailY: number = snake.body[snake.body.length - 1].y;
  
  if(headX < 0 || headX >= 400 || headY < 0 || headY >= 400) {cancelAnimationFrame(animationStop); gameOver(context, canvas);}
  if(snakeBodyTracker[headX][headY]) {cancelAnimationFrame(animationStop); gameOver(context, canvas);}

  if(headX == food.x && headY == food.y)
  {
    ++score;
    scoreDisplay!.innerHTML = score.toString();
    context!.fillStyle = "black";
    context!.fillRect(food.x, food.y, cellSize - 1, cellSize - 1);
    context!.fillStyle = "green";
    updateHead(headX, headY);
    drawFood();
  }
  else
  {
    updateHeadTail(headX, headY, tailX, tailY);
  }
  rdyForNextMove = true;
}
return;
};


