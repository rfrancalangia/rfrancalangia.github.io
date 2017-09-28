var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove',
  function(event){
    mouse.x = event.x;
    mouse.y = event.y;
  });
function Droplet(radius, color, x, y, Xvelo, Yvelo){
  this.radius = radius;
  this.color = color;
  this.x = x;
  this.y = y;
  this.oy = y;
  this.Xvelo = Xvelo;
  this.Yvelo = Yvelo;
  this.drop = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, (Math.PI * 2) / 3);
    ctx.fillStyle = this.color;
    ctx.lineTo(this.x, this.y - 10);
    ctx.fill();
  }
  this.update = function(){
    if ((this.y - this.radius) > canvas.height){ //|| ((this.y - this.radius < 0))){
      this.y = 0;
      this.Xvelo = 0;
      this.x = Math.random() * canvas.width;
    }
    if (((this.x + this.radius) > canvas.width) || ((this.x - this.radius < 0))){
      this.Xvelo *= -1;
    }
    this.y += this.Yvelo;
    this.x += this.Xvelo;
    if ((mouse.x - this.x < 50) && (mouse.x - this.x > -50) && (this.y + 50 <= mouse.y) && (this.y + 50 >= mouse.y - 50)) {
        if ((mouse.x - this.x < 50) && (mouse.x - this.x > 0)) {
          this.Xvelo = -this.Yvelo / 2;
        }
        if ((mouse.x - this.x > -50) && (mouse.x - this.x < 0)) {
          this.Xvelo = this.Yvelo / 2;
        }
    } else if (this.Xvelo > 0){
      this.Xvelo -= .5;
    } else if (this.Xvelo < 0){
      this.Xvelo += .5;
    }
    this.drop();
  }
}
function size(){
  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();
}
function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(canvas.height);
  console.log(canvas.width);
}
var canvas = document.getElementById('background-animation');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var circleArray = [];
for (var i = 0; i < 2000; i++){
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var r = Math.round(Math.random() * 125);
  var v = Math.random() * 4 + 1;
  var b = Math.round(Math.random() * 255);
  var a = Math.random();
  circleArray.push(new Droplet(4, 'rgba('+r+',0,'+b+','+a+')', x, y, 0, v));
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < circleArray.length; i++){
    circleArray[i].update();
  }
}
size();
animate();
