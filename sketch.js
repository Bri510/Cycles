// The Seed - Growth & Renewal
// A visualization of fragility, potential, and transformation

let branches = [];
let blossoms = [];
let fallingPetals = [];
let leaves = [];
let fallingLeaves = [];
let time = 0;
let petalImage;

// Colors (HSB mode) - now generated dynamically per branch/blossom

function preload() {
  petalImage = loadImage('Cherry blossom.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  
  // Create initial falling petals for immediate effect
  for (let i = 0; i < 10; i++) {
    let petal = new FallingPetal(
      random(width), // Random x position across the screen
      random(-height, 0), // Start at various heights above and on screen
      { h: random(330, 340), s: random(15, 35), b: random(90, 98) } // Pink color
    );
    fallingPetals.push(petal);
  }
}

function draw() {
  // Enhanced background with gradient and atmospheric effects
  drawEnhancedBackground();
  
  time += 0.01;
  
  // Draw and update dynamic curved branches
  for (let i = branches.length - 1; i >= 0; i--) {
    branches[i].update();
    branches[i].display();
    
    // Remove finished branches
    if (branches[i].isComplete()) {
      branches.splice(i, 1);
    }
  }
  
  // Draw and update blossoms
  for (let i = blossoms.length - 1; i >= 0; i--) {
    blossoms[i].update();
    blossoms[i].display();
    
    // Create falling petals from mature blossoms
    if (blossoms[i].shouldShed() && random() < 0.08) {
      createFallingPetal(blossoms[i]);
    }
    
    // Remove old blossoms
    if (blossoms[i].isDead()) {
      blossoms.splice(i, 1);
    }
  }
  
  // Create random falling petals
  if (random() < 0.03) { // 3% chance each frame to create a new falling petal
    let petal = new FallingPetal(
      random(width), // Random x position across the screen
      -20, // Start above the screen
      { h: random(330, 340), s: random(15, 35), b: random(90, 98) } // Pink color
    );
    fallingPetals.push(petal);
  }
  
  // Draw and update falling petals
  for (let i = fallingPetals.length - 1; i >= 0; i--) {
    fallingPetals[i].update();
    fallingPetals[i].display();
    
    if (fallingPetals[i].isDead()) {
      fallingPetals.splice(i, 1);
    }
  }
  
  // Draw and update leaves
  for (let i = leaves.length - 1; i >= 0; i--) {
    leaves[i].update();
    leaves[i].display();
    
    // Create falling leaves from mature leaves
    if (leaves[i].shouldFall() && random() < 0.02) {
      createFallingLeaf(leaves[i]);
    }
    
    // Remove old leaves
    if (leaves[i].isDead()) {
      leaves.splice(i, 1);
    }
  }
  
  // Draw and update falling leaves
  for (let i = fallingLeaves.length - 1; i >= 0; i--) {
    fallingLeaves[i].update();
    fallingLeaves[i].display();
    
    if (fallingLeaves[i].isDead()) {
      fallingLeaves.splice(i, 1);
    }
  }
  
  // Add subtle floating particles for atmosphere
  drawAtmosphere();
}


function createFallingPetal(blossom) {
  let petal = new FallingPetal(
    blossom.x + random(-10, 10),
    blossom.y + random(-10, 10),
    blossom.color
  );
  fallingPetals.push(petal);
}

function createFallingLeaf(leaf) {
  let fallingLeaf = new FallingLeaf(
    leaf.x + random(-5, 5),
    leaf.y + random(-5, 5),
    leaf.color
  );
  fallingLeaves.push(fallingLeaf);
}

function drawEnhancedBackground() {
  // Start with clean white background
  background(0, 0, 100, 100); // Pure white
  
  // Draw animated light pink circles
  drawFloatingCircles();
  
  // Enhanced atmospheric effects
  drawEnhancedAtmosphere();
}

function drawFloatingCircles() {
  noStroke();
  
  // Create floating light pink circles with gradient effect like in the image
  let circles = [
    // Large circles
    { x: 0.7, y: 0.4, size: 0.35, intensity: 0.9, speed: 0.1 },
    { x: 0.15, y: 0.75, size: 0.28, intensity: 0.8, speed: 0.08 },
    { x: 0.85, y: 0.15, size: 0.25, intensity: 0.7, speed: 0.12 },
    
    // Medium circles
    { x: 0.4, y: 0.25, size: 0.18, intensity: 0.6, speed: 0.15 },
    { x: 0.75, y: 0.8, size: 0.15, intensity: 0.5, speed: 0.09 },
    { x: 0.05, y: 0.3, size: 0.12, intensity: 0.4, speed: 0.13 },
    
    // Small circles
    { x: 0.6, y: 0.85, size: 0.1, intensity: 0.4, speed: 0.11 },
    { x: 0.25, y: 0.05, size: 0.08, intensity: 0.3, speed: 0.14 },
    { x: 0.9, y: 0.55, size: 0.06, intensity: 0.3, speed: 0.16 }
  ];
  
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    
    // Add gentle movement with different speeds for each circle
    let moveX = sin(time * circle.speed + i * 1.2) * 30;
    let moveY = cos(time * (circle.speed * 0.8) + i * 1.5) * 25;
    
    let x = circle.x * width + moveX;
    let y = circle.y * height + moveY;
    let size = circle.size * min(width, height);
    
    // Create smooth gradient effect by drawing multiple concentric circles
    let layers = 12;
    for (let layer = 0; layer < layers; layer++) {
      let layerProgress = layer / layers;
      let layerSize = size * (1 - layerProgress * 0.6);
      let layerAlpha = circle.intensity * 20 * (1 - layerProgress * layerProgress);
      
      // Light pink color with smooth falloff
      fill(335, 30, 95, layerAlpha);
      ellipse(x, y, layerSize);
    }
  }
  
  // Add some extra smaller floating circles for more atmosphere
  for (let i = 0; i < 6; i++) {
    let x = noise(time * 0.05 + i * 0.8) * width * 1.3 - width * 0.15;
    let y = noise(time * 0.04 + i * 0.9 + 100) * height * 1.3 - height * 0.15;
    let size = noise(time * 0.03 + i * 0.4 + 200) * 60 + 20;
    let alpha = map(sin(time * 0.6 + i * 0.7), -1, 1, 3, 12);
    
    // Very soft pink circles with gradient
    for (let layer = 0; layer < 6; layer++) {
      let layerProgress = layer / 6;
      let layerSize = size * (1 + layerProgress * 0.4);
      let layerAlpha = alpha * (1 - layerProgress * 0.8);
      fill(340, 25, 96, layerAlpha);
      ellipse(x, y, layerSize);
    }
  }
}

