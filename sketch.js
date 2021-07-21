var water, waterImage
var crab, crabImage
var sharkImage, sharkGroup, shark
var surf, surfImage
var score = 0
var lives = 3
var gamestate = 1
function preload(){
    waterImage = loadImage("images/ocean1.png");
    crabImage = loadImage("images/crab1.png");
    sharkImage = loadImage("images/1shark.png");
    shark2Image = loadImage("images/2shark.png");
    shark3Image = loadImage("images/3shark.png");
    shark4Image = loadImage("images/4shark.png")
    surfImage = loadImage("images/surfboard.png");
}

function setup(){
    createCanvas(600,500);
    water = createSprite(200,180,400,20);
    water.addImage("water",waterImage);
    water.scale = 3

    crab = createSprite(50,150,20,50);
    crab.addImage("crab",crabImage);
    crab.scale = 0.3;

    lives = 3;
    sharkGroup = new Group();
}

function draw(){
    background("black");
    textColor = ("white")
    textSize(30)
    text("Lives: " + lives,15,425)
    text("Score: " + score,15,475)

    if(gamestate === 1){
        spawnSharks();
        score = score + Math.round(getFrameRate()/60);
        water.velocityX = -(4 + 3*score/100);
        if(keyDown("UP_ARROW")){
            crab.y = crab.y - 5;
        }
        if(keyDown("DOWN_ARROW")){
            crab.y = crab.y + 5;
        }
    
        if(water.x < 50){
            water.x = water.width/2
        }
        if(crab.y >= 400){
            crab.y = 365
        }
    
        if(crab.y <= 0){
            crab.y = 35
        }

        crab.isTouching(sharkGroup,destroyShark)

        if(lives <= 0){
            over();
            gamestate = 2
        }
    }
    if(gamestate === 2){
        text("Game Over, press space to restart",125,450)
        if(keyDown("space")){
            gamestate = 1
            lives = 3
            score = 0
        }
    }
    console.log(water.depth)
    drawSprites();
}

function spawnSharks(){
    if (frameCount % 100 === 0){
        shark = createSprite(600,(Math.round(random(50,350))),10,40);
        shark.velocityX = -(6 + 3*score/100);
        
        var rand = Math.round(random(1,4));
        switch (rand){
            case 1: shark.addImage("shark",sharkImage);
                    shark.scale = 0.4;
            break;
            case 2: shark.addImage("shark2",shark2Image);
                    shark.scale = 0.4;
            break;
            case 3: shark.addImage("shark3",shark3Image);
                    shark.scale = 0.4;
            break;
            case 4: shark.addImage("shark4",shark4Image);
                    shark.scale = 0.4
            break;
            default: break;
        }

        shark.lifetime = 1000
        sharkGroup.add(shark);
    }
    crab.depth = water.depth
    crab.depth = crab.depth + 1
}

function over(){
    water.velocityX = 0
    sharkGroup.destroyEach();
}
function destroyShark(){
    shark.destroy();
    lives = lives - 1
}