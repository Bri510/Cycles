// The Autumn - Transformation & Reflection
// A visualization of change, letting go, and natural beauty

let branches = [];
// Removed blossom and petal arrays - only leaves now
let leaves = [];
let fallingLeaves = [];
let time = 0;
// Removed petalImage - only leaves now
let leafImages = [];
let randomFallingLeaves = [];
let startTime;
let titleColorChanged = false;
// Removed automatic flower creation variables - flowers only appear on click

// Colors (HSB mode) - now generated dynamically per branch/leaf

function preload() {
  // Load all leaf images
  leafImages[0] = loadImage('Leaf 1.png');
  leafImages[1] = loadImage('Leaf 2.png');
  leafImages[2] = loadImage('Leaf 3.png');
  leafImages[3] = loadImage('Leaf 4.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  
  // Record start time for title color change
  startTime = millis();
  
  // Create initial falling leaves for immediate effect
  for (let i = 0; i < 15; i++) {
    let randomLeafImage = new RandomFallingLeafImage(
      random(width), // Random x position across the screen
      random(-height, 0), // Start at various heights above and on screen
      random(4) // Random leaf image (0-3)
    );
    randomFallingLeaves.push(randomLeafImage);
  }
  
  // No initial flowers - page starts clean, flowers only appear on click
}

function draw() {
  // Enhanced background with autumn gradient and atmospheric effects
  drawAutumnBackground();
  
  // Check if 5 seconds have passed and change title color to brown for 3 seconds
  if (!titleColorChanged && millis() - startTime > 5000) {
    changeTitleToBrown();
    titleColorChanged = true;
  }
  
  // Check if 8 seconds have passed (5 + 3) and change back to green
  if (titleColorChanged && millis() - startTime > 8000) {
    changeTitleToGreen();
    titleColorChanged = false; // Reset so it can happen again
  }
  
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
  
  // Blossoms removed - only leaves now
  
  // Falling petals removed - only leaves now
  
  // Draw and update leaves
  for (let i = leaves.length - 1; i >= 0; i--) {
    leaves[i].update();
    leaves[i].display();
    
    // Create falling leaves when they should fall (instead of just removing them)
    if (leaves[i].shouldFall() && !leaves[i].hasFallen) {
      createFallingLeaf(leaves[i]);
      leaves[i].hasFallen = true; // Mark as fallen
    }
    
    // Create upward-flying brown leaves during decay
    if (leaves[i].growthStage === 'aging' && random() < 0.03 && fallingLeaves.length < 20) {
      createUpwardFlyingLeaf(leaves[i]);
    }
    
    // Remove old leaves only after they've fallen and aged
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
  
  // Create random falling leaf images (with limit for performance)
  if (random() < 0.04 && randomFallingLeaves.length < 15) { // Reduced frequency and added limit
    createRandomFallingLeaf();
  }
  
  // Draw and update random falling leaf images
  for (let i = randomFallingLeaves.length - 1; i >= 0; i--) {
    randomFallingLeaves[i].update();
    randomFallingLeaves[i].display();
    
    if (randomFallingLeaves[i].isDead()) {
      randomFallingLeaves.splice(i, 1);
    }
  }
  
  // Add subtle floating particles for autumn atmosphere
  drawAutumnAtmosphere();
  
  // No automatic flower creation - flowers only appear on click
}


// createFallingPetal function removed - no more blossoms

function createFallingLeaf(leaf) {
  let fallingLeaf = new FallingLeaf(
    leaf.x + random(-5, 5),
    leaf.y + random(-5, 5),
    leaf.color,
    leaf.leafImageIndex,
    leaf.size
  );
  fallingLeaves.push(fallingLeaf);
}

function createUpwardFlyingLeaf(leaf) {
  let upwardLeaf = new UpwardFlyingLeaf(
    leaf.x + random(-5, 5),
    leaf.y + random(-5, 5),
    leaf.color
  );
  fallingLeaves.push(upwardLeaf);
}

function createRandomFallingLeaf() {
  let randomLeafImage = new RandomFallingLeafImage(
    random(width), // Random x position across the screen
    -50, // Start above the screen
    random(4) // Random leaf image (0-3)
  );
  randomFallingLeaves.push(randomLeafImage);
}

// Removed createInitialFlowers function - no initial flowers

function createFlowerFromBottom(clickX = null, clickY = null) {
  // No branch limit - allow unlimited trees
  
  let x, y;
  
  // If click coordinates are provided, use them
  if (clickX !== null && clickY !== null) {
    x = clickX;
    y = clickY;
  } else {
    // Fallback to original behavior - create from bottom
    // Spread branches more systematically to avoid clustering
    if (branches.length > 0) {
      let attempts = 0;
      let minDistance = 120; // Minimum distance between branches
      let validPosition = false;
      
      while (!validPosition && attempts < 20) {
        x = random(80, width - 80); // Keep away from edges
        validPosition = true;
        
        // Check distance from existing branches
        for (let branch of branches) {
          let distance = abs(x - branch.startX);
          if (distance < minDistance) {
            validPosition = false;
            break;
          }
        }
        attempts++;
      }
      
      // If we couldn't find a good position, use a random one
      if (!validPosition) {
        x = random(80, width - 80);
      }
    } else {
      // First branch - place it in the center area
      x = random(width * 0.3, width * 0.7);
    }
    y = height - 5; // Start from very bottom
  }
  
  let direction = -PI/2; // Straight upward direction (90 degrees up)
  let newBranch = new DynamicBranch(x, y, direction);
  branches.push(newBranch);
}

function drawAutumnBackground() {
  // Start with warm autumn background
  background('#FFEAC0'); // Warm cream/beige background
  
  // Draw animated autumn-colored circles
  drawAutumnFloatingCircles();
  
  // Enhanced atmospheric effects
  drawAutumnEnhancedAtmosphere();
}

function drawAutumnFloatingCircles() {
  noStroke();
  
  // Create floating warm autumn circles with gradient effect
  let circles = [
    // Large circles - warm autumn colors
    { x: 0.7, y: 0.4, size: 0.35, intensity: 0.9, speed: 0.1, hue: 25 }, // Orange
    { x: 0.15, y: 0.75, size: 0.28, intensity: 0.8, speed: 0.08, hue: 15 }, // Red-orange
    { x: 0.85, y: 0.15, size: 0.25, intensity: 0.7, speed: 0.12, hue: 35 }, // Yellow-orange
    
    // Medium circles - including teal accents
    { x: 0.4, y: 0.25, size: 0.18, intensity: 0.6, speed: 0.15, hue: 50 }, // Yellow
    { x: 0.75, y: 0.8, size: 0.15, intensity: 0.5, speed: 0.09, hue: 162 }, // Teal #51B184
    { x: 0.05, y: 0.3, size: 0.12, intensity: 0.4, speed: 0.13, hue: 30 }, // Amber
    
    // Small circles - more teal accents
    { x: 0.6, y: 0.85, size: 0.1, intensity: 0.4, speed: 0.11, hue: 162 }, // Teal #51B184
    { x: 0.25, y: 0.05, size: 0.08, intensity: 0.3, speed: 0.14, hue: 40 }, // Golden
    { x: 0.9, y: 0.55, size: 0.06, intensity: 0.3, speed: 0.16, hue: 162 }, // Teal #51B184
    
    // Additional teal circles
    { x: 0.3, y: 0.6, size: 0.14, intensity: 0.5, speed: 0.07, hue: 162 }, // Teal #51B184
    { x: 0.8, y: 0.35, size: 0.09, intensity: 0.4, speed: 0.13, hue: 162 } // Teal #51B184
  ];
  
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    
    // Add gentle movement with different speeds for each circle
    let moveX = sin(time * circle.speed + i * 1.2) * 30;
    let moveY = cos(time * (circle.speed * 0.8) + i * 1.5) * 25;
    
    let x = circle.x * width + moveX;
    let y = circle.y * height + moveY;
    let size = circle.size * min(width, height);
    
    // Create simplified gradient effect (reduced layers for performance)
    let layers = 6;
    for (let layer = 0; layer < layers; layer++) {
      let layerProgress = layer / layers;
      let layerSize = size * (1 - layerProgress * 0.6);
      let layerAlpha = circle.intensity * 20 * (1 - layerProgress * layerProgress);
      
      // Autumn color with smooth falloff
      fill(circle.hue, 60, 85, layerAlpha);
      ellipse(x, y, layerSize);
    }
  }
  
  // Add some extra smaller floating circles for more atmosphere
  for (let i = 0; i < 6; i++) {
    let x = noise(time * 0.05 + i * 0.8) * width * 1.3 - width * 0.15;
    let y = noise(time * 0.04 + i * 0.9 + 100) * height * 1.3 - height * 0.15;
    let size = noise(time * 0.03 + i * 0.4 + 200) * 60 + 20;
    let alpha = map(sin(time * 0.6 + i * 0.7), -1, 1, 3, 12);
    let hue = [15, 25, 35, 162, 10, 162][i]; // Autumn hues with teal accents
    
    // Soft autumn-colored circles with gradient
    for (let layer = 0; layer < 6; layer++) {
      let layerProgress = layer / 6;
      let layerSize = size * (1 + layerProgress * 0.4);
      let layerAlpha = alpha * (1 - layerProgress * 0.8);
      fill(hue, 50, 80, layerAlpha);
      ellipse(x, y, layerSize);
    }
  }
}

function drawAutumnEnhancedAtmosphere() {
  // Original gentle floating particles with autumn colors (reduced for performance)
  for (let i = 0; i < 8; i++) {
    let x = noise(time * 0.3 + i * 0.1) * width;
    let y = noise(time * 0.2 + i * 0.1 + 100) * height;
    let alpha = map(sin(time * 2 + i), -1, 1, 5, 20);
    let size = map(sin(time * 1.5 + i * 0.5), -1, 1, 1, 3);
    let hue = [20, 30, 40, 15, 35][i % 5]; // Cycle through autumn hues
    
    fill(hue, 40, 85, alpha);
    noStroke();
    ellipse(x, y, size);
  }
  
  // Add sparkling light effects with autumn colors (reduced for performance)
  for (let i = 0; i < 6; i++) {
    let x = noise(time * 0.1 + i * 0.3) * width;
    let y = noise(time * 0.08 + i * 0.3 + 300) * height;
    let alpha = map(sin(time * 4 + i * 0.8), -1, 1, 0, 30);
    let sparkleSize = map(sin(time * 3 + i * 0.6), -1, 1, 0.5, 2);
    let hue = [25, 15, 35, 45, 10][i % 5]; // Autumn sparkle colors
    
    // Warm sparkles
    fill(hue, 60, 90, alpha);
    noStroke();
    ellipse(x, y, sparkleSize);
    
    // Add cross sparkle effect
    if (alpha > 15) {
      stroke(hue, 50, 95, alpha * 0.6);
      strokeWeight(0.5);
      line(x - sparkleSize * 2, y, x + sparkleSize * 2, y);
      line(x, y - sparkleSize * 2, x, y + sparkleSize * 2);
      noStroke();
    }
  }
  
  // Distant floating orbs for depth with autumn tones (reduced for performance)
  for (let i = 0; i < 4; i++) {
    let x = noise(time * 0.05 + i * 0.4) * width * 1.3 - width * 0.15;
    let y = noise(time * 0.04 + i * 0.4 + 500) * height * 1.2 - height * 0.1;
    let alpha = map(sin(time * 1.2 + i), -1, 1, 2, 8);
    let orbSize = map(sin(time * 0.8 + i * 0.7), -1, 1, 8, 15);
    let hue = [30, 20, 40, 15, 35, 25, 45, 10][i]; // Autumn orb colors
    
    // Soft glowing autumn orbs
    for (let layer = 0; layer < 3; layer++) {
      let layerAlpha = alpha * (1 - layer * 0.3);
      let layerSize = orbSize * (1 + layer * 0.3);
      fill(hue, 45, 80, layerAlpha);
      ellipse(x, y, layerSize);
    }
  }
}

function drawAutumnAtmosphere() {
  // This function is now replaced by drawAutumnEnhancedAtmosphere
  // Keeping for compatibility but it's called from drawAutumnBackground
}

class DynamicBranch {
  constructor(startX, startY, direction, isSubBranch = false) {
    this.startX = startX;
    this.startY = startY;
    this.direction = direction; // Initial direction in radians
    this.length = 0;
    this.maxLength = isSubBranch ? random(80, 150) : random(200, 400); // Sub-branches are shorter
    this.growth = 0;
    this.points = [];
    this.age = 0;
    this.maxAge = 1800; // Even longer lifespan - branches remain after leaves fade
    this.fadeStartAge = 1600; // Start fading at this age
    this.fadeDuration = 200; // Fade over this many frames
    this.leafSpots = [];
    this.color = { h: random(15, 35), s: random(60, 85), b: random(25, 50) }; // Richer brown tones
    this.baseThickness = isSubBranch ? random(1, 3) : random(3, 6); // Sub-branches are thinner
    this.isSubBranch = isSubBranch;
    this.subBranches = []; // Array to store sub-branches
    this.branchSpots = []; // Positions where sub-branches will grow
    this.branchesCreated = 0;
    this.maxSubBranches = isSubBranch ? 0 : random(2, 4); // Main branches can have 2-4 sub-branches
    
    // Create positions along the branch for leaves only
    let totalSpots = int(random(5, 10)); // More leaves for taller trees
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
    
    // Create leaf spots for all positions
    for (let i = 0; i < allPositions.length; i++) {
      this.leafSpots.push({
        t: allPositions[i],
        created: false,
        age: random(20, 60), // Leaves appear earlier
        side: random() < 0.5 ? -1 : 1, // Which side of branch to grow on
        leaf: null
      });
    }
    
    // Create branch spots for sub-branches (only for main branches)
    if (!isSubBranch && this.maxSubBranches > 0) {
      for (let i = 0; i < this.maxSubBranches; i++) {
        let t = random(0.3, 0.8); // Sub-branches grow from middle to upper portion
        this.branchSpots.push({
          t: t,
          created: false,
          age: random(40, 80), // Branches appear after some growth
          side: random() < 0.5 ? -1 : 1, // Which side of branch to grow on
          angle: random(-PI/3, PI/3) // Random angle for natural branching
        });
      }
    }
  }
  
  update() {
    this.age++;
    
    // Grow the branch slower and smoother
    if (this.length < this.maxLength) {
      // Smooth easing growth - starts faster, slows down
      let progress = this.length / this.maxLength;
      let easing = 1 - (progress * progress); // Quadratic ease-out
      this.length += 1.8 * easing; // Faster growth for taller trees
      this.updateCurve();
    }
    
    // Create sub-branches at designated spots
    for (let spot of this.branchSpots) {
      if (!spot.created && this.age > spot.age && this.length > this.maxLength * spot.t) {
        let pos = this.getPointAt(spot.t);
        let branchAngle = this.getBranchAngle();
        let newDirection = branchAngle + spot.angle * spot.side;
        
        let newSubBranch = new DynamicBranch(pos.x, pos.y, newDirection, true);
        // Inherit fade timing from parent branch
        newSubBranch.fadeStartAge = this.fadeStartAge;
        newSubBranch.fadeDuration = this.fadeDuration;
        this.subBranches.push(newSubBranch);
        spot.created = true;
        this.branchesCreated++;
      }
    }
    
    // Update sub-branches
    for (let i = this.subBranches.length - 1; i >= 0; i--) {
      this.subBranches[i].update();
      
      // Remove dead sub-branches
      if (this.subBranches[i].isComplete()) {
        this.subBranches.splice(i, 1);
      }
    }
    
    // Create leaves at designated spots
    for (let spot of this.leafSpots) {
      if (!spot.created && this.age > spot.age && this.length > this.maxLength * spot.t) {
        let pos = this.getPointAt(spot.t);
        let newLeaf = new AutumnLeaf(pos.x, pos.y, this, spot.t, spot.side);
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
      
      // Straight upward growth with minimal curvature
      let gravityBend = -progress * progress * 0.1; // Minimal upward curve for straighter growth
      
      // Very subtle organic variation
      let naturalVariation = sin(progress * PI * 2) * 0.05 * progress;
      
      // Minimal environmental sway (wind effect)
      let environmentalSway = sin(time * 0.2 + this.startX * 0.01) * 0.02 * progress;
      
      let angle = this.direction + gravityBend + naturalVariation + environmentalSway;
      
      // Ensure the branch grows more vertically
      if (this.direction === -PI/2) { // If growing straight up
        angle = -PI/2 + naturalVariation + environmentalSway; // Keep it mostly vertical
      }
      
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
  
  getBranchAngle() {
    if (this.points.length < 2) return 0;
    
    let index = max(0, this.points.length - 2);
    let p1 = this.points[index];
    let p2 = this.points[index + 1];
    
    return atan2(p2.y - p1.y, p2.x - p1.x);
  }
  
  getAlpha() {
    if (this.age < this.fadeStartAge) {
      return 100; // Full opacity before fade starts
    } else {
      let fadeProgress = (this.age - this.fadeStartAge) / this.fadeDuration;
      fadeProgress = constrain(fadeProgress, 0, 1);
      return 100 * (1 - fadeProgress); // Fade from 100 to 0
    }
  }
  
  display() {
    if (this.points.length < 2) return;
    
    // Draw natural branch with tapering thickness
    this.drawNaturalBranch();
    
    // Add bark texture and organic details
    this.drawBarkTexture();
    
    // Draw sub-branches
    for (let subBranch of this.subBranches) {
      subBranch.display();
    }
  }
  
  drawNaturalBranch() {
    // Get current alpha for fading
    let currentAlpha = this.getAlpha();
    
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
        let baseAlpha = 80 - layer * 15;
        let finalAlpha = min(baseAlpha, currentAlpha); // Use the smaller of base alpha or fade alpha
        let brightness = this.color.b + layer * 8;
        
        stroke(this.color.h, this.color.s, brightness, finalAlpha);
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

// AutumnBlossom class removed - only leaves now

// FallingPetal class removed - no more blossoms

class AutumnLeaf {
  constructor(x, y, parentBranch = null, branchPosition = 0, side = 1) {
    this.x = x;
    this.y = y;
    this.parentBranch = parentBranch;
    this.branchPosition = branchPosition;
    this.side = side; // -1 for left, 1 for right
    // Autumn leaf colors - vibrant reds, oranges, and yellows
    this.color = { h: random(10, 60), s: random(60, 90), b: random(50, 80) };
    this.size = 0;
    this.maxSize = random(24, 40);
    this.age = 0;
    this.maxAge = random(400, 600); // Much shorter lifespan - leaves fade first
    this.rotation = random(-PI/6, PI/6);
    this.growthStage = 'growing';
    this.stemLength = random(8, 16);
    this.stemAngle = (PI/2 + random(-PI/4, PI/4)) * this.side; // Perpendicular to branch
    this.leafImageIndex = int(random(4)); // Select leaf image once at creation
    this.hasFallen = false; // Track if leaf has already fallen
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
    
    // Growth stages - leaves start changing colors earlier in autumn
    if (this.age < 60) {
      this.growthStage = 'growing';
      this.size = map(this.age, 0, 60, 0, this.maxSize);
    } else if (this.age < this.maxAge * 0.3) { // Much earlier transition to mature
      this.growthStage = 'mature';
    } else {
      this.growthStage = 'aging';
      // Gradually change color to deeper autumn colors
      let ageProgress = (this.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
      this.color.h = lerp(this.color.h, random(5, 25), ageProgress * 0.7); // Shift to deep reds
      this.color.s = lerp(this.color.s, random(70, 95), ageProgress * 0.5);
      this.color.b = lerp(this.color.b, random(40, 65), ageProgress * 0.3);
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
    return this.growthStage === 'aging' && this.age > this.maxAge * 0.5 && !this.hasFallen; // Fall much earlier, only once
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
    
    // Draw autumn leaf
    this.drawAutumnLeaf();
    
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
  
  drawAutumnLeaf() {
    let alpha = this.growthStage === 'aging' ? 70 : 90;
    
    // Apply transparency to the leaf image
    tint(255, alpha);
    
    // Draw the leaf image using the stored index
    imageMode(CENTER);
    image(leafImages[this.leafImageIndex], 0, 0, this.size, this.size);
    
    // Reset tint
    noTint();
  }
  
  drawLeafShape(scale = 1) {
    // Draw simplified oval leaf shape (optimized for performance)
    let leafWidth = this.size * 0.6 * scale;
    let leafHeight = this.size * scale;
    
    // Create simplified pointed oval leaf shape with fewer vertices
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.3) { // Reduced from 0.1 to 0.3 for fewer vertices
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
  constructor(x, y, color, leafImageIndex = null, size = null) {
    this.x = x;
    this.y = y;
    this.vx = random(-1.2, 1.2); // More horizontal drift
    this.vy = random(0.2, 0.8); // Slower initial fall
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.12, 0.12); // More rotation
    this.size = size || random(3, 8); // Use provided size or random
    this.color = color;
    this.life = 255;
    this.gravity = 0.025; // Stronger gravity for more realistic fall
    this.swayAmount = random(0.5, 1.2); // More swaying
    this.leafImageIndex = leafImageIndex !== null ? leafImageIndex : int(random(4)); // Use provided image or random
  }
  
  update() {
    // Physics
    this.vy += this.gravity;
    this.vx *= 0.99; // Less air resistance for more natural movement
    this.x += this.vx + sin(time * 0.5 + this.y * 0.01) * this.swayAmount; // More gentle wind effect
    this.y += this.vy;
    
    this.rotation += this.rotationSpeed;
    this.life -= 0.4; // Slightly faster fade for falling leaves
  }
  
  isDead() {
    return this.life <= 0 || this.y > height + 50;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    
    let alpha = map(this.life, 0, 255, 0, 80);
    
    // Apply transparency to the leaf image
    tint(255, alpha);
    
    // Draw the falling leaf image using the stored index
    imageMode(CENTER);
    image(leafImages[this.leafImageIndex], 0, 0, this.size, this.size);
    
    // Reset tint
    noTint();
    
    pop();
  }
}

class UpwardFlyingLeaf {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = random(-1.5, 1.5); // Horizontal drift
    this.vy = random(-3, -1); // Upward velocity (negative Y)
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.1, 0.1);
    this.size = random(3, 8);
    this.color = color;
    this.life = 200; // Shorter life for upward flying leaves
    this.gravity = -0.01; // Negative gravity (upward force)
    this.swayAmount = random(0.5, 1.0);
    this.initialY = y; // Track starting position
    this.leafImageIndex = int(random(4)); // Select leaf image once at creation
  }
  
  update() {
    // Physics - upward movement with some drift
    this.vy += this.gravity; // Gravity pulls upward
    this.vx *= 0.98; // Air resistance
    this.x += this.vx + sin(time + this.y * 0.01) * this.swayAmount; // Gentle horizontal drift
    this.y += this.vy;
    
    this.rotation += this.rotationSpeed;
    this.life -= 1.5; // Faster fade for upward leaves
    
    // Add some upward spiraling motion
    this.x += sin(time * 2 + this.initialY * 0.01) * 0.3;
  }
  
  isDead() {
    return this.life <= 0 || this.y < -50; // Dead when above screen or life runs out
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    
    let alpha = map(this.life, 0, 200, 0, 80);
    
    // Apply transparency to the leaf image
    tint(255, alpha);
    
    // Draw the upward-flying leaf image using the stored index
    imageMode(CENTER);
    image(leafImages[this.leafImageIndex], 0, 0, this.size, this.size);
    
    // Reset tint
    noTint();
    
    pop();
  }
}

class RandomFallingLeafImage {
  constructor(x, y, leafIndex) {
    this.x = x;
    this.y = y;
    this.vx = random(-1.5, 1.5);
    this.vy = random(0.8, 2.2);
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.15, 0.15);
    this.leafIndex = int(leafIndex);
    this.size = random(15, 35); // Smaller size for the leaf images
    this.life = 255;
    this.gravity = 0.02;
    this.swayAmount = random(0.5, 1.2);
    this.alpha = random(180, 255);
  }
  
  update() {
    // Physics
    this.vy += this.gravity;
    this.vx *= 0.98; // Air resistance
    this.x += this.vx + sin(time + this.y * 0.008) * this.swayAmount; // Gentle drift
    this.y += this.vy;
    
    this.rotation += this.rotationSpeed;
    this.life -= 0.2; // Even slower fade for leaf images to keep more on screen
  }
  
  isDead() {
    return this.life <= 0 || this.y > height + 100;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    
    let alpha = map(this.life, 0, 255, 0, this.alpha);
    
    // Apply transparency to the leaf image
    tint(255, alpha);
    
    // Draw the leaf image
    imageMode(CENTER);
    image(leafImages[this.leafIndex], 0, 0, this.size, this.size);
    
    // Reset tint
    noTint();
    
    pop();
  }
}

function changeTitleToBrown() {
  // Change title color to brown (dying leaf color)
  let titleElement = document.querySelector('.title');
  if (titleElement) {
    titleElement.style.color = '#8B4513'; // Saddle brown - dying leaf color
    titleElement.style.transition = 'color 1.5s ease-in-out'; // Smooth transition
  }
}

function changeTitleToGreen() {
  // Change title color back to original green
  let titleElement = document.querySelector('.title');
  if (titleElement) {
    titleElement.style.color = '#51B184'; // Original green color
    titleElement.style.transition = 'color 1.5s ease-in-out'; // Smooth transition
  }
}

function mousePressed() {
  // Create a new tree from the bottom of the page
  createFlowerFromBottom();
  
  // Reduced chance for additional trees to prevent clustering
  if (random() < 0.15) { // 15% chance to create an additional tree (reduced from 30%)
    createFlowerFromBottom();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
