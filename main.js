img = "";
objects = [];
status = "";

function preload()
{
    img = loadImage("dog_cat.jpg");
}

function setup()
{
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
}

function modelLoaded()
{
    console.log("Model is Loaded");
    status = true;
    objectDetector.detect(img,gotResults);
}

function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(img,0,0,640,420);
    fill("red");
    text("Dog",45,75);
    noFill();
    stroke("red");
    rect(30,60,450,350);

    fill("red");
    text("Cat",320,95);
    noFill();
    stroke("red");
    rect(300,80,300,300);
}