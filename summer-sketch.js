// The Summer - Vibrancy & Energy
// A visualization of peak vitality, abundance, and vibrant life

let sunflowers = [];
let floatingParticles = [];
let leaves = [];
let branches = [];
let time = 0;
let flowerImage;
let startTime;
let titleColorChanged = false;

// Summer color palette
const summerColors = {
  orange: { h: 30, s: 85, b: 95 },
  yellow: { h: 50, s: 90, b: 95 },
  pink: { h: 340, s: 70, b: 90 },
  coral: { h: 15, s: 80, b: 90 },
  lime: { h: 80, s: 85, b: 85 },
  sky: { h: 200, s: 60, b: 95 }
};

function preload() {
  flowerImage = loadImage('sunflower.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  
  // Set canvas z-index to be behind text
  canvas.style.position = 'absolute';
  canvas.style.zIndex = '1';
  
  // Record start time for title color change
  startTime = millis();
  
  // No initial elements - flowers only grow on click
  
  // Create floating particles for atmosphere
  for (let i = 0; i < 20; i++) {
    floatingParticles.push(new FloatingParticle());
  }
}

function draw() {
  // Summer background with warm, vibrant colors
  drawSummerBackground();
  
  // Check if 5 seconds have passed and change title color
  if (!titleColorChanged && millis() - startTime > 5000) {
    changeTitleToSummerGlow();
    titleColorChanged = true;
  }
  
  time += 0.01;
  
  // Draw and update summer branches
  for (let i = branches.length - 1; i >= 0; i--) {
    branches[i].update();
    branches[i].display();
    
    // Remove finished branches
    if (branches[i].isComplete()) {
      branches.splice(i, 1);
    }
  }
  
  // Draw and update sunflowers
  for (let i = sunflowers.length - 1; i >= 0; i--) {
    sunflowers[i].update();
    sunflowers[i].display();
    
    if (sunflowers[i].isDead()) {
      sunflowers.splice(i, 1);
    }
  }
  
  // Draw and update floating particles
  for (let i = floatingParticles.length - 1; i >= 0; i--) {
    floatingParticles[i].update();
    floatingParticles[i].display();
  }
  
  // Draw and update leaves
  for (let i = leaves.length - 1; i >= 0; i--) {
    leaves[i].update();
    leaves[i].display();
    
    if (leaves[i].isDead()) {
      leaves.splice(i, 1);
    }
  }
}

function createSunflower() {
  let newSunflower = new Sunflower(mouseX, mouseY);
  sunflowers.push(newSunflower);
}

function drawSummerBackground() {
  // Warm summer background
  background('#FFE2BE');
  
  // Draw animated summer-colored circles
  drawSummerFloatingCircles();
}

function drawSummerFloatingCircles() {
  noStroke();
  
  // Create floating vibrant summer circles - all yellow
  let circles = [
    // Large circles - all yellow variations
    { x: 0.2, y: 0.3, size: 0.4, intensity: 0.8, speed: 0.08, hue: 50 }, // Yellow
    { x: 0.8, y: 0.2, size: 0.35, intensity: 0.7, speed: 0.1, hue: 50 }, // Yellow
    { x: 0.1, y: 0.7, size: 0.3, intensity: 0.6, speed: 0.12, hue: 50 }, // Yellow
    
    // Medium circles - all yellow variations
    { x: 0.6, y: 0.6, size: 0.25, intensity: 0.5, speed: 0.15, hue: 50 }, // Yellow
    { x: 0.9, y: 0.8, size: 0.2, intensity: 0.4, speed: 0.09, hue: 50 }, // Yellow
    { x: 0.4, y: 0.1, size: 0.18, intensity: 0.6, speed: 0.13, hue: 50 }, // Yellow
    
    // Small circles - all yellow variations
    { x: 0.7, y: 0.4, size: 0.15, intensity: 0.4, speed: 0.11, hue: 50 },
    { x: 0.3, y: 0.9, size: 0.12, intensity: 0.3, speed: 0.14, hue: 50 },
    { x: 0.5, y: 0.5, size: 0.1, intensity: 0.3, speed: 0.16, hue: 50 }
  ];
  
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    
    // Add gentle movement
    let moveX = sin(time * circle.speed + i * 1.2) * 40;
    let moveY = cos(time * (circle.speed * 0.8) + i * 1.5) * 30;
    
    let x = circle.x * width + moveX;
    let y = circle.y * height + moveY;
    let size = circle.size * min(width, height);
    
    // Flicker between yellow and orange
    let flickerSpeed = 0.3 + i * 0.1; // Different speeds for each circle
    let flickerValue = sin(time * flickerSpeed + i * 0.5);
    let currentHue = map(flickerValue, -1, 1, 30, 50); // Orange (30) to Yellow (50)
    
    // Create gradient effect
    let layers = 8;
    for (let layer = 0; layer < layers; layer++) {
      let layerProgress = layer / layers;
      let layerSize = size * (1 - layerProgress * 0.5);
      let layerAlpha = circle.intensity * 25 * (1 - layerProgress * layerProgress);
      
      fill(currentHue, 70, 90, layerAlpha);
      ellipse(x, y, layerSize);
    }
  }
}

