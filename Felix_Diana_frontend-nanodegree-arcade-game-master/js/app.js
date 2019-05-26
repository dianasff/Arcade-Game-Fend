
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("close")[0];
let startid = document.getElementById("start");
let gOver = document.getElementById("game-over");
var myMusic= document.getElementById("myMusic");
var losesound= document.getElementById("lose");
var winsound= document.getElementById("win");
var collidesound= document.getElementById("collide");
var gamePoints =1000;



function openModal(){
        
    //abrir o modal
        // show congratulations modal provided by https://www.w3schools.com/howto/howto_css_modals.asp, and adapted by me.
        startid.style.display = "block";  
    
};
function closeModal(){
    startid.style.display = "none";
    myMusic.play();
}

//The game over function
function gameOver(){
    myMusic.pause();
    losesound.play();
        //abrir o modal
        // show congratulations modal provided by https://www.w3schools.com/howto/howto_css_modals.asp, and adapted by me.
        gOver.style.display = "block";  
};

// The reset function
function resetGame(){
    window.location.reload(true);
}
// Game point's class
var Points = function(x, y){
    this.x = x;
    this.y = y;
    this.gpoint = "POINTS: "+ gamePoints
}
render: Points.prototype.render = function(){
    ctx.font = '20px Monospace';
    ctx.fillText(this.gpoint, this.x, this.y);
}
update: Points.prototype.update = function(){
    this.gpoint = "POINTS: "+ gamePoints
}


var Stars = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/Star.png';
}
render: Stars.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid
var Enemy = function (x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
    this.width= 80;
    this.height= 60;
    this.position=(x,y);
    this.speed= speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
update: Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
     this.x += 100* this.speed * dt;

    
    // which will ensure the game runs at the same speed for
    // all computers.
     if (this.x < player.x + player.width && this.x + this.width > player.x && this.y < player.y+ player.height && this.y + this.height > player.y){
        console.log("collision"); 
        collidesound.play();
        gamePoints-=500;
        player.reset();
        if (gamePoints <= 0) {
            gameOver();
        }  
    }

};

// Draw the enemy on the screen, required method for game
render: Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x,y) {
    this.x=x;
    this.y=y;
    this.width= 60;
    this.height= 80;
    this.position=(x,y);
    this.sprite = 'images/char-cat-girl.png';
};

// Update the player's position, required method for game
update: Player.prototype.update = function() {
    this.x;
    this.y;
    if (this.y == -10 || this.y == -60 ) {
        console.log('winner');
        stars.push(new Stars(0, -15));
        stars.push(new Stars(100,-15));
        stars.push(new Stars(200,-15));
        stars.push(new Stars(300, -15));
        stars.push(new Stars(400, -15));
        gamePoints += 100;
        player.reset();
        myMusic.pause();
        winsound.play();
        document.getElementById("points").innerHTML = gamePoints;
        //abrir o modal
        // show congratulations modal provided by https://www.w3schools.com/howto/howto_css_modals.asp, and adapted by me.
        modal.style.display = "block";         
    }
};

// Draw the player on the screen, required method for game
render: Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
handleInput: Player.prototype.handleInput = function(keyButton){
    if (keyButton === 'left' && this.x > -15){
        this.x -= 40;
                
    }
    if (keyButton === 'up' && this.y > -15){
        this.y -= 50;

        
    }
    if (keyButton === 'right' && this.x < 415){
        this.x += 45;
    }
    if (keyButton === 'down' && this.y < 400){
        this.y += 50;
    }

}
// to reset player to original position
reset: Player.prototype.reset = function(){
    this.x = 415;
    this.y = 440;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [ new Enemy(-8, 60,2), new Enemy(0, 140, 1), new Enemy(-5, 230, 3)];
// Place the player object in a variable called player
var player = new Player(415, 440);
// place the points object
var points = new Points(0, 570)
var stars=[];
openModal();

// this will repeat the bugs
setInterval(function repeatBug(){
    
    allEnemies.push(new Enemy(-8, 60,2));
    allEnemies.push(new Enemy(-8, 140, 1));
    allEnemies.push(new Enemy(-5, 230, 3));

},2500)


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