function drawBackgroundTexture() {
  // Subtle noise texture overlay
  for (let i = 0; i < 200; i++) {
    let x = random(width);
    let y = random(height);
    let noiseVal = noise(x * 0.01, y * 0.01, time * 0.02);
    let alpha = map(noiseVal, 0, 1, 0, 8);
    
    fill(0, 0, 100, alpha);
    noStroke();
    ellipse(x, y, 1);
  }
  
  // Add subtle cloud-like patterns
  for (let i = 0; i < 5; i++) {
    let x = noise(time * 0.003 + i * 0.5) * width * 1.2 - width * 0.1;
    let y = noise(time * 0.002 + i * 0.7 + 100) * height * 0.6;
    let size = noise(time * 0.001 + i * 0.3 + 200) * 200 + 100;
    
    // Very subtle cloud shapes
    fill(0, 0, 100, 3);
    noStroke();
    for (let j = 0; j < 8; j++) {
      let angle = (TWO_PI / 8) * j;
      let cloudX = x + cos(angle) * size * 0.3;
      let cloudY = y + sin(angle) * size * 0.2;
      ellipse(cloudX, cloudY, size * 0.4, size * 0.3);
    }
  }
}

function drawEnhancedAtmosphere() {
  // Original gentle floating particles
  for (let i = 0; i < 25; i++) {
    let x = noise(time * 0.3 + i * 0.1) * width;
    let y = noise(time * 0.2 + i * 0.1 + 100) * height;
    let alpha = map(sin(time * 2 + i), -1, 1, 5, 20);
    let size = map(sin(time * 1.5 + i * 0.5), -1, 1, 1, 3);
    
    fill(340, 15, 96, alpha);
    noStroke();
    ellipse(x, y, size);
  }
  
  // Add sparkling light effects
  for (let i = 0; i < 12; i++) {
    let x = noise(time * 0.1 + i * 0.3) * width;
    let y = noise(time * 0.08 + i * 0.3 + 300) * height;
    let alpha = map(sin(time * 4 + i * 0.8), -1, 1, 0, 30);
    let sparkleSize = map(sin(time * 3 + i * 0.6), -1, 1, 0.5, 2);
    
    // Light pink sparkles (matching flowers)
    fill(335, 25, 98, alpha);
    noStroke();
    ellipse(x, y, sparkleSize);
    
    // Add cross sparkle effect
    if (alpha > 15) {
      stroke(335, 20, 100, alpha * 0.6);
      strokeWeight(0.5);
      line(x - sparkleSize * 2, y, x + sparkleSize * 2, y);
      line(x, y - sparkleSize * 2, x, y + sparkleSize * 2);
      noStroke();
    }
  }
  
  // Distant floating orbs for depth
  for (let i = 0; i < 8; i++) {
    let x = noise(time * 0.05 + i * 0.4) * width * 1.3 - width * 0.15;
    let y = noise(time * 0.04 + i * 0.4 + 500) * height * 1.2 - height * 0.1;
    let alpha = map(sin(time * 1.2 + i), -1, 1, 2, 8);
    let orbSize = map(sin(time * 0.8 + i * 0.7), -1, 1, 8, 15);
    
    // Soft glowing pink orbs (matching flower theme)
    for (let layer = 0; layer < 3; layer++) {
      let layerAlpha = alpha * (1 - layer * 0.3);
      let layerSize = orbSize * (1 + layer * 0.3);
      fill(335, 20, 95, layerAlpha);
      ellipse(x, y, layerSize);
    }
  }
}

