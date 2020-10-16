var PLAY = 1;
var END = 0;
var gameState = 1;
var ghost, ghostImage;
var tower, towerImage;
var door, doorImage;
var climber, climbersGroup;
    
function preload(){
  ghostImage = loadImage("ghost-jumping.png");
  ghostStandingImage = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  fearSound = loadSound("spooky.wav");
  climberImage = loadImage("climber.png");
  backgroundMusic1 = loadSound("backgroundMusic1.mp3");
  backgroundMusic2 = loadSound("backgroundMusic2.mp3");
} 
function setup(){
  createCanvas(600,470);
 backgroundMusic1.loop();
  tower = createSprite(300,400);
  tower.addImage(towerImage);
 // tower.y = tower.height/2;
  tower.velocityY =  4;
  
  ghost = createSprite(300,300,30,30);
  ghost.addImage(ghostImage);
  ghost.scale = 0.27;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleGroup = new Group();
}  
function draw(){
  background("white");
  
 if (gameState === PLAY){
   if (keyDown("space")){
     ghost.velocityY = -12;
     ghost.addImage(ghostImage);
   }
   if (keyWentDown("right")){
     ghost.velocityX = 6;
   }
   if (keyWentUp("right")){
     ghost.velocityX = 0;
   }
   if (keyWentDown("left")){
     ghost.velocityX = -6;
   }
   if (keyWentUp("left")){
     ghost.velocityX = 0;
   }
   ghost.velocityY = ghost.velocityY + 0.7;
   if(tower.y > 400){
     tower.y =  300;
   }
   if(climbersGroup.isTouching(ghost)){
     ghost.velocityY = 0;
     ghost.addImage(ghostStandingImage);
     invisibleGroup.destroyEach();
   }
   if(ghost.isTouching(invisibleGroup)) {
     gameState = END;
     tower.visible = false;//destroy();
    ghost.visible = false;//destroy();
     climbersGroup.setVisibleEach = false;//destroyEach();
     doorsGroup.setVisibleEach = false;//destroyEach();
     invisibleGroup.setVisibleEach = false;//destroyEach();
   }
 doors();
 }
  if(gameState === END){
    background("black");
    fill("yellow");
    text("Game OVER!!",250,250);
    text("Press R To Restart",250,300);
  }
  if(keyDown("R")){
    gameState = PLAY;
    ghost.visible = true;
    ghost.x = 300;
    ghost.y = 300;
    tower.visible = true;
    climbersGroup.setVisibleEach = true;//destroyEach();
     doorsGroup.setVisibleEach = true;//destroyEach();
     invisibleGroup.setVisibleEach = true;//destroyEach()
  }
  drawSprites();
}  
 function doors(){
   if(frameCount % 240 === 0){
     var doors = createSprite(200,-50);
     doors.x = Math.round(random(120,400));
     doors.addImage(doorImage);
     doors.scale = 0.8;
     doors.velocityY = 4;
     doors.lifetime = 800;
     doors.depth = ghost.depth;
     ghost.depth = ghost.depth + 1;
     doorsGroup.add(doors);
     
     var climber = createSprite(200,10);
     climber.addImage(climberImage);
     climber.x = doors.x; // Math.round(random(120,400)); 
     climber.velocityY = 4; //doors.velocityY;
     climber.lifetime = 800;//doors.lifetime;
     climbersGroup.add(climber);
     
     var invisibleBlock = createSprite(0,0);
     invisibleBlock.width = 600;
     invisibleBlock.height = 20;
     invisibleBlock.x = 300;
     invisibleBlock.y = -200;
     invisibleBlock.velocityY = 4;
     invisibleBlock.lifetime = 800;
     invisibleBlock.visible = false;
     invisibleGroup.add(invisibleBlock);   
   }
 }
   
   
   
   
 
    
    
    