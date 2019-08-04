let canvas;
let ctx;
let canvasWidth = 1400;
let canvasHeight = 1000;
//in order to be able to press multiple keys at the same time and regester the key presses to the game the keys need to be put into an array
let keys = [];

document.addEventListener('DOMContentLoaded', SetupCanvas);

function SetupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = 'black';
    //draw black rect on screen 
    ctx.fillRect(0,0,canvas.width, canvas.height);

    //to handle multiple keypresses at the same time
    document.body.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e){
        keys[e.keyCode] = false;
    });
    Render();
    
}

class Ship {
    constructor(){
        this.visible = true;
        //start ship in center of screen
        this.x = canvasWidth / 2; 
        this.y = canvasHeight / 2;
        //start ship stationary
        this.movingForward = false;
        this.speed = 0.1;
        // velocity that ship moves across the screen
        this.velX = 0;
        this.velY = 0;
        this.rotationSpeed = 0.001;
        this.radius = 15;
        //starting angle of ship
        this.angle = 0;
        this.strokeColor = 'white';
    }
}

let ship = new Ship();

//update position of all shapes on screen and model them
function Render(){


}