function drawAtmosphere() {
  // This function is now replaced by drawEnhancedAtmosphere
  // Keeping for compatibility but it's called from drawEnhancedBackground
}

class DynamicBranch {
  constructor(startX, startY, direction) {
    this.startX = startX;
    this.startY = startY;
    this.direction = direction; // Initial direction in radians
    this.length = 0;
    this.maxLength = random(120, 250); // Slightly shorter for more natural proportions
    this.growth = 0;
    this.points = [];
    this.age = 0;
    this.maxAge = 1200; // Much longer lifespan for branches
    this.blossomSpots = [];
    this.leafSpots = [];
    this.color = { h: random(15, 35), s: random(60, 85), b: random(25, 50) }; // Richer brown tones
    this.baseThickness = random(3, 6); // Natural thickness variation
    
    // Create all positions along the branch, then assign them to leaves or blossoms
    let totalSpots = int(random(8, 15)); // Total spots for both leaves and flowers
    let allPositions = [];
    
    // Generate evenly distributed positions along the branch
    for (let i = 0; i < totalSpots; i++) {
      let t = map(i, 0, totalSpots - 1, 0.2, 0.95);
      // Add small random offset for natural variation
      t += random(-0.04, 0.04);
      t = constrain(t, 0.15, 0.98);
      allPositions.push(t);
    }
    
    // Sort positions to ensure proper distribution
    allPositions.sort((a, b) => a - b);
    
    // Decide how many will be blossoms (fewer than leaves)
    let numBlossoms = int(random(2, 4));
    let numLeaves = totalSpots - numBlossoms;
    
    // Randomly assign positions to blossoms, preferring later positions (closer to tips)
    let blossomIndices = [];
    let availableIndices = [];
    for (let i = 0; i < totalSpots; i++) {
      availableIndices.push(i);
    }
    
    // Select blossom positions, preferring positions in the latter 70% of the branch
    for (let i = 0; i < numBlossoms; i++) {
      let preferredStart = Math.floor(totalSpots * 0.3); // Start from 30% along branch
      let weightedIndices = availableIndices.filter(idx => idx >= preferredStart);
      
      let selectedIndex;
      if (weightedIndices.length > 0) {
        selectedIndex = random(weightedIndices);
      } else {
        selectedIndex = random(availableIndices);
      }
      
      blossomIndices.push(selectedIndex);
      availableIndices = availableIndices.filter(idx => idx !== selectedIndex);
    }
    
    // Create blossom spots
    for (let index of blossomIndices) {
      this.blossomSpots.push({
        t: allPositions[index],
        created: false,
        age: random(60, 120), // Flowers appear earlier
        blossom: null
      });
    }
    
    // Create leaf spots from remaining positions
    for (let i = 0; i < availableIndices.length; i++) {
      let index = availableIndices[i];
      this.leafSpots.push({
        t: allPositions[index],
        created: false,
        age: random(30, 80), // Leaves appear earlier
        side: random() < 0.5 ? -1 : 1, // Which side of branch to grow on
        leaf: null
      });
    }
  }
  
