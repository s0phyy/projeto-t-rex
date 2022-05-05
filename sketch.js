var trex, trex_correndo;
var chao, chao_imagem;
var chao2;
var nuvem, nuvem_imagem;
var cactoImg1, cactoImg2, cactoImg2, cactoImg3, cactoImg4, cactoImg5, cactoImg6;
var aleatorio;
var cacto;
var pontos = 0;
var JOGANDO = 1;
var MORREU = 0;
var estado;
var cactosgroup;
var nuvensgroup;
var gameOver;
var gameOver_Img;
var restart;
var restart_Img;
var trex_mortoImg;
estado = JOGANDO;


function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  chao_imagem = loadImage("ground2.png");
  nuvem_imagem = loadImage("cloud.png");
  cactoImg1 = loadImage("obstacle1.png");
  cactoImg2 = loadImage("obstacle2.png");
  cactoImg3 = loadImage("obstacle3.png");
  cactoImg4 = loadImage("obstacle4.png");
  cactoImg5 = loadImage("obstacle5.png");
  cactoImg6 = loadImage("obstacle6.png");
  gameOver_Img = loadImage("gameOver.png");
  restart_Img = loadImage("restart (1).png");
  trex_mortoImg = loadAnimation("trex_collided.png");
}

function setup() {
  createCanvas(600, 200);
  
  
  cactosgroup = new Group();
  nuvensgroup = new Group();

  //crie um sprite de trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("correndo", trex_correndo);
  trex.depth = 2;
  trex.addAnimation("trex morto", trex_mortoImg)
  
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
  gameOver = createSprite(300,100,20,20);
  restart = createSprite(300,140,20,30);
  gameOver.addImage(gameOver_Img);
  restart.addImage(restart_Img);
  gameOver.visible = false;
  restart.visible = false;

  trex.debug = true;
  trex.setCollider("circle", 0, 0, 40);
}

function draw() {

  
  aleatorio = Math.round(random(10,70));

  background("white");
  trex.collide(chao2);
  drawSprites(); 

  text("pontuação:"+pontos,450,30)

    if(estado==JOGANDO){
      in_Game();
      if(trex.isTouching(cactosgroup)){
        estado = MORREU;

      }
    }
  if(estado==MORREU){ 
      Morte();
    
  }
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
  if(frameCount%120===0){
    nuvem = createSprite(650,aleatorio,10,10);
    nuvem.velocityX = -2;
    nuvem.addImage("passando",nuvem_imagem); 
    nuvem.scale = 1;
    nuvem.depth = 1;
    nuvem.lifetime = 700;
    nuvensgroup.add(nuvem);
  }
}
function criar_cactos(){
  if(frameCount%440===0){
    cacto = createSprite(650,170,10,10);
    cacto.velocityX = -3;
    cacto.scale = 0.5;
    cacto.depth = 1;
    cacto.lifetime = 700;

    switch(Math.round(random(1,6))){
      case 1:
        cacto.addImage(cactoImg1);
        cacto.scale = 0.4 ;
        break;
      case 2:
        cacto.addImage(cactoImg2);
        cacto.scale = 0.5;
        break;
      case 3:
        cacto.addImage(cactoImg3);
        cacto.scale = 0.3;
        break;
      case 4:
        cacto.addImage(cactoImg4);
        cacto.scale = 0.5;
        break;
      case 5:
        cacto.addImage(cactoImg5);
        cacto.scale = 0.4;
        break;
      case 6:
        cacto.addImage(cactoImg6);
        cacto.scale = 0.5;
        break;

      default:
        break;
    }
    cactosgroup.add(cacto);
  }
}

  function in_Game(){

    corrige_chao();
    pular();
    criar_cactos();
    criar_nuvens();
    pontuacao();


  }
  function Morte(){
    chao.velocityX=0;
    gameOver.visible = true;
    restart.visible = true;
    cactosgroup.setVelocityXEach(0);
    nuvensgroup.setVelocityXEach(0);
    cactosgroup.setLifetimeEach(-1);
    nuvensgroup.setLifetimeEach(-1); 
    trex.changeAnimation("trex morto", trex_mortoImg);  
  }

  function pontuacao(){
    pontos=pontos+round(frameCount/60);


  }

