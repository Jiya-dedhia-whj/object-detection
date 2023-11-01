img = "";
objects = [];
status = "";

function setup()
{
    canvas = createCanvas(640,420);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(640,420);
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
}

function modelLoaded()
{
    console.log("Model is Loaded");
    status = true;
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
    image(video,0,0,640,420);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResults);

        for(i=0; i<objects.length ; i++)
        {
            document.getElementById("status").innerHTML = "Status : object detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects : "+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" ,objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }

    }
}