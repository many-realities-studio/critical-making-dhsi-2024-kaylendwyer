let squares = [];
let debris = [];

function preload() {
  collideDebug(true); // Enable collision debugging
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);

  // Add new squares at intervals
  if (frameCount % 60 == 0) { // Slower rate
    squares.push(new Square(random(width - 40), 0, 40, randomPastelColor()));
  }

  // Update and display squares
  for (let i = squares.length - 1; i >= 0; i--) {
    let square = squares[i];
    square.update();
    square.show();
    if (square.isShattered && square.pieces.length === 0) {
      squares.splice(i, 1); // Remove square
    }
  }

  // Update and display debris
  for (let i = debris.length - 1; i >= 0; i--) {
    let piece = debris[i];
    piece.update();
    piece.show();
  }

  // Handle collisions between debris pieces
  handleCollisions();
}

class Square {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speed = 2; // Reduced speed for slower fall
    this.isShattered = false;
    this.pieces = [];
  }

  update() {
    if (!this.isShattered) {
      this.y += this.speed;
      if (this.y >= height - this.size) {
        this.y = height - this.size;
        this.shatter();
      }
    } else {
      for (let piece of this.pieces) {
        piece.update();
      }
    }
  }

  show() {
    if (!this.isShattered) {
      fill(this.color);
      rect(this.x, this.y, this.size, this.size);
    } else {
      for (let piece of this.pieces) {
        piece.show();
      }
    }
  }

  shatter() {
    this.isShattered = true;
    let pieceSize = this.size / 4; // Smaller pieces
    for (let i = 0; i < 16; i++) { // Create 16 pieces
      let offsetX = (i % 4) * pieceSize;
      let offsetY = floor(i / 4) * pieceSize;
      let piece = new Piece(this.x + offsetX, this.y + offsetY, pieceSize, this.color);
      this.pieces.push(piece);
      debris.push(piece); // Add piece to debris
    }
  }
}

class Piece {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = random(-2, 2);
    this.speedY = random(-5, -1); // Initial upward speed for bounce
    this.gravity = 0.2; // Gravity effect
  }

  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;

    // Constrain to canvas boundaries
    if (this.x < 0) {
      this.x = 0;
      this.speedX *= -0.5; // Reverse and reduce speed
    } else if (this.x + this.size > width) {
      this.x = width - this.size;
      this.speedX *= -0.5; // Reverse and reduce speed
    }

    if (this.y + this.size > height) {
      this.y = height - this.size;
      this.speedY *= -0.5; // Reduce speed and reverse direction
      this.speedX *= 0.8; // Reduce horizontal speed
      if (abs(this.speedY) < 1) {
        this.speedY = 0; // Stop bouncing when speed is very low
        this.speedX = 0;
      }
    }
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }
}

function handleCollisions() {
  for (let i = 0; i < debris.length; i++) {
    for (let j = i + 1; j <

      debris.length; j++) {
      let pieceA = debris[i];
      let pieceB = debris[j];

      if (collideRectRect(
        pieceA.x, pieceA.y, pieceA.size, pieceA.size,
        pieceB.x, pieceB.y, pieceB.size, pieceB.size)) {
        resolveCollision(pieceA, pieceB);
      }
    }
  }
}

function resolveCollision(pieceA, pieceB) {
  let overlapX = min(pieceA.x + pieceA.size - pieceB.x, pieceB.x + pieceB.size - pieceA.x);
  let overlapY = min(pieceA.y + pieceA.size - pieceB.y, pieceB.y + pieceB.size - pieceA.y);

  let maxOverlap = pieceA.size / 2; // 50% overlap

  if (overlapX < overlapY) {
    if (overlapX > maxOverlap) overlapX = maxOverlap;
    if (pieceA.x < pieceB.x) {
      pieceA.x -= overlapX / 2;
      pieceB.x += overlapX / 2;
    } else {
      pieceA.x += overlapX / 2;
      pieceB.x -= overlapX / 2;
    }
  } else {
    if (overlapY > maxOverlap) overlapY = maxOverlap;
    if (pieceA.y < pieceB.y) {
      pieceA.y -= overlapY / 2;
      pieceB.y += overlapY / 2;
    } else {
      pieceA.y += overlapY / 2;
      pieceB.y -= overlapY / 2;
    }

    // Adjust vertical speed to simulate bounce effect
    pieceA.speedY *= -0.5;
    pieceB.speedY *= -0.5;
  }
}

function randomPastelColor() {
  return color(random(150, 255), random(150, 255), random(150, 255));
}
