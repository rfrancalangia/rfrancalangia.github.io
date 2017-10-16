function Droplet(radius, color, x, y, Xvelo, Yvelo){
  this.radius = radius;
  this.color = color;
  this.x = x;
  this.y = y;
  this.Xvelo = Xvelo;
  this.Yvelo = Yvelo;
  // this.ctx = ctx;
  this.drop = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  this.update = function(){
    if (((this.y + this.radius) > canvas.height) || ((this.y - this.radius < 0))){
      this.Yvelo *= -1;
      // this.color = 'rgba('+r+','+g+','+b+','+a+')';
    }
    if (((this.x + this.radius) > canvas.width) || ((this.x - this.radius < 0))){
      this.Xvelo *= -1;
      // this.color = 'rgba('+r+','+g+','+b+','+a+')';
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
var d1 = new Droplet(20, "green", 50, 50, 5, 5);
var circleArray = [];
for (var i = 0; i < 100; i++){
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var r = Math.round(Math.random() * 255);
  var g = Math.round(Math.random() * 255);
  var b = Math.round(Math.random() * 255);
  var a = Math.random();
  circleArray.push(new Droplet(20, 'rgba('+r+',0,0,'+a+')', x, y, 5, 5));
}

// d1.drop();
function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  d1.update();
  for (var i = 0; i < circleArray.length; i++){
    circleArray[i].update();
  }
}
animate();
// function animate(){
//   requestAnimationFrame(animate);
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   var r = Math.round(Math.random() * 255);
//   var g = Math.round(Math.random() * 255);
//   var b = Math.round(Math.random() * 255);
//   var a = Math.random();
//   d1.drop();
//   if (((d1.y + d1.radius) >= canvas.height) || ((d1.y - d1.radius <= 0))){
//     Yvelo *= -1;
//     d1.color = 'rgba('+r+','+g+','+b+','+a+')';
//   }
//   if (((d1.x + d1.radius) >= canvas.width) || ((d1.x - d1.radius <= 0))){
//     Xvelo *= -1;
//     d1.color = 'rgba('+r+','+g+','+b+','+a+')';
//   }
//   d1.y += Yvelo;
//   d1.x += Xvelo;
// }
// for(var i = 0; i < 10; i++)
//   animate();

  // for(var i = 0; i < 100; i++)
  // {
  //   var x = Math.random();
  //
  //   var y = Math.random();
  //   var r = Math.round(Math.random() * 255);
  //   var g = Math.round(Math.random() * 255);
  //   var b = Math.round(Math.random() * 255);
  //   var a = Math.random();
  //   d1.x = x * canvas.width;
  //   d1.y = y * canvas.height;
  //   d1.color = 'rgba('+r+','+g+','+b+','+a+')'
  //   d1.drop();
  // }
