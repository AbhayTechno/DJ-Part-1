function preload() {

    song = loadSound("same.mp3");
}

function setup() {

    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}






function draw() {

    image(video, 0, 0, 600, 500);
    
    fill("#FF0000");
    stroke("#FF0000")

    if (scoreRightWrist > 0.2) {
        
        circle(rightWristX,rightWristY, 20);

        if(rightWristY > 0 && rightWristY <= 100) {

            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }

        if(rightWristY > 100 && rightWristY <= 200) {

            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1);
        }

        if(rightWristY > 200 && rightWristY <= 300) {

            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }

        if(rightWristY > 300 && rightWristY <= 400) {

            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }

        if(rightWristY < 400) {

            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }


    }

    if(scoreLeftWrist > 0.2) {

        circle(leftWristX,leftWristY, 20);

left=Number(leftWristY);
remove_decimal=floor(left);
volume=remove_decimal/500;
document.getElementById("volume").innerHTML="Volume = " + Volume;
song.setvolume(volume);


    }
}




function gotPoses(results) {

    if (results.length > 0) {

        console.log(results);

        scoreRightWrist= results[0].pose.keypoints[10].score;
        scoreLeftWrist= results[0].pose.keypoints[9].score;

        rightWristX = results[0].pose.rightWrist.X;
        rightWristY = results[0].pose.rightWrist.Y;

        leftWristX = results[0].pose.leftWrist.X;
        leftWristY = results[0].pose.leftWrist.Y;

    }
}

function modelLoaded() {

    console.log("Posenet is intialized");
}