  update() {
    this.age++;
    
    // Grow the branch slower and smoother
    if (this.length < this.maxLength) {
      // Smooth easing growth - starts faster, slows down
      let progress = this.length / this.maxLength;
      let easing = 1 - (progress * progress); // Quadratic ease-out
      this.length += 0.8 * easing; // Much slower base growth rate
      this.updateCurve();
    }
    
    // Create blossoms at designated spots
    for (let spot of this.blossomSpots) {
      if (!spot.created && this.age > spot.age && this.length > this.maxLength * spot.t) {
        let pos = this.getPointAt(spot.t);
        let newBlossom = new Blossom(pos.x, pos.y, this, spot.t);
        blossoms.push(newBlossom);
        spot.created = true;
        spot.blossom = newBlossom; // Store reference
      }
    }
    
    // Create leaves at designated spots
    for (let spot of this.leafSpots) {
      if (!spot.created && this.age > spot.age && this.length > this.maxLength * spot.t) {
        let pos = this.getPointAt(spot.t);
        let newLeaf = new Leaf(pos.x, pos.y, this, spot.t, spot.side);
        leaves.push(newLeaf);
        spot.created = true;
        spot.leaf = newLeaf; // Store reference
      }
    }
  }
  
  updateCurve() {
    this.points = [];
    let segments = max(int(this.length / 3), 5); // More segments for smoother curves
    
    for (let i = 0; i <= segments; i++) {
      let t = i / segments;
      let progress = (t * this.length) / this.maxLength;
      
      // Natural branch curvature - branches tend to grow upward
      let gravityBend = -progress * progress * 0.3; // Gradual upward curve
      
      // Organic variation based on growth
      let naturalVariation = sin(progress * PI * 3) * 0.2 * progress;
      
      // Subtle environmental sway (wind effect)
      let environmentalSway = sin(time * 0.3 + this.startX * 0.01) * 0.1 * progress;
      
      let angle = this.direction + gravityBend + naturalVariation + environmentalSway;
      
      let distance = t * this.length;
      
      // Add natural taper - branches get thinner as they grow
      let thickness = map(progress, 0, 1, this.baseThickness, this.baseThickness * 0.2);
      
      let x = this.startX + cos(angle) * distance;
      let y = this.startY + sin(angle) * distance;
      
      this.points.push({ x: x, y: y, thickness: thickness });
    }
  }
  
  getPointAt(t) {
    let index = int(t * (this.points.length - 1));
    if (index >= this.points.length - 1) {
      return this.points[this.points.length - 1];
    }
    
    let p1 = this.points[index];
    let p2 = this.points[index + 1];
    let localT = (t * (this.points.length - 1)) - index;
    
    return {
      x: lerp(p1.x, p2.x, localT),
      y: lerp(p1.y, p2.y, localT)
    };
  }
  
  display() {
    if (this.points.length < 2) return;
    
    // Draw natural branch with tapering thickness
    this.drawNaturalBranch();
    
    // Add bark texture and organic details
    this.drawBarkTexture();
  }
  
  drawNaturalBranch() {
    // Draw branch segments with variable thickness
    for (let i = 0; i < this.points.length - 1; i++) {
      let p1 = this.points[i];
      let p2 = this.points[i + 1];
      
      // Use natural thickness values
      let thickness1 = p1.thickness;
      let thickness2 = p2.thickness;
      
      // Draw multiple layers for depth
      for (let layer = 0; layer < 3; layer++) {
        let layerThickness1 = thickness1 * (1 - layer * 0.25);
        let layerThickness2 = thickness2 * (1 - layer * 0.25);
        let alpha = 80 - layer * 15;
        let brightness = this.color.b + layer * 8;
        
        stroke(this.color.h, this.color.s, brightness, alpha);
        strokeWeight(max(layerThickness1 + layerThickness2) / 2);
        line(p1.x, p1.y, p2.x, p2.y);
      }
    }
  }
  
  drawBarkTexture() {
    // Clean branches with no additional texture elements
  }
  
  
  isComplete() {
    return this.age > this.maxAge;
  }
}

