/*
This brownser works better on IE or Microsoft Edge
*/


//Global Variables
var initialInt = 3000;
var interval = initialInt;
var divideSpeed = 1.2;

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "flames.png";

// Object image
var obReady = false;
var obImage = new Image();
obImage.onload = function () {
    obReady = true;
};
obImage.src = "Devilish.png";


// Game objects
var devil = {};
var monstersCaught = 0;


//resetbutton
var resetSpeed = document.createElement("button");
resetSpeed.innerHTML = "Reset Speed";
resetSpeed.onclick = function () {
    interval = initialInt;
    then = Date.now();
}


//newgame
var newGame = document.createElement("button");
newGame.innerHTML = "New Game";
newGame.onclick = function () {
    interval = initialInt;
    monstersCaught = 0;
    reset();
    then = Date.now();
}

document.body.appendChild(document.createElement("br"));
document.body.appendChild(resetSpeed);
document.body.appendChild(newGame);



//Inputs
addEventListener("click", function (e) {
    if (e.clientX >= devil.x - 10 && devil.x + 250 >= e.clientX
        && e.clientY >= devil.y - 10 && devil.y + 250 >= e.clientY) {
        monstersCaught++;
        reset();
        interval = interval / divideSpeed;
        then = Date.now();
    }
}, false);



//Reset Game
var reset = function () {
    devil.x = 60 + (Math.random() * (canvas.width - 150));
    devil.y = 60 + (Math.random() * (canvas.width - 150));
};

//Render Objects
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (obReady) {
        ctx.drawImage(obImage, devil.x, devil.y);
    }

    //show score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Devils caught: " + monstersCaught, 15, 32);
};

//Game Loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    if (delta > interval) {
        reset();

    }
    render();

    if (delta > interval)
        then = Date.now();

    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//Play Game
var then = Date.now();
reset();
main();