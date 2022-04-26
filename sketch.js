var trex, trex_correndo;
var chao, chao_imagem;
var chao2;
var aleatorio;
var nuvem, nuvemImg;
var cactoImg1, cactoImg2, cactoImg3, cactoImg4, cactoImg5, cactoImg6; 
var cacto
var pontos = 0;
var JOGANDO = 1;
var MORRENDO = 0;
var estado = JOGANDO;

function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  chao_imagem = loadImage("ground2.png");
  nuvemImg = loadImage("cloud.png");
  cactoImg1 =  loadImage("obstacle1.png");
  cactoImg2 =  loadImage("obstacle2.png");
  cactoImg3 =  loadImage("obstacle3.png");
  cactoImg4 =  loadImage("obstacle4.png");
  cactoImg5 =  loadImage("obstacle5.png");
  cactoImg6 =  loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  //crie um sprite de trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("correndo", trex_correndo);
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  trex.depth = 2;

  //crie um sprite chao (solo)
  chao = createSprite(200,180,400,20);
  chao.addImage("chao que mexe", chao_imagem);
  chao.x = chao.width/2;
  chao.velocityX = -3;

  chao2 = createSprite(200, 193, 400, 10);
  chao2.shapeColor = "white";

  //chão fica invisível
  chao2.visible = false;

}

function draw() {


   aleatorio = Math.round(random(10,70));

  background("white");

  text("pontuação :" + pontos, 500, 10); 
  
  trex.collide(chao2);

  if(estado == JOGANDO){
    jogar();
  }

  drawSprites(); 
}

function pular(){
  if(keyDown("space") && trex.isTouching(chao)) {
    trex.velocityY = -13;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
}

function corrige_chao(){
    if(chao.x<0){
        chao.x = chao.width/2;
    }
}

function corrige_chao2(){
  if(chao2.x<0){
      chao2.x = chao2.width/2;

  }
}

function criar_nuvens(){
  if(frameCount%225===0){
    nuvem = createSprite(650,aleatorio,10,10);
    nuvem.velocityX = -1;
    nuvem.addImage("nuvem", nuvemImg);
    nuvem.scale = 0.5;
    nuvem.depth = 1;
    nuvem.lifetime = 700;
  }
}

function criar_cactos(){
  if(frameCount%225===0){
    cacto = createSprite(650,170,10,10);
    cacto.velocityX = -3;
    cacto.scale = 0.5;
    cacto.depth = 1;
    cacto.lifetime = 700;

    switch(Math.round(random(1,6))){
      case 1:
        cacto.addImage(cactoImg1);
        break;
      case 2:
          cacto.addImage(cactoImg2);
          break;
      case 3:
        cacto.addImage(cactoImg3);
        break;
      case 4:
        cacto.addImage(cactoImg4);
        break;
      case 5:
        cacto.addImage(cactoImg5);
        break;
      case 6:
        cacto.addImage(cactoImg6);
        break;
    }
  
  }
}

function jogar(){
  criar_cactos();
  criar_nuvens();
  corrige_chao();
  //pular quando a tecla espaço for pressionada
  pular();
  pontuação();
}

function morto(){
  chao.velocityX = 0;
}

function pontuação(){
  pontos = pontos + round(frameCount/60);
}