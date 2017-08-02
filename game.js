var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");

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

function main() {
    var now = Date.Now();
    var delta = now - then;

    render();

    requestAnimationFrame(main);
}

var then = Date.now();
main();