var dino;
var dino_animation
function preload(){
  dino_animation = loadAnimation("trex1.png","trex3.png","trex4.png");
}

function setup(){
  createCanvas(600,200);
  dino = createSprite(40, 115, 15, 30);
  dino.addAnimation("t-rex correndo", dino_animation);
  dino.scale = 0.5;
  chao = createSprite(200, 100, 400, 20);
  chao.velocityX = -3;
  chao.x = chao.width/2;
}

function draw(){
  background("white");
  drawSprites();
  ver_posicao_mouse();
  pular();
  }

function ver_posicao_mouse(){
  text("X:"+mouseX+"|Y:"+mouseY, mouseX, mouseY);
}

function pular(){
  if(keyDown(UP_ARROW)){
    dino.velocityY=-10;
  }
   dino.velocityY=dino.velocityY+0.5;
}

function corrige_chao()