class Blossom {
  constructor(x, y, parentBranch = null, branchPosition = 0) {
    this.x = x;
    this.y = y;
    this.parentBranch = parentBranch;
    this.branchPosition = branchPosition; // Position along branch (0-1)
    this.color = { h: random(330, 340), s: random(15, 35), b: random(90, 98) }; // Very light pink tones
    this.size = 0;
    this.maxSize = random(20, 35);
    this.age = 0;
    this.maxAge = random(800, 1200); // Much longer lifespan for flowers
    this.rotation = random(TWO_PI);
    this.bloomStage = 'growing';
    this.stemLength = random(6, 10); // Shorter stems for smaller flowers
    this.stemAngle = random(-PI/3, PI/3); // Angle of stem relative to branch
  }
  
  update() {
    this.age++;
    
    // Update position to stay attached to moving branch
    if (this.parentBranch && this.parentBranch.points.length > 0) {
      let branchPos = this.parentBranch.getPointAt(this.branchPosition);
      // Calculate branch direction at this point for stem attachment
      let branchAngle = this.getBranchAngle();
      
      // Position flower at end of small stem
      this.x = branchPos.x + cos(branchAngle + this.stemAngle) * this.stemLength;
      this.y = branchPos.y + sin(branchAngle + this.stemAngle) * this.stemLength;
    }
    
    // Growth stages
    if (this.age < 80) {
      this.bloomStage = 'growing';
      this.size = map(this.age, 0, 80, 0, this.maxSize);
    } else if (this.age < this.maxAge * 0.8) {
      this.bloomStage = 'blooming';
    } else {
      this.bloomStage = 'fading';
      let fadeProgress = (this.age - this.maxAge * 0.8) / (this.maxAge * 0.2);
      this.size = this.maxSize * (1 - fadeProgress);
    }
    
    // Slow rotation for dynamic effect
    this.rotation += 0.002;
  }
  
  getBranchAngle() {
    if (!this.parentBranch || this.parentBranch.points.length < 2) return 0;
    
    let index = int(this.branchPosition * (this.parentBranch.points.length - 1));
    index = constrain(index, 0, this.parentBranch.points.length - 2);
    
    let p1 = this.parentBranch.points[index];
    let p2 = this.parentBranch.points[index + 1];
    
    return atan2(p2.y - p1.y, p2.x - p1.x);
  }
  
  shouldShed() {
    return this.bloomStage === 'fading' && this.age > this.maxAge * 0.9;
  }
  
  isDead() {
    return this.age > this.maxAge;
  }
  
  display() {
    if (this.size <= 0) return;
    
    // Draw small stem connecting to branch
    if (this.parentBranch && this.parentBranch.points.length > 0) {
      this.drawStem();
    }
    
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    
    // Draw cherry blossom petals
    this.drawCherryBlossom();
    
    pop();
  }
  
  drawStem() {
    let branchPos = this.parentBranch.getPointAt(this.branchPosition);
    let branchAngle = this.getBranchAngle();
    
    // Draw small connecting stem
    stroke(25, 60, 50, 70); // Brown stem color
    strokeWeight(1.5);
    
    let stemStartX = branchPos.x;
    let stemStartY = branchPos.y;
    let stemEndX = branchPos.x + cos(branchAngle + this.stemAngle) * this.stemLength;
    let stemEndY = branchPos.y + sin(branchAngle + this.stemAngle) * this.stemLength;
    
    line(stemStartX, stemStartY, stemEndX, stemEndY);
    
    // Add small bud at connection point
    fill(25, 50, 45, 60);
    noStroke();
    ellipse(stemStartX, stemStartY, 3);
  }
  
  drawCherryBlossom() {
    let alpha = this.bloomStage === 'fading' ? 60 : 90;
    
    // Draw 5 cherry blossom petals using the image
    for (let i = 0; i < 5; i++) {
      push();
      rotate((TWO_PI / 5) * i);
      
      // Apply color tinting and transparency to the image
      tint(this.color.h, this.color.s, this.color.b, alpha);
      
      // Draw the petal image scaled to the flower size
      let petalSize = this.size * 0.8;
      imageMode(CENTER);
      image(petalImage, this.size * 0.2, 0, petalSize, petalSize);
      
      pop();
    }
    
    // Reset tint for other elements
    noTint();
    
    // Draw flower center
    this.drawCherryCenter();
  }
  
  
  drawCherryCenter() {
    let centerSize = this.size * 0.15;
    let alpha = this.bloomStage === 'fading' ? 70 : 95;
    
    // Outer center shadow
    fill(60, 40, 60, 30);
    ellipse(0, 1, centerSize * 1.2);
    
    // Main center - light pink for cherry blossom
    fill(335, 25, 92, alpha);
    ellipse(0, 0, centerSize);
    
    // Center highlight
    fill(330, 15, 98, alpha * 0.8);
    ellipse(-centerSize * 0.1, -centerSize * 0.1, centerSize * 0.6);
    
    // Draw delicate stamen (5 small dots arranged in circle)
    for (let i = 0; i < 5; i++) {
      let angle = (TWO_PI / 5) * i;
      let x = cos(angle) * centerSize * 0.3;
      let y = sin(angle) * centerSize * 0.3;
      
      // Stamen heads - light pink dots
      fill(340, 30, 88, alpha * 0.9);
      ellipse(x, y, 1.5);
      
      // Stamen stalks - very thin pink lines
      stroke(335, 35, 75, alpha * 0.6);
      strokeWeight(0.3);
      line(0, 0, x * 0.7, y * 0.7);
      noStroke();
    }
    
    // Central pistil - light pink
    fill(332, 20, 90, alpha * 0.8);
    ellipse(0, 0, centerSize * 0.3);
  }
}

