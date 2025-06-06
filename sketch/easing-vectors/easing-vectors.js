/*
Simple p5.js sketch that defines a Mover class that uses vectors for position, velocity, and acceleration 
to simulate spring-damped bouncing circles between two vertical limits.
*/

class Mover {
  constructor(x, top, bottom, delayFrames) {
    // Starting position: x is provided, and y starts at the top limit.
    this.pos = createVector(x, top);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    // Define vertical limits as numbers.
    this.topLimit = top;
    this.bottomLimit = bottom;

    // Set the initial target to the bottom limit.
    this.target = bottom;

    // Constants for the spring force (k) and damping (c).
    this.k = 0.05;
    this.c = 0.6; // near critical damping

    // Thresholds for snapping into place.
    this.positionThreshold = 0.5;
    this.velocityThreshold = 0.5;

    // Delay before the mover starts animating (in frames).
    this.delay = delayFrames;
  }

  update() {
    // If the global frameCount hasn't reached this mover's delay, do nothing.
    if (frameCount < this.delay) {
      return;
    }

    // Compute a force that pulls toward the target based on the difference in y.
    let force = (this.target - this.pos.y) * this.k;
    // Compute a damping force proportional to the current y velocity.
    let damping = this.vel.y * this.c;

    // Calculate the net acceleration for the y axis.
    let ay = force - damping;

    // Update the acceleration vector (only y is used).
    this.acc.y = ay;

    // Update velocity and position using the acceleration.
    this.vel.y += this.acc.y;
    this.pos.y += this.vel.y;

    // When the mover is close enough to the target (and nearly stopped),
    // snap to the target, change colors, and reverse the target.
    if (
      abs(this.target - this.pos.y) < this.positionThreshold &&
      abs(this.vel.y) < this.velocityThreshold
    ) {
      this.pos.y = this.target;
      this.vel.y = 0;
      this.acc.y = 0;
      // Switch target: if at bottom, go to top; if at top, go to bottom.
      this.target =
        this.target === this.bottomLimit ? this.topLimit : this.bottomLimit;
    }
  }

  show() {
    noStroke();
    fill(circleColor);
    ellipse(this.pos.x, this.pos.y, 80, 80);
  }
}

let movers = [];
let bgColor, circleColor;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize colors.
  bgColor = color("black");
  circleColor = color(255, 255, 255);

  let numMovers = 10;
  let xSpacing = 100; // x offset of 60 pixels between circles
  // Calculate a starting x coordinate to center the group horizontally.
  let startX = -((numMovers - 1) * xSpacing) / 2;

  // Each mover will have a delay: 0.5 seconds = 30 frames delay between each.
  let delayBetween = 30;

  // Create 10 movers with an x offset of 60 and staggered delays.
  for (let i = 0; i < numMovers; i++) {
    let x = startX + i * xSpacing;
    // All movers share the same vertical limits: from -height/4 to height/4.
    let delayFrames = i * delayBetween;
    movers.push(new Mover(x, -height / 4, height / 4, delayFrames));
  }
}

function draw() {
  background(bgColor);

  // Translate the origin to the center of the canvas.
  translate(width / 2, height / 2);

  // Update and display each mover.
  for (let mover of movers) {
    mover.update();
    mover.show();
  }
}
