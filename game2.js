// Create the canvas
var place = document.getElementById("")
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 574;
canvas.height = 538;
document.body.appendChild(canvas);


// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.jpg";


// Monster objects
var monsterReady = false;
var monsterImage = new Image();
var monster = {};
var monstersCaught = 0;

monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/fox.png";


// Reset the game when the user clicks on the monster
var reset = function () {

    // Places the monster randomly on the canvas
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Reset the game score when the user clicks reset score button
function ResetScore() {
    monstersCaught = 0;
    reset();
}


function callEventListeners() {
    var _rScore = document.getElementById("resetScore")

    addEventListener("click", function (e) {
        if (e.clientX >= monster.x - 10 && monster.x + 175 >= e.clientX
            && e.clientY >= monster.y - 10 && monster.y + 200 >= e.clientY)
        {
            monstersCaught++;
            reset();
            //interval = interval / divideSpeed;
            then = Date.now();
        }
    }, false);

    _rScore.addEventListener("click", ResetScore, false);
    
}



// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + monstersCaught, 32, 32);
};



// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    render();

    then = now;

    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Start game
var then = Date.now();
reset();
main();
callEventListeners();