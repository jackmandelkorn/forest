init(300,14000,14000);
updateAll();

function init(amt,dimX,dimY) {
  speed = 30;
  for (var i = 0; i < amt; i++) {
    var radius = Math.floor(Math.random() * 100) + 50;
    var height = radius * (1 * Math.floor((Math.random() * 7) + 7));
    var sides = 4;
    tower(sides,radius,height,Math.floor((Math.random() * dimX) - (dimX / 2)),Math.floor((Math.random() * dimY) - (dimY / 2)));
  }
}

function tower(sides,radius,height,centerX,centerY) {
  for (var i = 0; i < sides; i++) {
    var sidelength = Math.sin(((2 * Math.PI) / sides) / 2) * radius * 2;
    var x = centerX + ((Math.cos(((2 * Math.PI) / sides) * i)) * radius * (Math.cos(((2 * Math.PI) / sides) / 2)));
    var y = centerY + ((Math.sin(((2 * Math.PI) / sides) * i)) * radius * (Math.cos(((2 * Math.PI) / sides) / 2)));
    var rotation = ((360 / sides) * (i)) + 90;
    var color = 0;
    var style = "background-color:rgb(" + color + "," + color + "," + color + ");border:8px solid lime;";
    new Panel(sidelength,height,x,0,y,rotation,style);
  }
}


function footerClick() {
  window.open("http://jackmandelkorn.com");
}
