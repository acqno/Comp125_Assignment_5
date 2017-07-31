var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Background image 

var backgroundReady = false;
var backgroundImg = new Image();
backgroundImg.onload = function () {
    backgroundReady = true;
}
backgroundImg.src = "images/background.jpg";


// DISPLAY OBJECTS 

function render() {
    if (backgroundReady) {
        ctx.drawImage(backgroundImg, 0, 0);
    }
}