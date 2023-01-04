const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
let  sam,samarcher;
let samArrow;
let tower,towerimg;
let arrow;
let ground,groundimg;
var enemy;
var enemys = [];
var arrows = [];
var score = 0;
var towerHealth = 100;
var enemyAnimation  = [];
var enemySpritedata, enemySpritesheet;
var isGameOver = false;




function preload(){

    groundimg = loadImage("./assets/park.png");
    sam = loadImage("./assets/sam.png");
    samArcher = loadImage("./assets/samArcher.png");
    towerimg = loadImage("./assets/tower.png");
    arrow = loadImage("./assets/arrow.png");
    enemy1 = loadImage("./assets/zombie3.png");
    enemy2 = loadImage("./assets/zombie4.png");
    zombisSpritedata = loadJSON("./assets/zombie/zombie.json");
    zombieSpritesheet = loadImage("./assets/zombie/zombie.png");



}

function setup(){
  canvas = createCanvas(1499,830);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  var angle = -90;

   var options = {
    isStatic:true 
   }
   
   ground = Bodies.rectangle(0,height-1,width*2,1,options);
   World.add(world,ground);

   tower = Bodies.rectangle(90,500,160,310,options);
   World.add(world,tower); 

   sam = new Sam(170,490,90,120,angle);
   samarcher = new SamArcher(
      240,
      480,
      120,
      120,
      angle
   );

   
   var enemyFrames = enemySpritedata.frames;
   for(var i=0; i<enemyFrames.length; i++){
      var pos = enemyFrames[i].position;
      var img = enemySpritesheet.get(pos.x,pos.y,pos.w,pos.h);
      enemyAnimation.push(img);

   }

}

function draw(){  
     
   image(groundimg,0,0,1500,900);
   Engine.update(engine);

   rect(ground.position.x,ground.position.y,width*2,1);

   push();
   imageMode(CORNER);
   image(towerimg,tower.position.x,tower.position.y,160,310);
   pop();

   sam.display();
   samarcher.display();
 
   showEnemys();

   for (var i = 0; i < arrows.length; i++){
      showArrows(arrows[i],i);
      collisionwithenemys(i);
   }

   if(isGameOver === true){
      console.log("the game is ended");
   }


   
   // Score
  fill("darkblue");
  textAlign("center");
  textSize(30);
  text("Score: " + score,200, 300);


  fill("darkblue");
  textAlign("center");
  textSize(30);
  text("towerHealth: " + towerHealth,200,400);

 

}

function showEnemys(){
  if(enemys.length > 0) {
   if (
      enemys.length < 4 &&
      enemys[enemys.length - 1].body.position.x < width - 300
   ){
    var positions  = [-40, -60, -70, -20];
    var position  = random(positions);
    var enemy = new Enemy(width,height - 100,170,170,position,enemyAnimation);

    enemys.push(enemy);
   }

   for (var i = 0; i <  enemys.length; i++){
              Matter.Body.setVelocity(enemys[i].body,{
            x:-0.9,
            y:0
            } );

            enemys[i].display();
            enemys[i].animate(); 
            var collision = Matter.SAT.collides(tower,eneys[i].body);
            if (collision.collided ) {
               isGameOver = true;
             }
         }    
  } else {
       var enemy = new Enemy(width,height - 100,170,170,-60,enemyAnimation);
       enemys.push(enemy);
   }
}


function keyReleased(){

   if (keyCode === DOWN_ARROW && !isGameOver){
      arrows[arrows.length - 1].shoot();
   }


}

function keyPressed(){
   if(keyCode === DOWN_ARROW){

      samArrow = new SamArrow(sam.x,sam.y,40,40);
      arrows.push(samArrow);

   }
}

function showArrows(arrow,i){
   if (arrow){

      arrow.display();

      if(arrow.body.position.x >= width || arrow.body.position.y >= height  -50 ){
         arrow.remove(i);
      }

   }
}

function collisionwithenemys(index){
   
   for (var i = 0; i < enemys.length; i++){

      if (arrows[index] !== undefined && enemys[i] !== undefined){
         var collision  = Matter.SAT.collides(arrows[index].body,enemys[i].body);

         if(collision.collided){
             
            enemys[i].remove(i);

            Matter.World.remove(world,arrows[index].body);
            delete arrows[index];

            score += 2;

         }
      }
   }
}



