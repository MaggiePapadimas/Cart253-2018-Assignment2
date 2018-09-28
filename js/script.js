/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr

Starter code for exercise 2.

*********************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 100;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
//enemy postion array
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

// How many dodges the player has made
var dodges = 0;
//background
var spaceBackground;
//enemy
var meteor;
//player
var spaceship;
//spawnCounter
var spawnCounter = 0;
var numberOfEnemies

//images
function preload() {
  spaceBackground = loadImage("assets/images/background.jpg");
  spaceship = loadImage("assets/images/spaceship.jpg");
  meteor = loadImage("assets/images/meteor.png");
}
// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(1280,700);

  // No stroke so it looks cleaner
  noStroke();

  imageMode(CENTER);

  reset();

}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
//game logic
  logic();
// star background
  image(spaceBackground,width/2,height/2);
// draw player
  image(spaceship,avatarX,avatarY,avatarSize,avatarSize);

// Draw meteor
for(var i = 0; i < numberOfEnemies; i = i+1){
  image(meteor, enemyX[i],enemyY[i],enemySize,enemySize);
}
// score displayer
  score();

}

//this displays the score
function score (){
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("Score: " +dodges, width/2, 20);
}
//function does game logic
function logic() {

  movePlayer();
  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  //moves every enemy
  for(var i = 0; i < numberOfEnemies; i = i + 1){
    // Update the enemy's position based on its velocity
    enemyX[i] = enemyX[i] + enemyVX;

    // Check if the enemy and avatar overlap - if they do the player loses
    // We do this by checking if the distance between the centre of the enemy
    // and the centre of the avatar is less that their combined radii
    if (dist( enemyX[i], enemyY[i] ,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
      reset();
    }
  }
  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    reset();
  }

  // Check if the enemy has moved all the way across the screen
  if ( enemyX[0] > width) {
    dodged();
  }

  // Display the current number of successful in the console
  console.log(dodges);

}
// resets games
function reset(){
  // Tell the player they lost
  console.log("YOU LOSE!");
  // Reset the enemy's position
  enemyX = [0];
  enemyY = [random(0,height)];
  // Reset the enemy's size and speed
  enemySize = 50;
  enemySpeed = 5;
  // Reset the avatar's position
  avatarX = width/2;
  avatarY = height/2;
  // Reset the dodge counter
  dodges = 0;
  spawnCounter = 0;
  numberOfEnemies = 1;
// resets avatar speed and size
  avatarSize = 100;
  avatarSpeed = 10;
}
//moves the player
function movePlayer(){
  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;


}

//dodged all meteor
function dodged(){
//changes avatar speed and size after dodge
  avatarSpeed = random(1,30);
  avatarSize = random(50, 250);
  // This means the player dodged so update its dodge statistic
  dodges = dodges + 1;

  spawnCounter =  spawnCounter + 1;
  // Tell them how many dodges they have made
  console.log(dodges + " DODGES!");

  // Increase the enemy's speed to make the game harder
  enemySpeed = enemySpeed + enemySpeedIncrease;
//dodges 5, resets counter and spawns enemy
  if(spawnCounter == 5){
    spawnCounter = 0;
    numberOfEnemies = numberOfEnemies + 1
    enemyX.push(0);
    enemyY.push(0);

  }

  // Reset every enemy's position to the left at a random height
  for(var i = 0; i < numberOfEnemies; i = i +1){
    enemyX[i] = 0;
    enemyY[i] = random(0,height);

  }
}
