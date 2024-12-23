

let p1top, p1bottom, p2top, p2bottom;
let p1topOG, p1bottomOG, p2topOG, p2bottomOG;
let p1topFinal, p1bottomFinal, p2topFinal, p2bottomFinal;

let ball;
let ballVel;
// let xVel = 1.8;
let xVel;
let ballRadius = 5;

let gravity;

let crossed;

let gameOver, mainScreen;

let score;

let leeway = 15;

let terminalVelocity = 50;

// frames for animating paddles
let totalFrames = 30;
let framesLeft = 0;
let p1needsToMove = false;
let p2needsToMove = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  noSmooth();

  reset();


  textAlign(CENTER, CENTER);


  // ellipseMode(CENTER); // alr set i think
  noStroke();
}

function reset() {
  rectMode(CORNER);
  crossed = false;
  gameOver = false;
  mainScreen = true;
  score = 0;

  // make velocity with respect to screen size
  xVel = 2 * width / 400; // resembles "speed = 2"

  ball = createVector(width/2, height/2);
  ballVel = createVector(xVel, 0);

  gravity = createVector(0, 0.25);

  // p1top = p2top = 10;
  // p1bottom = p2bottom = height - 10;
  p1top = p2top = height/2 - 50;
  p1topOG = p2topOG = height/2 - 50;
  p1topFinal = p2topFinal = height/2 - 50;

  // p1topf = p2topf = height/2 - 50;
  p1bottom = p2bottom = height/2 + 50;
  p1bottomOG = p2bottomOG = height/2 + 50;
  p1bottomFinal = p2bottomFinal = height/2 + 50;
  // p1bottomf = p2bottomf = height/2 + 50;
}

function draw() {

  if (!gameOver && !mainScreen) {

    background(0);
    textSize(15);
    fill(255);
    text("score: " + score, width/2, 30);

    // draw ball:
    ellipse(ball.x, ball.y, ballRadius*2, ballRadius*2);

    // draw paddles
    // rect(45, 10, 5, height - 20, 10);
    rect(45, p1top, 4, p1bottom - p1top, 10);
    // rect(width -50, 10, 5, height - 20, 10);
    rect(width -50, p2top, 4, p2bottom - p2top, 10);
    // edges are at 50, width - 50



    // ball hit left paddle  
    if (ball.x - ballRadius <= 50) {
      if (!crossed && p1top <= ball.y + leeway && ball.y - leeway <= p1bottom) {
        // xVel += 0.05;
        // if 2 is 1, then 0.05 is 0.025
        xVel += width / 400 * 0.025;
        ballVel.x = xVel;

        // make right paddle smaller
        let totalSize = p1bottom - p1top;
        totalSize = 0.8 * totalSize;

        // p1top = random(0, height - totalSize);
        // p1bottom = p1top + totalSize;
        p1topFinal = random(0, height - totalSize);
        p1bottomFinal = p1topFinal + totalSize;
        p1topOG = p1top;
        p1bottomOG = p1bottom;
        p1needsToMove = true;
        framesLeft = totalFrames;
        
        score++;
      }
      else {
        crossed = true;
      }
    }

    // hit right edge
    if (ball.x - ballRadius <= 0) {
      gameOver = true;
    }

    // ball hit right paddle
    if (ball.x + ballRadius >= width - 50) {
      if (!crossed && p2top <= ball.y + leeway && ball.y - leeway <= p2bottom) {
        // xVel += 0.05;
        xVel += width / 400 * 0.025;
        ballVel.x = -xVel;

        // make right paddle smaller
        let totalSize = p2bottom - p2top;
        totalSize = 0.8 * totalSize;
        // p2top = random(0, height - totalSize);
        // p2bottom = p2top + totalSize;
        p2topFinal = random(0, height - totalSize);
        p2bottomFinal = p2topFinal + totalSize;
        p2topOG = p2top;
        p2bottomOG = p2bottom;
        p2needsToMove = true;
        framesLeft = totalFrames;
        
        score++;
      }
      else {
        crossed = true;
      }
    }


    // hit left edge
    if (ball.x + ballRadius >= width) {
      gameOver = true;
    }

    // hit floor:
    if (ball.y > height) {
      ball.y = 0;
    }

    // hit roof:
    if (ball.y < 0) {
      ball.y = height;
    }

    // update everything
    ballVel.add(gravity);

    if (ballVel.y > terminalVelocity) {
      ballVel.y = terminalVelocity;
    }

    ball.add(ballVel);

    movePaddles();

  }
  else if (mainScreen) {
    background(0, 20);
    textSize(20);
    fill(255);
    text("flappy pong", width/2, height/2);
    textSize(12);
    text("tap or click to jump. hit the paddles to get points", width/2, height/2 + 40);
    rectMode(CENTER);
    rect(width/2, height/2 + 100, 100, 30, 20);
    fill(0);
    text("play", width/2, height/2 + 100);
  }
  else { // game is over
    background(0, 20);
    textSize(20);
    fill(255);
    text("game over", width/2, height/2);
    textSize(12);
    text("your score was " + score, width/2, height/2 + 40);
    rectMode(CENTER);
    rect(width/2, height/2 + 100, 100, 30, 20);
    fill(0);
    text("play again", width/2, height/2 + 100);

  }
  
}


