function Droplet(radius, color, x, y, Xvelo, Yvelo){
  this.radius = radius;
  this.color = color;
  this.x = x;
  this.y = y;
  this.Xvelo = Xvelo;
  this.Yvelo = Yvelo;
  this.drop = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, (Math.PI * 2) / 3);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  this.update = function(){
    if ((this.y - this.radius) > canvas.height){ //|| ((this.y - this.radius < 0))){
      this.y = 0;
    }
    if (((this.x + this.radius) > canvas.width) || ((this.x - this.radius < 0))){
      this.Xvelo *= -1;
    }
    this.y += this.Yvelo;
    this.x += this.Xvelo;
    this.drop();
  }
}
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var circleArray = [];
for (var i = 0; i < 3000; i++){
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var r = Math.round(Math.random() * 255) / 2;
  var v = Math.random() * 6 + 1;
  var b = Math.round(Math.random() * 255);
  var a = Math.random();
  circleArray.push(new Droplet(7, 'rgba('+r+',0,'+b+','+a+')', x, y, 0, v));
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < circleArray.length; i++){
    circleArray[i].update();
  }
}
animate();
