// The Winter - Stillness & Contemplation
// A visualization of quiet reflection and inner growth

let time = 0;
let snowflakes = [];
let snowflakeImage;
let whiteSnowflakeImage;
let branches = [];
let startTime;
let winterTransformationComplete = false;
let transformationProgress = 0;
let originalBackgroundColor;
let targetBackgroundColor;
let returnToOriginalComplete = false;


// Colors (HSB mode) - now generated dynamically per branch/blossom

// Smooth step function for cleaner transitions
function smoothstep(edge0, edge1, x) {
  let t = constrain((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

function preload() {
  
  // Load both snowflake images
  snowflakeImage = loadImage('snowflakes.blue.png');
  whiteSnowflakeImage = loadImage('snowflakes.white.png');
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  
  // Record start time for winter transformation
  startTime = millis();
  
  // Set up color transition
  originalBackgroundColor = color('#F2EBEB');
  targetBackgroundColor = color('#506BC2');
  
  // Create initial falling snowflakes for immediate effect
  for (let i = 0; i < 40; i++) {
    let snowflake = new Snowflake(
      random(width), // Random x position across the screen
      random(-height, 0) // Start at various heights above and on screen
    );
    snowflakes.push(snowflake);
  }
}

function draw() {
  // Calculate smooth transformation progress
  let elapsedTime = millis() - startTime;
  if (elapsedTime > 5000) {
    if (!winterTransformationComplete) {
      winterTransformationComplete = true;
      applyWinterTransformation();
    }
    // Continue smooth transition for 4 more seconds
    let transitionDuration = 4000; // 4 seconds for smoother transition
    let transitionStart = 5000;
    if (elapsedTime > transitionStart) {
      transformationProgress = min((elapsedTime - transitionStart) / transitionDuration, 1.0);
    }
  }
  
  // Return to original colors after 13 seconds total (5 + 4 + 4) for smoother transition
  if (elapsedTime > 13000) {
    if (!returnToOriginalComplete) {
      returnToOriginalComplete = true;
      returnToOriginalColors();
    }
  }
  
  // Enhanced background with winter gradient and atmospheric effects
  drawWinterBackground();
  
  time += 0.01;
  
  // Draw and update winter branches
  for (let i = branches.length - 1; i >= 0; i--) {
    branches[i].update();
    branches[i].display();
    
    // Remove finished branches
    if (branches[i].isComplete()) {
      branches.splice(i, 1);
    }
  }
  
  
  // Create snowflakes
  if (random() < 0.15) { // 15% chance each frame to create a new snowflake (almost double)
    createSnowflake();
  }
  
  // Gradually switch snowflake image during transformation
  if (winterTransformationComplete && transformationProgress > 0.3 && !returnToOriginalComplete) {
    // Use white snowflakes for new snowflakes during transformation
    // The actual switching happens in the Snowflake display method
  }
  
  // Draw and update snowflakes
  for (let i = snowflakes.length - 1; i >= 0; i--) {
    snowflakes[i].update();
    snowflakes[i].display();
    
    if (snowflakes[i].isDead()) {
      snowflakes.splice(i, 1);
    }
  }
  
  
  // Add subtle floating particles for winter atmosphere
  drawWinterAtmosphere();
}



function createSnowflake() {
  let snowflake = new Snowflake(
    random(width), // Random x position across the screen
    -20 // Start above the screen
  );
  snowflakes.push(snowflake);
}

function drawWinterBackground() {
  // Smooth background color transition without intermediate colors
  if (winterTransformationComplete && !returnToOriginalComplete) {
    // Use smooth step function for cleaner transition
    let smoothProgress = smoothstep(0, 1, transformationProgress);
    if (smoothProgress < 0.5) {
      background(originalBackgroundColor);
    } else {
      background(targetBackgroundColor);
    }
  } else if (returnToOriginalComplete) {
    // Smooth return to original background color
    let returnProgress = min((millis() - startTime - 13000) / 4000, 1.0); // 4-second return transition
    let smoothReturnProgress = smoothstep(0, 1, returnProgress);
    if (smoothReturnProgress < 0.5) {
      background(targetBackgroundColor);
    } else {
      background(originalBackgroundColor);
    }
  } else {
    background('#F2EBEB'); // Light pinkish-gray background initially
  }
  
  // Draw animated winter-colored circles
  drawWinterFloatingCircles();
  
  // Enhanced atmospheric effects
  drawWinterEnhancedAtmosphere();
  
  // Add smooth transition overlay during transformation
  if (winterTransformationComplete && transformationProgress < 1.0 && !returnToOriginalComplete) {
    drawTransitionOverlay();
  }
}

function drawWinterFloatingCircles() {
  noStroke();
  
  // Create floating winter circles with gradient effect
  let circles = [
    // Large circles - cool winter colors
    { x: 0.7, y: 0.4, size: 0.35, intensity: 0.9, speed: 0.1, hue: 210 }, // Blue
    { x: 0.15, y: 0.75, size: 0.28, intensity: 0.8, speed: 0.08, hue: 200 }, // Light blue
    { x: 0.85, y: 0.15, size: 0.25, intensity: 0.7, speed: 0.12, hue: 180 }, // Cyan
    
    // Medium circles - including purple accents
    { x: 0.4, y: 0.25, size: 0.18, intensity: 0.6, speed: 0.15, hue: 0 }, // White/Gray
    { x: 0.75, y: 0.8, size: 0.15, intensity: 0.5, speed: 0.09, hue: 230 }, // Purple-blue
    { x: 0.05, y: 0.3, size: 0.12, intensity: 0.4, speed: 0.13, hue: 190 }, // Light cyan
    
    // Small circles - more blue accents
    { x: 0.6, y: 0.85, size: 0.1, intensity: 0.4, speed: 0.11, hue: 220 }, // Blue-purple
    { x: 0.25, y: 0.05, size: 0.08, intensity: 0.3, speed: 0.14, hue: 0 }, // White
    { x: 0.9, y: 0.55, size: 0.06, intensity: 0.3, speed: 0.16, hue: 195 }, // Light blue
    
    // Additional winter circles
    { x: 0.3, y: 0.6, size: 0.14, intensity: 0.5, speed: 0.07, hue: 215 }, // Blue
    { x: 0.8, y: 0.35, size: 0.09, intensity: 0.4, speed: 0.13, hue: 185 } // Cyan
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
      let layerAlpha = circle.intensity * 15 * (1 - layerProgress * layerProgress);
      
      // Winter color with smooth falloff
      if (circle.hue === 0) {
        // White circles
        fill(0, 0, 95, layerAlpha);
      } else {
        fill(circle.hue, 30, 85, layerAlpha);
      }
      ellipse(x, y, layerSize);
    }
  }
  
  // Add some extra smaller floating circles for more atmosphere
  for (let i = 0; i < 6; i++) {
    let x = noise(time * 0.05 + i * 0.8) * width * 1.3 - width * 0.15;
    let y = noise(time * 0.04 + i * 0.9 + 100) * height * 1.3 - height * 0.15;
    let size = noise(time * 0.03 + i * 0.4 + 200) * 60 + 20;
    let alpha = map(sin(time * 0.6 + i * 0.7), -1, 1, 3, 10);
    let hue = [210, 200, 180, 0, 220, 190][i]; // Winter hues
    
    // Soft winter-colored circles with gradient
    for (let layer = 0; layer < 6; layer++) {
      let layerProgress = layer / 6;
      let layerSize = size * (1 + layerProgress * 0.4);
      let layerAlpha = alpha * (1 - layerProgress * 0.8);
      
      if (hue === 0) {
        fill(0, 0, 90, layerAlpha);
      } else {
        fill(hue, 25, 80, layerAlpha);
      }
      ellipse(x, y, layerSize);
    }
  }
}

function drawWinterEnhancedAtmosphere() {
  // Original gentle floating particles with winter colors
  for (let i = 0; i < 25; i++) {
    let x = noise(time * 0.3 + i * 0.1) * width;
    let y = noise(time * 0.2 + i * 0.1 + 100) * height;
    let alpha = map(sin(time * 2 + i), -1, 1, 5, 20);
    let size = map(sin(time * 1.5 + i * 0.5), -1, 1, 1, 3);
    let hue = [210, 200, 180, 0, 220][i % 5]; // Cycle through winter hues
    
    if (hue === 0) {
      fill(0, 0, 90, alpha);
    } else {
      fill(hue, 20, 85, alpha);
    }
    noStroke();
    ellipse(x, y, size);
  }
  
  // Add sparkling light effects with winter colors
  for (let i = 0; i < 12; i++) {
    let x = noise(time * 0.1 + i * 0.3) * width;
    let y = noise(time * 0.08 + i * 0.3 + 300) * height;
    let alpha = map(sin(time * 4 + i * 0.8), -1, 1, 0, 30);
    let sparkleSize = map(sin(time * 3 + i * 0.6), -1, 1, 0.5, 2);
    let hue = [210, 200, 180, 0, 220][i % 5]; // Winter sparkle colors
    
    // Cool sparkles
    if (hue === 0) {
      fill(0, 0, 95, alpha);
    } else {
      fill(hue, 30, 90, alpha);
    }
    noStroke();
    ellipse(x, y, sparkleSize);
    
    // Add cross sparkle effect
    if (alpha > 15) {
      if (hue === 0) {
        stroke(0, 0, 100, alpha * 0.6);
      } else {
        stroke(hue, 25, 95, alpha * 0.6);
      }
      strokeWeight(0.5);
      line(x - sparkleSize * 2, y, x + sparkleSize * 2, y);
      line(x, y - sparkleSize * 2, x, y + sparkleSize * 2);
      noStroke();
    }
  }
  
  // Distant floating orbs for depth with winter tones
  for (let i = 0; i < 8; i++) {
    let x = noise(time * 0.05 + i * 0.4) * width * 1.3 - width * 0.15;
    let y = noise(time * 0.04 + i * 0.4 + 500) * height * 1.2 - height * 0.1;
    let alpha = map(sin(time * 1.2 + i), -1, 1, 2, 8);
    let orbSize = map(sin(time * 0.8 + i * 0.7), -1, 1, 8, 15);
    let hue = [210, 200, 180, 0, 220, 190, 230, 195][i]; // Winter orb colors
    
    // Soft glowing winter orbs
    for (let layer = 0; layer < 3; layer++) {
      let layerAlpha = alpha * (1 - layer * 0.3);
      let layerSize = orbSize * (1 + layer * 0.3);
      
      if (hue === 0) {
        fill(0, 0, 85, layerAlpha);
      } else {
        fill(hue, 20, 80, layerAlpha);
      }
      ellipse(x, y, layerSize);
    }
  }
}

function drawWinterAtmosphere() {
  // This function is now replaced by drawWinterEnhancedAtmosphere
  // Keeping for compatibility but it's called from drawWinterBackground
}

class WinterBranch {
  constructor(startX, startY, direction, isSubBranch = false) {
    this.startX = startX;
    this.startY = startY;
    this.direction = direction;
    this.length = 0;
    this.maxLength = isSubBranch ? random(80, 150) : random(150, 300);
    this.age = 0;
    this.maxAge = 2000;
    this.points = [];
    this.color = { h: random(15, 35), s: random(40, 70), b: random(30, 60) }; // Brown branch colors
    this.baseThickness = isSubBranch ? random(1, 3) : random(2, 5);
    this.fadeStartAge = 300; // Start fading after 5 seconds (300 frames at 60fps)
    this.fadeDuration = 120; // Fade over 2 seconds
    this.isSubBranch = isSubBranch;
    this.subBranches = [];
    this.branchSpots = [];
    this.branchesCreated = 0;
    this.maxSubBranches = isSubBranch ? 0 : random(1, 2); // Reduced from 2-4 to 1-2
    this.snowflakeSpots = [];
    
    // Create positions for winter snowflakes (reduced amount)
    let totalSnowflakeSpots = int(random(1, 2));
    for (let i = 0; i < totalSnowflakeSpots; i++) {
      let t = random(0.2, 0.9);
      this.snowflakeSpots.push({
        t: t,
        created: false,
        age: random(30, 80),
        size: random(12, 25),
        isBlue: random() < 0.6, // 60% chance for blue snowflakes
        rotation: random(TWO_PI),
        rotationSpeed: random(-0.02, 0.02)
      });
    }
    
    // Create branch spots for sub-branches (only for main branches)
    if (!isSubBranch && this.maxSubBranches > 0) {
      let usedPositions = [];
      let minDistance = 0.2; // Minimum distance between branch positions
      
      for (let i = 0; i < this.maxSubBranches; i++) {
        let attempts = 0;
        let t;
        let validPosition = false;
        
        // Try to find a position that doesn't overlap with existing branches
        while (!validPosition && attempts < 10) {
          t = random(0.3, 0.8);
          validPosition = true;
          
          // Check distance from existing branch positions
          for (let usedT of usedPositions) {
            if (abs(t - usedT) < minDistance) {
              validPosition = false;
              break;
            }
          }
          attempts++;
        }
        
        // If we couldn't find a good position, use a random one
        if (!validPosition) {
          t = random(0.3, 0.8);
        }
        
        usedPositions.push(t);
        
        this.branchSpots.push({
          t: t,
          created: false,
          age: random(40, 80),
          side: random() < 0.5 ? -1 : 1,
          angle: random(-PI/4, PI/4) // Reduced angle range for less overlap
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
      this.length += 1.5 * easing;
      this.updateCurve();
    }
    
    // Create sub-branches at designated spots
    for (let spot of this.branchSpots) {
      if (!spot.created && this.age > spot.age && this.length > this.maxLength * spot.t) {
        let pos = this.getPointAt(spot.t);
        let branchAngle = this.getBranchAngle();
        let newDirection = branchAngle + spot.angle * spot.side;
        
        let newSubBranch = new WinterBranch(pos.x, pos.y, newDirection, true);
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
    
    // Create snowflakes at designated spots
    for (let spot of this.snowflakeSpots) {
      if (!spot.created && this.age > spot.age && this.length > this.maxLength * spot.t) {
        spot.created = true;
      }
      
      // Update snowflake rotation
      if (spot.created) {
        spot.rotation += spot.rotationSpeed;
      }
    }
  }
  
  updateCurve() {
    this.points = [];
    let segments = max(int(this.length / 3), 5);
    
    for (let i = 0; i <= segments; i++) {
      let t = i / segments;
      let progress = (t * this.length) / this.maxLength;
      
      // Gentle upward curve with winter sway
      let gravityBend = -progress * progress * 0.1;
      let naturalVariation = sin(progress * PI * 2) * 0.03 * progress;
      let winterSway = sin(time * 0.1 + this.startX * 0.01) * 0.01 * progress;
      
      let angle = this.direction + gravityBend + naturalVariation + winterSway;
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
    
    // Draw snowflakes
    this.drawSnowflakes();
    
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
  
  drawSnowflakes() {
    let currentAlpha = this.getAlpha();
    
    for (let spot of this.snowflakeSpots) {
      if (spot.created) {
        let pos = this.getPointAt(spot.t);
        let alpha = map(currentAlpha, 0, 100, 0, 150);
        
        push();
        translate(pos.x, pos.y);
        rotate(spot.rotation);
        
        // Apply transparency to the snowflake image
        tint(255, alpha);
        
        // Choose image based on spot type - no random switching
        let currentSnowflakeImage = spot.isBlue ? snowflakeImage : whiteSnowflakeImage;
        
        // Draw the snowflake image
        imageMode(CENTER);
        image(currentSnowflakeImage, 0, 0, spot.size, spot.size);
        noTint();
        
        pop();
      }
    }
  }
  
  isComplete() {
    return this.age > this.maxAge;
  }
}







class Snowflake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-0.5, 0.5);
    this.vy = random(0.5, 1.5);
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.03, 0.03);
    this.size = random(15, 35); // Much larger size for better visibility of the image
    this.life = 255;
    this.gravity = 0.008; // Very light gravity for snowflakes
    this.swayAmount = random(0.3, 0.8);
    this.opacity = random(150, 255);
  }
  
  update() {
    // Physics
    this.vy += this.gravity;
    this.vx *= 0.99; // Air resistance
    this.x += this.vx + sin(time + this.y * 0.005) * this.swayAmount; // Gentle drift
    this.y += this.vy;
    
    this.rotation += this.rotationSpeed;
    this.life -= 0.15; // Very slow fade for snowflakes
  }
  
  isDead() {
    return this.life <= 0 || this.y > height + 100;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    
    let alpha = map(this.life, 0, 255, 0, this.opacity);
    
    // Apply transparency to the snowflake image
    tint(255, alpha);
    
    // Choose image based on transformation progress with smooth transitions
    let currentSnowflakeImage = snowflakeImage;
    if (winterTransformationComplete && transformationProgress > 0.3 && !returnToOriginalComplete) {
      currentSnowflakeImage = whiteSnowflakeImage;
    } else if (returnToOriginalComplete) {
      // Smooth transition back to original snowflakes
      let returnProgress = min((millis() - startTime - 13000) / 4000, 1.0); // 4-second return transition
      if (returnProgress < 0.5) {
        currentSnowflakeImage = whiteSnowflakeImage; // Still white during first half of return
      } else {
        currentSnowflakeImage = snowflakeImage; // Gradually return to blue
      }
    }
    
    // Draw the snowflake image
    imageMode(CENTER);
    image(currentSnowflakeImage, 0, 0, this.size, this.size);
    
    // Reset tint
    noTint();
    
    pop();
  }
}


function drawTransitionOverlay() {
  // Add subtle transition effects
  push();
  noStroke();
  
  // Fade effect during transition
  let fadeAlpha = map(transformationProgress, 0, 1, 0, 30);
  fill(0, 0, 100, fadeAlpha);
  rect(0, 0, width, height);
  
  // Add some sparkle effects during transition
  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    let sparkleAlpha = map(transformationProgress, 0, 1, 0, 50) * sin(time * 4 + i);
    
    fill(0, 0, 100, sparkleAlpha);
    ellipse(x, y, 2);
  }
  
  pop();
}

function applyWinterTransformation() {
  // Change title color to F2EBEB with smooth transition
  let titleElement = document.querySelector('.title');
  if (titleElement) {
    titleElement.style.color = '#F2EBEB';
    titleElement.style.transition = 'color 3s ease-in-out';
  }
  
  // Change description color to white with smooth transition
  let descriptionElement = document.querySelector('.description');
  if (descriptionElement) {
    descriptionElement.style.color = '#FFFFFF';
    descriptionElement.style.transition = 'color 3s ease-in-out';
  }
  
  // Snowflake image switching now happens efficiently in the display method
  // Both images are preloaded, so no performance issues
}

function returnToOriginalColors() {
  // Return title color to original winter blue with smoother transition
  let titleElement = document.querySelector('.title');
  if (titleElement) {
    titleElement.style.color = '#506BC2'; // Original winter blue
    titleElement.style.transition = 'color 4s ease-in-out'; // Longer, smoother transition
  }
  
  // Return description color to original with smoother transition
  let descriptionElement = document.querySelector('.description');
  if (descriptionElement) {
    descriptionElement.style.color = '#5A5A5A'; // Original description color
    descriptionElement.style.transition = 'color 4s ease-in-out'; // Longer, smoother transition
  }
  
  // Reset transformation progress to show original background
  transformationProgress = 0;
}

function mousePressed() {
  // Create a new winter branch at the click position
  createWinterBranch(mouseX, mouseY);
  
  // Small chance for additional branch
  if (random() < 0.1) { // Reduced from 0.2 to 0.1
    createWinterBranch(mouseX + random(-30, 30), mouseY + random(-20, 20));
  }
}

function createWinterBranch(clickX, clickY) {
  let direction = -PI/2; // Grow upward
  let newBranch = new WinterBranch(clickX, clickY, direction);
  branches.push(newBranch);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

