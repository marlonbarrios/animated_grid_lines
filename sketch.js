const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5()




const settings = {
  pixelsPerInch: 300,
   // Tell canvas-sketch we're using p5.js
   p5: true,
   // Turn on a render loop (it's off by default in canvas-sketch)

   duration: 3,

    animate: true,
    // We can specify dimensions if we want a fixed size on the first render
    dimensions:[512, 512],
    // orientation: 'landscape',
    bleed: 1 / 8,
    // attributes: {
    // antialias: true
    // }
};



canvasSketch(() => {

  

  return ({ playhead, width, height }) => {

// For consistent sizing regardless of portrait/landscape
const dim = Math.max(width, height);
  clear();
// Black background


// Stroke only with a specific join style and thickness
noFill();
stroke(0);
strokeCap(ROUND);
strokeWeight(dim * 0.015);

const gridSize = 15;
const margin = dim * 0.07;
const innerWidth = width - margin * 2;
const cellSize = innerWidth / gridSize;

const time = millis() / 2000;

for (let y = 0; y < gridSize; y++) {
  for (let x = 0; x < gridSize; x++) {
    const u = gridSize <= 1 ? 0.5 : x / (gridSize - 1);
    const v = gridSize <= 1 ? 0.5 : y / (gridSize - 1);
    
    const px = lerp(margin, width - margin, u);
    const py = lerp(margin, height - margin, v);
    
    const rotation = sin(time + u * PI * 0.25) * PI;
    const lineSize = sin(time + v * PI) * 0.5 + 0.5;
    segment(px, py, cellSize * lineSize, rotation);
  }
}
}

// Draw a line segment centred at the given point
function segment(x, y, length, angle = 0) {
const r = length / 2;
const u = Math.cos(angle);
const v = Math.sin(angle);
line(x - u * r, y - v * r, x + u * r, y + v * r);

  }
},  settings);
