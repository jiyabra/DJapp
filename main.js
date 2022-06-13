function setup()
{
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

song = "";
leftWristX = 0;
leftWristY = 0;
score_leftwrist = 0;
rightWristX = 0;
rightWristY = 0;

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        score_leftwrist = results[0].pose.keypoints[9].score;
        console.log("score_leftwrist = " + score_leftwrist);
    }

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("  leftWristX = " + leftWristX + "  leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("  rightWristX = " + rightWristX + "  rightWristY = " + rightWristY);
}

function draw()
{
    image(video , 0 , 0 ,600 ,500);
    fill("#FF0000");
    stroke("#FF0000");

    if(score_leftwrist > 0.2)
    {
        circle(leftWristX , leftWristY , 20);
        InNumber_leftwristy = Number(leftWristY);
        remove_decimals = floor(InNumber_leftwristy);
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }
  
}

function preload()
{
    song = loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}