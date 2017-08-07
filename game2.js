// Create the canvas
var place = document.getElementById("page")

var canvas = document.getElementById("newCanvas");
var ctx = canvas.getContext("2d");
var canLeft = canvas.offsetLeft;
var canTop = canvas.offsetTop;

// Speed / time variables 
var DefaultSpeed = 3000;
var UpdatedSpeed = DefaultSpeed;
var divideSpeed = 1.2;


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
monsterImage.height = 144;
monsterImage.width = 144;



// Reset the game when the user clicks on the monster
var reset = function () {

    // Places the monster randomly on the canvas
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Reset the game score when the user clicks reset score button
function ResetScore() {
    UpdatedSpeed = DefaultSpeed;
    monstersCaught = 0;
    reset();
    then = Date.now();
}

// Reset speed of monster object 
function ResetSpeed() {
    UpdatedSpeed = DefaultSpeed;
    then = Date.now();
}

// Event listeners 
function callEventListeners() {
    var _rScore = document.getElementById("resetScore");
    var _rSpeed = document.getElementById("resetSpeed");

    canvas.addEventListener("click", function (e) {
        var x = e.pageX - canLeft;
        var y = e.pageY - canTop;

        if (y > monster.y && y < monster.y + 400
            && x > monster.x && x < 500)
        {

            monstersCaught++;
            reset();
            UpdatedSpeed = UpdatedSpeed / divideSpeed;
            then = Date.now();
        }
    
    }, false);

    _rScore.addEventListener("click", ResetScore, false);
    _rSpeed.addEventListener("click", ResetSpeed, false);
    
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
    
    if (delta > UpdatedSpeed) {
        reset();
    }
    render();

    if (delta > UpdatedSpeed)
    then = Date.now();

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