function movePaddles() {
  //p1needsToMove, p2needsToMove

  // p1topFinal, p1bottomFinal
  // framesLeft 100 --> 0
  // totalFrames
  // create function based on relationship between totalFrames and frames left
  // f(framesLeft / totalFrames) --> if 1, then no movement, if 1 -> 0.5, then increase speed
  // if 0.5 -> 1, then decrease speed 
  // speed should actually be positioning based on the distance between current p1 and final
  // p1pos = p1final * (how far we should be, from 0 to 1.0)

  // lets try linear motion first
  // p1top = map((framesLeft / totalFrames), 1, 0, p1topOG, p1topFinal);

  // how can we replace (framesLeft / totalFrames) to make it nonlinear?
  // (framesLeft / totalFrames) goes from 1 to 0 linearly
  // some x goes from 1 to 0.5 at increasing slope and then 
  // from 0.5 to 0 at decreasing slope
  // this reminds me of a gaussian curve?
  // something to do with e^ (1 / x)
  // might need to look it up if i cant figure it out on the plane

  // i could also just do a regular polynomial function with 
  // local min at 0,0 
  // local max at 1,1
  // even better, a stepwise function that is 
  // x^2 from 0 to 0.5, and then -x^2 + 1 from 0.5 to 1
  // with proper connection ofc.. something like that

  // 2x^2 and -2(x-1)^2 + 1 WORK
  // if framesLeft > 0.5 * totalFrames

  if (p1needsToMove) {

    if (framesLeft == 0) {
      p1top = p1topFinal;
      p1bottom = p1bottomFinal;
      p1needsToMove = false;
      return;
    }
    let functionX, functionY;
    if (framesLeft > 0.5 * totalFrames) {
      functionX = (1 - (framesLeft / totalFrames));
      functionY = 2 * functionX * functionX;
    }
    else {
      functionX = (1 - (framesLeft / totalFrames));
      functionY = -2 * (functionX - 1) * (functionX - 1) + 1;
    }
    p1top = p1topOG + (p1topFinal - p1topOG) * functionY;
    p1bottom = p1bottomOG + (p1bottomFinal - p1bottomOG) * functionY;
    framesLeft--;
    
  }

  if (p2needsToMove) {

    if (framesLeft == 0) {
      p2top = p2topFinal;
      p2bottom = p2bottomFinal;
      p2needsToMove = false;
      return;
    }

    let functionX, functionY;

    if (framesLeft > 0.5 * totalFrames) {
      // start = p2topOG (represents 0 in graph)
      // end = p2topFinal (represents 1 in graph)
      // set pos to start + (end - start) * how far we are (approaching 0 if we are closer)
      // how far we are but approaching 0 = (framesLeft / totalFrames)

      functionX = (1 - (framesLeft / totalFrames));
      functionY = 2 * functionX * functionX;
    }
    else {
      functionX = (1 - (framesLeft / totalFrames));
      functionY = -2 * (functionX - 1) * (functionX - 1) + 1;
    }
    p2top = p2topOG + (p2topFinal - p2topOG) * functionY;
    // p2top = map((framesLeft / totalFrames), 1, 0, p2topOG, p2topFinal);
    // p2bottom = map((framesLeft / totalFrames), 1, 0, p2bottomOG, p2bottomFinal);
    p2bottom = p2bottomOG + (p2bottomFinal - p2bottomOG) * functionY;
    framesLeft--;
    
    // else {
    //   p2top = map((framesLeft / totalFrames), 1, 0, p2topOG, p2topFinal);
    //   p2bottom = map((framesLeft / totalFrames), 1, 0, p2bottomOG, p2bottomFinal);
    //   framesLeft--;
    // }
    
  }
}



function keyPressed() {
  ballVel.y = -6;
  if (gameOver) {
    if (keyCode == ENTER) {
      reset();
    }
  }
}

function mousePressed() {
  ballVel.y = -6;

  if (gameOver || mainScreen) {
    if (
      width/2 - 50 <= mouseX && mouseX <= width/2 + 50
      && height/2+100 - 15 <= mouseY && mouseY <= height/2+100 + 15
    ) {
      if (gameOver)
        reset();
      else if (mainScreen) mainScreen = false;
    }
  }
}

