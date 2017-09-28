var canvasGame = document.getElementById('game');
var ctxGame = canvasGame.getContext('2d');
var mouse = {
  x: undefined,
  y: undefined
}
window.addEventListener('mousemove',
  function(event){
    mouse.x = event.x;
    // console.log("X: "+mouse.x);
    mouse.y = event.y;
    // console.log("Y: "+mouse.y);
  });
var scl = 5;
var bit = new Food;
function Food(){
  this.x = Math.random() * canvasGame.width;
  this.y = Math.random() * canvasGame.height;
  this.draw = function(){
    var holder = this.x / scl;
    holder = Math.round(holder);
    this.x = scl * holder;
    holder = this.y / scl;
    holder = Math.round(holder);
    this.y = scl * holder;
    ctxGame.beginPath();
    ctxGame.rect(this.x, this.y, scl, scl);
    ctxGame.fillStyle = 'green';
    ctxGame.fill();
  }
  this.update = function(){
    this.x = Math.random() * canvasGame.width;
    this.y = Math.random() * canvasGame.height;
    this.draw();
  }
}
var s;
s = new Snake(0, 0);
function Snake(x, y){
  this.x = x;
  this.y = y;
  this.total = 0;
  this.tail = [];
  this.xspeed = 1;
  this.yspeed = 0;
  this.life = 1;
  this.update = function(){
    if (this.total > 0){
      for (var i = 0; i < this.total-1; i++){
        this.tail[i].x = this.tail[i+1].x;
        this.tail[i].y = this.tail[i+1].y;
      }
      this.tail[this.total-1].x = this.x;
      this.tail[this.total-1].y = this.y;
    }
    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;
    if (this.x == canvasGame.width){
      this.x = 0;
    }
    if (this.x < 0){
      this.x = canvasGame.width;
    }
    if (this.y == canvasGame.height){
      this.y = 0;
    }
    if (this.y < 0){
      this.y = canvasGame.height;
    }
  }
  this.show = function(){
    ctxGame.beginPath();
    ctxGame.rect(this.x, this.y, scl, scl);
    ctxGame.fillStyle = 'black';
    ctxGame.strokeStyle = 'green';
    ctxGame.stroke();
    ctxGame.fill();
    for (var i = 0; i < this.total; i++){
      ctxGame.beginPath();
      ctxGame.rect(this.tail[i].x, this.tail[i].y, scl, scl);
      ctxGame.fillStyle = 'black';
      ctxGame.strokeStyle = 'green';
      ctxGame.stroke();
      ctxGame.fill();
    }
  }
  this.dir = function(x, y){
    if((this.xspeed == 0) && (x != 0)){
      this.xspeed = x;
      this.yspeed = 0;
    }
    if((this.yspeed == 0) && (y != 0)){
      this.xspeed = 0;
      this.yspeed = y;
    }
  }
  this.grow = function(){
    this.total++;
    console.log(this.total);
    this.tail.push(new Snake(this.x, this.y));
  }
  this.dead = function(){
    if(this.total > 4){
      for(var i = 1; i < this.total-1; i++){
        if (this.x == this.tail[i].x){
          if (this.y == this.tail[i].y){
            this.life = 0;
          }
        }
      }
    }
  }
}
function move(){
  document.onkeydown = function(event){
    var key_code = event.keyCode;
    console.log(key_code);
    if(key_code == 39){//right arrow
      s.dir(1, 0);
    }else if (key_code == 38){//up arrow
      s.dir(0, -1);
    }else if (key_code == 40){//down arrow
      s.dir(0, 1);
    }else if (key_code == 37){//left arrow
      s.dir(-1, 0);
    }
  }
}
function eat(snake, bite){
  if (snake.x == bite.x){
    if (snake.y == bite.y){
      snake.grow();
      bite.update();
      console.log("grow");
    }
  }
}
var more = new Food();
var fps = scl*4;
function animateGame(){
  setTimeout(function(){
    requestAnimationFrame(animateGame);
    ctxGame.clearRect(0, 0, canvas.width, canvas.height);
    if(s.life == 1){
      s.show();
      bit.draw();
      move();
      eat(s, bit);
      s.dead();
      s.update();
    }
  }, 1000/fps);
}
animateGame();
