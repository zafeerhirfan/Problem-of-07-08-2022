const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var bgimg,foodimg,rabbitimg;
var blink,eat,sad;


function preload(){
bgimg = loadImage("background.png");
foodimg = loadImage("melon.png");
rabbitimg = loadImage("Rabbit-01.png"); 
eat= loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

blink.playing = true ; 
eat.playing = true ; 
sad.playing = true ; 
sad.looping = false;
eat.looping = false ;

}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(5,{x:200,y:100});
  fruit = Bodies.circle(300,300,30);
  Matter.Composite.add(rope.body,fruit);
  fruit_con = new Link(rope,fruit);
  bunny = createSprite(250,620,100,100);
  //bunny.addImage(rabbitimg);
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.addAnimation("crying", sad);
  bunny.scale = 0.2;
  bunny.changeAnimation("blinking");






  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  button = createImg("cut_button.png");
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);
}

function draw() 
{
  background(51);
  image(bgimg,width/2,height/2,500,700);
  ground.show();
  rope.show();
 // ellipse(fruit.position.x,fruit.position.y,30);
 if (fruit != null){
  image(foodimg,fruit.position.x,fruit.position.y,80,80);

 }
if(collide(fruit,bunny)== true){
bunny.changeAnimation("eating");

}
if(collide(fruit,ground.body)== true){
  bunny.changeAnimation("crying");
  
  }
  


  Engine.update(engine);
  drawSprites();
  

 
   
}
function collide(body,sprite){

if (body != null){

  var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
  console.log(d);
  if (d <= 80){
    World.remove(world,fruit);
    fruit = null;
    return true;
   
       

  }
  else{
    return false ;  

  }

}


}

function drop(){

    rope.break();
    fruit_con.detach();
    friut_con = null ;



}

