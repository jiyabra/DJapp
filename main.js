function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
}

song = "";
leftWristX = 0;
leftWristY = 0;
score_leftwrist = 0;
rightWristX = 0;
rightWristY = 0;

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        score_rightwrist = results[0].pose.keypoints[10].score;
        score_leftwrist = results[0].pose.keypoints[9].score;
        console.log("score_leftwrist = " + score_leftwrist + "score_rightwrist = " + score_rightwrist);

    }

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("  leftWristX = " + leftWristX + "  leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("  rightWristX = " + rightWristX + "  rightWristY = " + rightWristY);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    if (score_rightwrist > 0.2) {
        circle(rightWristX, rightWristY, 20);


        if (rightWristY > 0 && rightWristY < 100) {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }
        else if (rightWristY > 100 && rightWristY < 200) {
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
        }
        else if (rightWristY > 200 && rightWristY < 300) {
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        }
        else if (rightWristY > 300 && rightWristY < 400) {
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
        }
        else if (rightWristY > 400 && rightWristY < 500) {
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
        }
    }

    if (score_leftwrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumber_leftwristy = Number(leftWristY);
        remove_decimals = floor(InNumber_leftwristy);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }

}

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}