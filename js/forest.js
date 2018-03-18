var globalSize = 7000;
var radius = 100;
var defaultWidth = 200;
var gif = false;
var globalResult;
var repeat = 2;

initPanel();
updateAll();

var w = new Worker('js/worker.js');
w.onmessage = function(e) {
  var result = JSON.parse(JSON.parse(e.data));
  globalResult = result;
  for (var i = 0; i < result.items.length; i++) {
    if (gif || result.items[i].mime !== "image/gif") {
      for (var a = 0; a < repeat; a++) {
        var width = defaultWidth + Math.round(Math.random() * (defaultWidth / 10));
        var height = Math.round((width / result.items[i].image.width) * result.items[i].image.height);
        var x = (Math.round(Math.random() * globalSize) - (globalSize / 2));
        var z = (Math.round(Math.random() * globalSize) - (globalSize / 2));
        x += ((Math.abs(x) / x) * radius);
        z += ((Math.abs(z) / z) * radius);
        var panel = new Panel(width,height,x,0,z,Math.round(Math.random() * 180),("background-image:url(" + result.items[i].link + ")"));
        var num = i;
        panel.obj.onclick = function(){window.open(result.items.slice()[num].image.contextLink);};
        panel.obj.style.cursor = "pointer";
      }
    }
  }
}

function search(query,amount) {
  if (!amount) {
    var amount = 100;
  }
  w.postMessage([query,amount]);
}

function initPanel() {
  var panel = new Panel(700,400,0,50,0,0,"background-color:black;");
    var el = panel.obj;
  el.className = "panel panel-flex";

}
