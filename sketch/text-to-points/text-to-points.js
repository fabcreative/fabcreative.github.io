/*	_typo_textToPoints-circle // cc teddavis.org 2020	*/

let font;
let pointsArray = []; // Array to hold all lines' points
let lines = ["LET", "CODE", "DIE"]; // Text lines
let lineSpacing = 240; // Space between lines

function preload() {
  font = loadFont("Inter-VariableFont_slnt,wght.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255);
  strokeWeight(1);


  generatePoints(lines, height / 4, lineSpacing);
}

function draw() {
  background(color("#1a1b26"));
  translate(width / 2, height / 2);

  // Draw all points
  for (let linePoints of pointsArray) {
    drawPoints(linePoints);
  }
}

function drawPoints(points) {
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let s = mouseY / 10 + sin(i * 0.25 + frameCount * 0.05) * 20; // Circle size animation
    circle(p.x, p.y, s);
  }
}

function generatePoints(linesArray, textSize, spacing) {
  pointsArray = []; // Clear previous points

  let totalHeight = (linesArray.length - 1) * spacing; // Calculate total text block height
  let startY = -totalHeight / 2; // Start Y to center the block vertically

  for (let i = 0; i < linesArray.length; i++) {
    let line = linesArray[i];
    let yOffset = startY + i * spacing;

    let bounds = font.textBounds(line, 0, 0, textSize);
    let points = font.textToPoints(line, -bounds.w / 2, bounds.h / 2 + yOffset, textSize, {
      sampleFactor: 0.07,
      simplifyThreshold: 0,
    });

    pointsArray.push(points); // Store points for each line
  }
}