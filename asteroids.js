let canvas;
let ctx;
let canvasWidth = 1400;
let canvasHeight = 1000;
let ship;
//in order to be able to press multiple keys at the same time and regester the key presses to the game the keys need to be put into an array
let keys = [];
let bullets = [];
let asteroids = [];

document.addEventListener('DOMContentLoaded', SetupCanvas);

function SetupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = 'black';
    //draw black rect on screen 
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ship = new Ship();

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
        this.strokeColor = 'blue';
        this.noseX = canvasWidth / 2 + 15;
        this.nosey = canvasHeight / 2;
    }
    //rotate the ship
    Rotate(dir){
        this.angle += this.rotationSpeed * dir;
    }
    //handle rotating and moving ship arround
    Update() {
        //convert from degrees to radians 
        let radians = this.angle / Math.PI * 180;
        //calc changing values of x and y
        //new point
        //oldX + cos(radians) * distance
        //oldY + sin(radians) * distance
        if(this.movingForward){
            this.velX += Math.cos(radians) * this.speed;
            this.vely += Math.sin(radians) * this.speed;
        }
        if(this.x < this.radius){
            this.x = canvas.width;
        }
        if(this.x > canvas.width) {
            this.x = this.radius;
        }
        if(this.y < this.radius) {
            this.y = canvas.height;
        }
        if(this.y > canvas.height){
            this.y = this.radius;
        }
        this.velX *= 0.99;
        this.velY *= 0.99;

        //account for air friction
        this.x -= this.velX;
        this.y -= this.velY;
    }
    //draw ship on screen
    Draw() {
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        //calc angle between the vertices of the ship
        let vertAngle = ((Math.PI * 2) / 3);
        let radians = this.angle / Math.PI * 180;
        //find nose to fire bullets from
        this.noseX = this.x - this.radius * Math.cos(radians);
        this.noseY = this.y - this.radius * Math.sin(radians);
        for(let i = 0; i < 3; i++){
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();
    }
}

class Bullet {
    constuctor(angle){
        this.visible = true;
        this.x = ship.noseX;
        this.y = ship.noseY;
        this.angle = angle;
        this.height = 4;
        this.width = 4;
        this.speed = 5;
        this.velX = 0;
        this.velY = 0;
    }
    Update(){
        let radians = this.angle / Math.PI * 180;
        this.x -= Math.cos(radians) * this.speed;
        this.y -= Math.sin(radians) * this.speed;
    }
    Draw(){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Asteroid{
    constructor(x, y){
        this.visible = true;
        this.x = Math.floor(Math.random() * canvasWidth);
        this.y = Math.floor(Math.random() * canvasHeight);
        this.speed = 1;
        this.radius = 50;
        this.angle = Math.floor(Math.random() * 359);
        this.strokeColor = 'white';
    }
    Update() {
        var radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;
        if(this.x < this.radius){
            this.x = canvas.width;
        }
        if(this.x > canvas.width) {
            this.x = this.radius;
        }
        if(this.y < this.radius) {
            this.y = canvas.height;
        }
        if(this.y > canvas.height){
            this.y = this.radius;
        }
    }
    Draw(){
        ctx.beginPath();
        //hexagon for asteroid
        let vertAngle = ((Math.PI * 2) / 6);
        var radians = this.angle / Math.PI * 180;
        for(let i = 0; i < 6; i++){
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();

    }
}

//update position of all shapes on screen and model them
function Render(){
    ship.movingForward = (keys[87]);
    if(keys[68]){
        ship.Rotate(1);
    }
    if(keys[65]){
        ship.Rotate(-1);
    }
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    ship.Update();
    ship.Draw();
    requestAnimationFrame(Render);

}