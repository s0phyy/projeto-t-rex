var trex, trex_correndo;
var chao, chao_imagem;
var chao2;
var aleatorio;
var nuvem, nuvemImg;

function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  chao_imagem = loadImage("ground2.png");
  nuvemImg = loadImage("cloud.png");
}

function setup() {
  createCanvas(600, 200);
  
  //crie um sprite de trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("correndo", trex_correndo);
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  
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

criar_nuvens();

   aleatorio = Math.round(random(10,70));

  background("white");
  corrige_chao();
  //pular quando a tecla espaço for pressionada
  pular();
  
 //impedir que o trex caia
  trex.collide(chao2);
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
  }
}