function drawSummerEnhancedAtmosphere() {
  // Sparkling summer particles
  for (let i = 0; i < 12; i++) {
    let x = noise(time * 0.4 + i * 0.1) * width;
    let y = noise(time * 0.3 + i * 0.1 + 100) * height;
    let alpha = map(sin(time * 3 + i), -1, 1, 10, 30);
    let size = map(sin(time * 2 + i * 0.5), -1, 1, 2, 5);
    let hue = [30, 50, 340, 15, 80, 200][i % 6];
    
    fill(hue, 80, 95, alpha);
    noStroke();
    ellipse(x, y, size);
  }
  
  // Warm light effects
  for (let i = 0; i < 8; i++) {
    let x = noise(time * 0.2 + i * 0.3) * width;
    let y = noise(time * 0.15 + i * 0.3 + 200) * height;
    let alpha = map(sin(time * 2.5 + i * 0.8), -1, 1, 0, 40);
    let sparkleSize = map(sin(time * 4 + i * 0.6), -1, 1, 1, 3);
    let hue = [30, 50, 340, 15, 80, 200, 25, 45][i % 8];
    
    fill(hue, 70, 95, alpha);
    noStroke();
    ellipse(x, y, sparkleSize);
    
    // Add cross sparkle effect
    if (alpha > 20) {
      stroke(hue, 60, 98, alpha * 0.7);
      strokeWeight(0.8);
      line(x - sparkleSize * 3, y, x + sparkleSize * 3, y);
      line(x, y - sparkleSize * 3, x, y + sparkleSize * 3);
      noStroke();
    }
  }
}


