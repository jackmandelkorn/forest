var globalX = 0;
var globalY = 0;
var globalZ = 0;
var globalXDeg = 0;
var globalYDeg = 0;

class Panel {
  constructor(width, height, x, y, z, link, style) {
    Panel.all.push(this);
  	this.id = Math.random().toString(36).substr(2, 9);
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.z = z;
    this.obj = document.createElement("div");
    if (style) {
      this.obj.style = style;
    }
    this.update();
    this.obj.className = "panel";
    this.obj.id = this.id;
    this.obj.href = link;
    document.getElementById("main").appendChild(this.obj);
  }
  update() {
  	this.obj.style.width = this.width + "px";
    if (((this.z - globalZ) * -1) > (300 * Math.cos((globalXDeg * Math.PI) / 180))) {
      this.obj.style.zIndex = 1000000 - Math.floor(this.z * -1);
    }
    else {
      this.obj.style.zIndex = 1000000 - Math.floor(this.z * 1);
    }
    this.obj.style.height = this.height + "px";
    this.obj.style.margin = "0px -" + (this.width / 2) + "px";
    this.obj.style.transform = "rotateX(" + globalYDeg + "deg) rotateY(" + globalXDeg + "deg) translateX(" + (this.x - globalX) + "px) translateY(" + ((this.y - globalY) * -1) + "px) translateZ(" + ((this.z - globalZ) * -1) + "px)";
  }
}
Panel.all = new Array();

function updateAll() {
	for (var i = 0; i < Panel.all.length; i++) {
  	Panel.all[i].update();
  }
  updateGround();
}

function updateGround() {
  var ground = document.getElementById("ground");
  ground.style.height = (((window.innerHeight * (0.1 - (Math.sin((globalYDeg * Math.PI) / 180) / 2)))) - 5) + "px";
}

var speed = 20;
onKey(37,function(){
  globalZ -= -1 * Math.sin((globalXDeg * Math.PI) / 180) * speed;
  globalX -= Math.cos((globalXDeg * Math.PI) / 180) * speed * 1;
  updateAll();
});
onKey(38,function(){
  globalZ += Math.cos((globalXDeg * Math.PI) / 180) * speed;
  globalX += Math.sin((globalXDeg * Math.PI) / 180) * speed * 1;
  updateAll();
});
onKey(39,function(){
  globalZ += -1 * Math.sin((globalXDeg * Math.PI) / 180) * speed;
  globalX += Math.cos((globalXDeg * Math.PI) / 180) * speed * 1;
  updateAll();
});
onKey(40,function(){
  globalZ -= Math.cos((globalXDeg * Math.PI) / 180) * speed;
  globalX -= Math.sin((globalXDeg * Math.PI) / 180) * speed * 1;
  updateAll();
});

function mouseMove(event) {
  globalXDeg = ((event.clientX - (window.innerWidth / 2)) / window.innerWidth) * 2 * (215);
  globalYDeg = ((event.clientY - (window.innerHeight / 2)) / window.innerHeight) * -2 * (30);
  updateAll();
}