class FallingPetal {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(0.5, 2);
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.1, 0.1);
    this.size = random(8, 15); // Larger falling petals for better visibility
    this.color = color;
    this.life = 255;
    this.gravity = 0.02;
  }
  
  update() {
    // Physics
    this.vy += this.gravity;
    this.vx *= 0.99; // Air resistance
    this.x += this.vx + sin(time + this.y * 0.01) * 0.5; // Gentle drift
    this.y += this.vy;
    
    this.rotation += this.rotationSpeed;
    this.life -= 0.6;
  }
  
  isDead() {
    return this.life <= 0 || this.y > height + 50;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    
    let alpha = map(this.life, 0, 255, 0, 80);
    
    // Apply color tinting and transparency to the falling petal image
    tint(this.color.h, this.color.s, this.color.b, alpha);
    
    // Draw the petal image
    imageMode(CENTER);
    image(petalImage, 0, 0, this.size, this.size);
    
    // Reset tint
    noTint();
    
    pop();
  }
}

class Leaf {
  constructor(x, y, parentBranch = null, branchPosition = 0, side = 1) {
    this.x = x;
    this.y = y;
    this.parentBranch = parentBranch;
    this.branchPosition = branchPosition;
    this.side = side; // -1 for left, 1 for right
    this.color = { h: random(90, 130), s: random(40, 80), b: random(45, 75) }; // Green tones
    this.size = 0;
    this.maxSize = random(8, 16);
    this.age = 0;
    this.maxAge = random(1000, 1600); // Much longer lifespan for leaves
    this.rotation = random(-PI/6, PI/6);
    this.growthStage = 'growing';
    this.stemLength = random(4, 8);
    this.stemAngle = (PI/2 + random(-PI/4, PI/4)) * this.side; // Perpendicular to branch
  }
  
  update() {
    this.age++;
    
    // Update position to stay attached to moving branch
    if (this.parentBranch && this.parentBranch.points.length > 0) {
      let branchPos = this.parentBranch.getPointAt(this.branchPosition);
      let branchAngle = this.getBranchAngle();
      
      // Position leaf at end of small stem
      this.x = branchPos.x + cos(branchAngle + this.stemAngle) * this.stemLength;
      this.y = branchPos.y + sin(branchAngle + this.stemAngle) * this.stemLength;
    }
    
    // Growth stages
    if (this.age < 60) {
      this.growthStage = 'growing';
      this.size = map(this.age, 0, 60, 0, this.maxSize);
    } else if (this.age < this.maxAge * 0.7) {
      this.growthStage = 'mature';
    } else {
      this.growthStage = 'aging';
      // Gradually change color to autumn colors
      let ageProgress = (this.age - this.maxAge * 0.7) / (this.maxAge * 0.3);
      this.color.h = lerp(this.color.h, random(20, 60), ageProgress * 0.5); // Shift to yellow/orange
      this.color.s = lerp(this.color.s, random(60, 90), ageProgress * 0.3);
    }
    
    // Slight movement in the wind
    this.rotation += sin(time * 0.8 + this.x * 0.01) * 0.01;
  }
  
  getBranchAngle() {
    if (!this.parentBranch || this.parentBranch.points.length < 2) return 0;
    
    let index = int(this.branchPosition * (this.parentBranch.points.length - 1));
    index = constrain(index, 0, this.parentBranch.points.length - 2);
    
    let p1 = this.parentBranch.points[index];
    let p2 = this.parentBranch.points[index + 1];
    
    return atan2(p2.y - p1.y, p2.x - p1.x);
  }
  
