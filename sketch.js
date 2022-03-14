

let p1top, p1bottom, p2top, p2bottom;
let p1topf, p1bottomf, p2topf, p2bottomf;

let ball;
let ballVel;
let xVel = 1.8;
let ballRadius = 5;

let gravity;

let crossed = false;

let gameOver = false;

let score = 0;

let leeway = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);

  noSmooth();

  ball = createVector(width/2, height/2);
  ballVel = createVector(xVel, 0);

  gravity = createVector(0, 0.25);

  // p1top = p2top = 10;
  // p1bottom = p2bottom = height - 10;
  p1top = p2top = height/2 - 50;
  p1topf = p2topf = height/2 - 50;
  p1bottom = p2bottom = height/2 + 50;
  p1bottomf = p2bottomf = height/2 + 50;

  textAlign(CENTER, CENTER);


  // ellipseMode(CENTER); // alr set i think
  noStroke();
}

function draw() {

  if (!gameOver) {

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
        xVel += 0.05;
        ballVel.x = xVel;

        // make right paddle smaller
        let totalSize = p1bottom - p1top;
        totalSize = 0.8 * totalSize;
        p1top = random(0, height - totalSize);
        p1bottom = p1top + totalSize;
        
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
        xVel += 0.05;
        ballVel.x = -xVel;

        // make right paddle smaller
        let totalSize = p2bottom - p2top;
        totalSize = 0.8 * totalSize;
        p2top = random(0, height - totalSize);
        p2bottom = p2top + totalSize;
        
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


    // update everything
    ballVel.add(gravity);
    ball.add(ballVel);

    // animate movement of paddles
    // if (p1bottom != p1bottomf) {
    //   if (p1bottom > p1bottomf) {
    //     if (p1bottom - p1bottomf < 1) {
    //       p1bottom = p1bottomf;
    //     }
    //     else {
    //       p1bottom--;
    //     }
    //   }
    //   else { // p1bottom < p1bottomf
    //     if (p1bottomf - p1bottom < 1) {
    //       p1bottom = p1bottomf;
    //     }
    //     else {
    //       p1bottom++;
    //     }
    //   }
    // }

  }
  else { // game is over
    background(0, 20);
    textSize(20);
    fill(255);
    text("game over", width/2, height/2);
    textSize(12);
    text("your score was " + score, width/2, height/2 + 40);
  }
  
}


function keyPressed() {
  ballVel.y = -6;
}

function mousePressed() {
  ballVel.y = -6;
}

