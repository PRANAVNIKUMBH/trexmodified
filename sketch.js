//Global variables
var trexani,groundimg,trex,ground 
var gamestate = "start"
var score=0
//indentation - giving tab spaces

//load animation, images and sound
function preload(){
  trexani=loadAnimation('trex1.png','trex3.png','trex4.png')

  groundimg=loadImage('ground2.png')

  cloudimg=loadImage('cloud.png')

  ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  
  gameoverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")

  trexend =loadAnimation("trex_collided.png")
  trexstart = loadAnimation("trex1.png")
}

function setup() {
  createCanvas(600,200);

  trex=createSprite(50,170,20,35)
  trex.addAnimation('standing',trexstart)
  trex.addAnimation('walking',trexani)
  trex.addAnimation('dead',trexend)
  trex.scale=0.5

  ground=createSprite(300,180,600,20)
  ground.addImage(groundimg)

  ground2=createSprite(300,185,600,20)
  ground2.visible=false
  
  cloudg=createGroup()
  obg=createGroup()
  trex.debug=false
  trex.setCollider("circle",0,0,40)
  gameover = createSprite(300,100,30,40)
  gameover.addImage(gameoverimg)
  gameover.scale=0.6
  restart = createSprite(300,150,50,60)
  restart.addImage(restartimg)
  restart.scale=0.6
}

function draw() {
  
  background(180);
  fill("white")
 text ("Score= "+ score,500,50)

  trex.collide(ground2)
  
  if (gamestate==="start"){
if (keyDown("space")){
  gamestate = "play"
}
gameover.visible=false
restart.visible=false
  }
  if (gamestate==="play"){
    trex.changeAnimation('walking',trexani)
    gameover.visible=false
restart.visible=false
    //getFrameRate() = fps
    score = score + Math.round(getFrameRate() / 60.9  )
  if(keyDown('space')&&trex.y>152){
    trex.velocityY=-10
  }

  trex.velocityY=trex.velocityY+0.5

  ground.velocityX=-5
  if(ground.x < 0){
    ground.x = 600  
  }
  clouds()
  obs()
  if(trex.isTouching(obg)){
    gamestate = "end"
  }

}
if(gamestate==="end"){
  cloudg.setVelocityXEach(0)
  obg.setVelocityXEach(0)
  ground.velocityX=0
  cloudg.setLifetimeEach(-1)
  obg.setLifetimeEach(-1)
  trex.velocityY=0
  gameover.visible=true
restart.visible=true
trex.changeAnimation('dead',trexend)

}
  drawSprites()
}

function clouds (){
  if(frameCount%80===0){
    var cloud = createSprite(600,random(30,70),40,60)
    cloud.addImage(cloudimg)
    cloud.velocityX=-4
    cloud.scale=0.8
   
    trex.depth=cloud.depth+1
    
    cloud.lifetime=200
    cloudg.add(cloud)
  }
  
}

function obs (){
  if (frameCount%60===0){

    var obst=createSprite(600,160,30,40)
    obst.velocityX=-5
    
    
    var rand=Math.round(random(1,6))
    switch(rand){
      case 1: obst.addImage(ob1)
      break

      case 2: obst.addImage(ob2)
      break

      case 3: obst.addImage(ob3)
      break

      case 4: obst.addImage(ob4)
      break

      case 5: obst.addImage(ob5)
      break

      case 6: obst.addImage(ob6)
      break
      
    }
    
    obst.scale=0.6
    obst.lifetime=200
    obg.add(obst)
  }
}






