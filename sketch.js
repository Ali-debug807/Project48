const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine,world
var coffee
var coffeeIMG
var water=[]
var waterG
var waterIMG
var backgroundIMG

var maxWater=2

var gameover

let t=0

var gameState=1

var spill=0

function preload() {
    waterIMG=loadImage("water.png")
    backgroundIMG=loadImage("background1.jpg")
    gameover=loadImage("gameover.png")
    coffeeIMG=loadImage("coffee.png")
    waterG=new Group()
}

function setup(){
    canvas = createCanvas(800,500);
    engine = Engine.create()
    world = engine.world
    coffee= createSprite(400,470,130,70)
    coffee.addImage(coffeeIMG)
    coffee.scale = 0.23
    //coffee.debug=true
    coffee.setCollider("rectangle",45,0,200,125)
}

function draw(){
   background(backgroundIMG)
   Engine.update(engine)
   if(gameState===1){
       coffee.x=mouseX
       waterDrops()
       t=Math.floor(frameCount/45)
       textSize(20)
       fill("white")
       text("Score: "+t,15,30)
       let speed = abs(winMouseX - pwinMouseX);
       if(speed>45){
           spill=spill+20
       }
       text("Spill: "+spill+"%",15,60)
        console.log(speed)
       if(spill===100){
        gameState=2
    }
   }
   if(gameState===2){
       background(gameover)
       textSize(20)
       fill("white")
       text("You Spilled All of Your Coffee!",250,100)
       waterG.destroyEach()
   }
   if(waterG.isTouching(coffee)){
       gameState=3
   }
   if(gameState===3){
    background(gameover)
    textSize(20)
    fill("white")
    text("You Got Water In Your Coffee!",250,100)
    waterG.destroyEach()
   }
   drawSprites()
}

function waterDrops(){
    if (frameCount % 8 === 0) {
        water = createSprite(random(-100, 1000), 0, 100, 100);
        water.velocityY = 9;
        if(t%2===0){
            water.velocityY+0.8
        }
        water.addImage(waterIMG)
        water.scale=0.0155
        water.lifetime=300
        coffee.depth=water.depth
        console.log("x"+coffee.depth)
        waterG.add(water)
    }
}