class FloatingParticle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-0.5, 0.5);
    this.vy = random(-0.5, 0.5);
    this.size = random(2, 6);
    this.color = summerColors[Object.keys(summerColors)[int(random(Object.keys(summerColors).length))]];
    this.alpha = random(20, 60);
    this.life = random(1000, 3000);
    this.maxLife = this.life;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    // Gentle floating movement
    this.vx += sin(time * 0.2 + this.x * 0.01) * 0.005;
    this.vy += cos(time * 0.15 + this.y * 0.01) * 0.005;
    
    // Apply damping
    this.vx *= 0.999;
    this.vy *= 0.999;
    
    // Wrap around screen
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
    
    this.life--;
    this.alpha = map(this.life, 0, this.maxLife, 0, 60);
  }
  
  display() {
    if (this.alpha <= 0) return;
    
    fill(this.color.h, this.color.s, this.color.b, this.alpha);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

function changeTitleToSummerGlow() {
  let titleElement = document.querySelector('.title');
  if (titleElement) {
    titleElement.style.color = '#FF9E26';
    titleElement.style.transition = 'color 2s ease-in-out';
    titleElement.style.textShadow = '0 0 20px rgba(255, 158, 38, 0.5)';
  }
}

function mousePressed() {
  // Create only branch with sunflowers
  createSummerBranch(mouseX, mouseY);
  
  // Small chance for additional branch
  if (random() < 0.3) {
    createSummerBranch(mouseX + random(-40, 40), mouseY + random(-30, 30));
  }
}

function createSummerBranch(clickX, clickY) {
  let direction = -PI/2; // Grow upward
  let newBranch = new SummerBranch(clickX, clickY, direction);
  branches.push(newBranch);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Sunflower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 0;
    this.maxSize = random(40, 80);
    this.age = 0;
    this.maxAge = 300; // 5 seconds at 60fps
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.02, 0.02);
    this.growthStage = 'growing';
    this.leavesCreated = false;
  }
  
  update() {
    this.age++;
    
    // Growth stages
    if (this.age < 60) {
      this.growthStage = 'growing';
      this.size = map(this.age, 0, 60, 0, this.maxSize);
    } else if (this.age < this.maxAge * 0.8) {
      this.growthStage = 'blooming';
    } else {
      this.growthStage = 'fading';
      let fadeProgress = (this.age - this.maxAge * 0.8) / (this.maxAge * 0.2);
      this.size = this.maxSize * (1 - fadeProgress * 0.3);
    }
    
    // Gentle rotation
    this.rotation += this.rotationSpeed;
  }
  
  isDead() {
    if (this.age > this.maxAge && !this.leavesCreated) {
      this.createLeaves();
      this.leavesCreated = true;
    }
    return this.age > this.maxAge;
  }
  
  createLeaves() {
    // Create 3-5 leaves around the sunflower position
    let numLeaves = int(random(3, 6));
    for (let i = 0; i < numLeaves; i++) {
      let angle = random(TWO_PI);
      let distance = random(20, 40);
      let leafX = this.x + cos(angle) * distance;
      let leafY = this.y + sin(angle) * distance;
      let newLeaf = new SummerLeaf(leafX, leafY);
      leaves.push(newLeaf);
    }
  }
  
  display() {
    if (this.size <= 0) return;
    
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    
    // Draw sunflower using the image
    let alpha = this.growthStage === 'fading' ? 60 : 95;
    tint(255, alpha);
    imageMode(CENTER);
    image(flowerImage, 0, 0, this.size, this.size);
    noTint();
    
    pop();
  }
}

