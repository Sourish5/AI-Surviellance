status = "";
objects = [];
function preload()
{
video = createVideo('video.mp4');
}
function setup()
{
canvas = createCanvas(480,380);
canvas.position(530,280);
video.hide();
}
function play()
{
    ObjectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status_display').innerHTML = " Detecting Objects";
}
function modelLoaded()
{
    console.log('cocossd Loaded!');
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function draw()
{
    image(video,0,0,480,380);
    if(status != "")
    {
        ObjectDetector.detect(video, gotResults);
        for(i = 0;i<objects.length;i++)
        {
            document.getElementById('status_display').innerHTML = ' Objects Detected';
            document.getElementById('object_display').innnerHTML = objects.length;
            fill('#FF0000');
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotResults(results)
{
    if(results.length > 0)
    {
        console.log(results);
        objects = results;
    }
}