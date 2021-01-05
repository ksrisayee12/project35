//Create variables here
var dog, dogImage;
var happyDogImage;
var database;
var foodS;
var foodStock;
var dogFood, dogFoodImg;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
  dogFoodImg = loadImage("images/dog food.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(350, 300);
  dog.scale=0.3;
  dog.addImage(dogImage);
  foodStock = database.ref('Food');
  foodStock.on("value", readStock, showError);

 dogFood=createSprite(250,380);
 dogFood.addImage(dogFoodImg);
 dogFood.scale=0.05;
 dogFood.visible=false;

 for(var i=10;i<=500;i=i+15)
  {
    var dots=createSprite(i,10,5,5);
    dots.shapeColor="white";
  }
  for(var i=10;i<=500;i=i+15)
  {
    var dots1=createSprite(i,490,5,5);
    dots1.shapeColor="white";
  }

  for(var i=10;i<=500;i=i+15)
  {
    var dots2=createSprite(10,i,5,5);
    dots2.shapeColor=0;
  }

  for(var i=10;i<=500;i=i+15)
  {
    var dots3=createSprite(490,i,5,5);
    dots3.shapeColor=0;
  }

}


function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
    dogFood.visible=true;
  }

  if (keyWentUp(UP_ARROW)){
    dog.addImage(dogImage);
    dogFood.visible=false;
  }

  if(foodS===undefined)
  {
    fill(255, 255, 255)
    textSize(25);
    text("Loading..........",170,430);
  }

  if (foodS === 0){
    foodS = 20;
  }

  strokeWeight(3.5);
  stroke(0);
  fill(255, 255, 255);
  textSize(25);
  text("Food Remaining : "+foodS,130,140);
  text("Note: Press Up Arrow To Feed Drago", 25, 50);

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if (x<=0){
    x=0;
  }

  else{
    x-=1;
  }

  database.ref('/').update({
    Food : x
  })

}

function showError(){
  console.log("Error in writing to the database");
}