class SummerLeaf {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(15, 25);
    this.age = 0;
    this.maxAge = random(1800, 3600); // 30-60 seconds
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.01, 0.01);
    this.growthStage = 'growing';
    this.vx = random(-0.5, 0.5);
    this.vy = random(-0.5, 0.5);
    this.color = { h: random(80, 120), s: random(60, 90), b: random(70, 90) }; // Green variations
  }
  
  update() {
    this.age++;
    
    // Gentle floating movement
    this.x += this.vx;
    this.y += this.vy;
    
    // Add slight wind effect
    this.vx += sin(time * 0.3 + this.x * 0.01) * 0.002;
    this.vy += cos(time * 0.2 + this.y * 0.01) * 0.002;
    
    // Apply damping
    this.vx *= 0.999;
    this.vy *= 0.999;
    
    // Growth stages
    if (this.age < 30) {
      this.growthStage = 'growing';
      this.size = map(this.age, 0, 30, 0, this.size);
    } else if (this.age < this.maxAge * 0.8) {
      this.growthStage = 'mature';
    } else {
      this.growthStage = 'fading';
      let fadeProgress = (this.age - this.maxAge * 0.8) / (this.maxAge * 0.2);
      this.size = this.size * (1 - fadeProgress * 0.5);
    }
    
    // Gentle rotation
    this.rotation += this.rotationSpeed;
  }
  
  isDead() {
    return this.age > this.maxAge;
  }
  
  display() {
    if (this.size <= 0) return;
    
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    
    let alpha = this.growthStage === 'fading' ? 100 : 200;
    
    
    // Draw leaf shadow
    fill(this.color.h, this.color.s + 10, this.color.b - 20, alpha * 0.3);
    noStroke();
    this.drawLeafShape(1.1);
    
    // Draw main leaf
    fill(this.color.h, this.color.s, this.color.b, alpha);
    this.drawLeafShape(1.0);
    
    // Draw leaf highlight
    fill(this.color.h, max(this.color.s - 20, 0), min(this.color.b + 10, 100), alpha * 0.6);
    this.drawLeafShape(0.8);
    
    // Draw leaf vein
    stroke(this.color.h, min(this.color.s + 15, 100), max(this.color.b - 15, 0), alpha * 0.4);
    strokeWeight(0.5);
    line(0, -this.size * 0.3, 0, this.size * 0.3);
    noStroke();
    
    pop();
  }
  
  drawLeafShape(scale = 1) {
    // Draw simple oval leaf shape
    let leafWidth = this.size * 0.6 * scale;
    let leafHeight = this.size * scale;
    
    // Create pointed oval leaf shape
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let r = leafHeight * 0.4;
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

class SummerBranch {
  constructor(startX, startY, direction, isSubBranch = false) {
    this.startX = startX;
    this.startY = startY;
    this.direction = direction;
    this.length = 0;
    this.maxLength = isSubBranch ? random(100, 200) : random(200, 350);
    this.age = 0;
    this.maxAge = 2500;
    this.points = [];
    this.color = { h: random(80, 120), s: random(50, 80), b: random(40, 70) }; // Green branch colors
    this.baseThickness = isSubBranch ? random(2, 4) : random(4, 8);
    this.fadeStartAge = 2200;
    this.fadeDuration = 300;
    this.isSubBranch = isSubBranch;
    this.subBranches = [];
    this.branchSpots = [];
    this.branchesCreated = 0;
    this.maxSubBranches = isSubBranch ? 0 : random(1, 2);
    this.sunflowerSpots = [];
    
    // Create positions for sunflowers (reduced to 25% of original)
    let totalSunflowerSpots = int(random(1, 2));
    for (let i = 0; i < totalSunflowerSpots; i++) {
      let t = random(0.3, 0.9);
      this.sunflowerSpots.push({
        t: t,
        created: false,
        age: random(40, 100),
        maxAge: random(800, 1200), // Lifespan like spring blossoms
        size: random(25, 45),
        maxSize: random(25, 45),
        rotation: random(TWO_PI),
        rotationSpeed: random(-0.01, 0.01),
        fadeStartAge: 0, // Will be set when created
        hasFaded: false
      });
    }
    
    // Create branch spots for sub-branches (only for main branches)
    if (!isSubBranch && this.maxSubBranches > 0) {
      let usedPositions = [];
      let minDistance = 0.25;
      
      for (let i = 0; i < this.maxSubBranches; i++) {
        let attempts = 0;
        let t;
        let validPosition = false;
        
        while (!validPosition && attempts < 10) {
          t = random(0.4, 0.8);
          validPosition = true;
          
          for (let usedT of usedPositions) {
            if (abs(t - usedT) < minDistance) {
              validPosition = false;
              break;
            }
          }
          attempts++;
        }
        
        if (!validPosition) {
          t = random(0.4, 0.8);
        }
        
        usedPositions.push(t);
        
        this.branchSpots.push({
          t: t,
          created: false,
          age: random(50, 100),
          side: random() < 0.5 ? -1 : 1,
          angle: random(-PI/4, PI/4)
        });
      }
    }
  }
  
  update() {
    this.age++;
    
    // Grow the branch
    if (this.length < this.maxLength) {
      let progress = this.length / this.maxLength;
      let easing = 1 - (progress * progress);
      this.length += 2.0 * easing;
      this.updateCurve();
    }
    
    // Create sub-branches at designated spots
    for (let spot of this.branchSpots) {
      if (!spot.created && this.age > spot.age && this.length > this.maxLength * spot.t) {
        let pos = this.getPointAt(spot.t);
        let branchAngle = this.getBranchAngle();
        let newDirection = branchAngle + spot.angle * spot.side;
        
        let newSubBranch = new SummerBranch(pos.x, pos.y, newDirection, true);
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
      
      if (this.subBranches[i].isComplete()) {
        this.subBranches.splice(i, 1);
      }
    }
    
    // Create sunflowers at designated spots
    for (let spot of this.sunflowerSpots) {
      if (!spot.created && this.age > spot.age && this.length > this.maxLength * spot.t) {
        spot.created = true;
        spot.fadeStartAge = spot.maxAge * 0.8; // Start fading at 80% of lifespan
      }
      
      // Update sunflower aging and rotation
      if (spot.created) {
        spot.age++;
        spot.rotation += spot.rotationSpeed;
        
        // Handle fading
        if (spot.age > spot.fadeStartAge && !spot.hasFaded) {
          let fadeProgress = (spot.age - spot.fadeStartAge) / (spot.maxAge - spot.fadeStartAge);
          spot.size = spot.maxSize * (1 - fadeProgress);
          
          if (spot.age >= spot.maxAge) {
            spot.hasFaded = true;
          }
        }
      }
    }
  }
  
  updateCurve() {
    this.points = [];
    let segments = max(int(this.length / 3), 5);
    
    for (let i = 0; i <= segments; i++) {
      let t = i / segments;
      let progress = (t * this.length) / this.maxLength;
      
      // Gentle upward curve with summer sway
      let gravityBend = -progress * progress * 0.15;
      let naturalVariation = sin(progress * PI * 2) * 0.05 * progress;
      let summerSway = sin(time * 0.15 + this.startX * 0.01) * 0.02 * progress;
      
      let angle = this.direction + gravityBend + naturalVariation + summerSway;
      let distance = t * this.length;
      let thickness = map(progress, 0, 1, this.baseThickness, this.baseThickness * 0.3);
      
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
      return 100;
    } else {
      let fadeProgress = (this.age - this.fadeStartAge) / this.fadeDuration;
      fadeProgress = constrain(fadeProgress, 0, 1);
      return 100 * (1 - fadeProgress);
    }
  }
  
  display() {
    if (this.points.length < 2) return;
    
    // Draw branch
    this.drawBranch();
    
    // Draw sunflowers
    this.drawSunflowers();
    
    // Draw sub-branches
    for (let subBranch of this.subBranches) {
      subBranch.display();
    }
  }
  
  drawBranch() {
    let currentAlpha = this.getAlpha();
    
    for (let i = 0; i < this.points.length - 1; i++) {
      let p1 = this.points[i];
      let p2 = this.points[i + 1];
      
      let thickness1 = p1.thickness;
      let thickness2 = p2.thickness;
      
      for (let layer = 0; layer < 3; layer++) {
        let layerThickness1 = thickness1 * (1 - layer * 0.25);
        let layerThickness2 = thickness2 * (1 - layer * 0.25);
        let baseAlpha = 80 - layer * 15;
        let finalAlpha = min(baseAlpha, currentAlpha);
        let brightness = this.color.b + layer * 8;
        
        stroke(this.color.h, this.color.s, brightness, finalAlpha);
        strokeWeight(max(layerThickness1 + layerThickness2) / 2);
        line(p1.x, p1.y, p2.x, p2.y);
      }
    }
  }
  
  drawSunflowers() {
    let currentAlpha = this.getAlpha();
    
    for (let spot of this.sunflowerSpots) {
      if (spot.created && !spot.hasFaded && spot.size > 0) {
        let pos = this.getPointAt(spot.t);
        let alpha = map(currentAlpha, 0, 100, 0, 200);
        
        push();
        translate(pos.x, pos.y);
        rotate(spot.rotation);
        
        // Draw sunflower using the image
        tint(255, alpha);
        imageMode(CENTER);
        image(flowerImage, 0, 0, spot.size, spot.size);
        noTint();
        
        pop();
      }
    }
  }
  
  isComplete() {
    return this.age > this.maxAge;
  }
}