  shouldFall() {
    return this.growthStage === 'aging' && this.age > this.maxAge * 0.9;
  }
  
  isDead() {
    return this.age > this.maxAge;
  }
  
  display() {
    if (this.size <= 0) return;
    
    // Draw small stem connecting to branch
    if (this.parentBranch && this.parentBranch.points.length > 0) {
      this.drawStem();
    }
    
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    
    // Draw leaf
    this.drawLeaf();
    
    pop();
  }
  
  drawStem() {
    let branchPos = this.parentBranch.getPointAt(this.branchPosition);
    let branchAngle = this.getBranchAngle();
    
    // Draw small connecting stem
    stroke(25, 60, 50, 70); // Brown stem color
    strokeWeight(1);
    
    let stemStartX = branchPos.x;
    let stemStartY = branchPos.y;
    let stemEndX = branchPos.x + cos(branchAngle + this.stemAngle) * this.stemLength;
    let stemEndY = branchPos.y + sin(branchAngle + this.stemAngle) * this.stemLength;
    
    line(stemStartX, stemStartY, stemEndX, stemEndY);
  }
  
  drawLeaf() {
    let alpha = this.growthStage === 'aging' ? 70 : 90;
    
    // Draw leaf shadow for depth
    fill(this.color.h, this.color.s + 20, this.color.b - 20, alpha * 0.3);
    noStroke();
    this.drawLeafShape(1.05);
    
    // Draw main leaf
    fill(this.color.h, this.color.s, this.color.b, alpha);
    this.drawLeafShape(1.0);
    
    // Draw leaf highlight
    fill(this.color.h, this.color.s - 20, this.color.b + 15, alpha * 0.6);
    this.drawLeafShape(0.7);
    
    // Draw leaf vein
    stroke(this.color.h, this.color.s + 30, this.color.b - 20, alpha * 0.5);
    strokeWeight(0.5);
    line(0, -this.size * 0.4, 0, this.size * 0.4);
    noStroke();
  }
  
  drawLeafShape(scale = 1) {
    // Draw simple oval leaf shape
    let leafWidth = this.size * 0.6 * scale;
    let leafHeight = this.size * scale;
    
    // Create pointed oval leaf shape
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let r = leafHeight * 0.5;
      if (a < PI) {
        r *= 1.2; // Make top half slightly larger
      }
      let x = cos(a) * leafWidth * 0.5;
      let y = sin(a) * r;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

class FallingLeaf {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = random(-0.8, 0.8);
    this.vy = random(0.3, 1.5);
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.08, 0.08);
    this.size = random(6, 12);
    this.color = color;
    this.life = 255;
    this.gravity = 0.015;
    this.swayAmount = random(0.3, 0.8);
  }
  
  update() {
    // Physics
    this.vy += this.gravity;
    this.vx *= 0.98; // Air resistance
    this.x += this.vx + sin(time + this.y * 0.008) * this.swayAmount; // Gentle drift
    this.y += this.vy;
    
    this.rotation += this.rotationSpeed;
    this.life -= 0.4; // Slower fade than petals
  }
  
  isDead() {
    return this.life <= 0 || this.y > height + 50;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    
    let alpha = map(this.life, 0, 255, 0, 80);
    
    // Draw falling leaf
    fill(this.color.h, this.color.s, this.color.b, alpha);
    noStroke();
    
    // Simple leaf shape for falling leaves
    let leafWidth = this.size * 0.6;
    let leafHeight = this.size;
    
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.2) {
      let r = leafHeight * 0.5;
      if (a < PI) {
        r *= 1.2;
      }
      let x = cos(a) * leafWidth * 0.5;
      let y = sin(a) * r;
      vertex(x, y);
    }
    endShape(CLOSE);
    
    // Add subtle vein
    stroke(this.color.h, this.color.s + 20, this.color.b - 15, alpha * 0.4);
    strokeWeight(0.5);
    line(0, -leafHeight * 0.4, 0, leafHeight * 0.4);
    noStroke();
    
    pop();
  }
}

function mousePressed() {
  // Create a dynamic curved branch at click location
  let direction = random(TWO_PI); // Random initial direction
  let newBranch = new DynamicBranch(mouseX, mouseY, direction);
  branches.push(newBranch);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

