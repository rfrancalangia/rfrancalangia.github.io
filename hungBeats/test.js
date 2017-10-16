function draw(x, y) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.save();
  ctx.clearRect(0, 0, 800, 800);
  canvas.width = canvas.scrollWidth;
  canvas.height = canvas.scrollHeight;
  //ctx.fillStyle = "rgba(0, 200, 0 1)";
  var image = new Image();
  image.src = 'intheStudio.jpeg';

  function rotateImage(ctx, image, x, y, width, height, rotation)
  {
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    ctx.save();
    ctx.translate(x+halfWidth, y+halfHeight);
    ctx.rotate(rotation);
    ctx.drawImage(image, -halfWidth, -halfHeight, width, height);
    ctx.restore();
  }
  function place(ctx, image)
  {
    if (!image.complete) {
      setTimeout(function(){
        place(ctx, image);
      }, 200);
      return;
    }
    ctx.drawImage(image, 20, 20, 160, 300);
    rotateImage(ctx, image, 420, 20, 160, 300, Math.PI / 4);
  }
  place(ctx, image);
  ctx.fillStyle = 'red';
  ctx.fillRect (x, 20, 50, 50);
  ctx.strokeStyle = 'green';
  ctx.strokeRect(250, 50, 100, 100);
  ctx.fillStyle = 'blue';
        //ctx.arc(x, y, radius, startRadian, endRadian)
  ctx.beginPath();
  ctx.arc(400, 100, 50, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(600, 100, 50, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(700, 100, 50, 0, Math.PI / 2);
  ctx.lineTo(700, 100);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(200, 100);
  ctx.moveTo(100, 200);
  ctx.lineTo(50, 100);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(150, 150);
  ctx.lineTo(250, 150);
  ctx.lineTo(150, 250);
  ctx.lineTo(100, 150);
  ctx.fill();

  ctx.restore();
  x+=5;
  var loopTimer = setTimeout('draw('+x+', '+y+')', 200);
}
var person = {
  name: "rob",
  age: 42,
  height: 1.72,
  speak: function() {
    console.log("Hi, I'm " + this.name + "!");
  }
};
person.age = 58;
delete person.height;
function Person(name, age, height) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.speak = function(){
    console.log("hi, I'm " + this.name + "!");
  }
}
var p1 = new Person("Rob", 42, 1.72);
console.log(p1.name);
