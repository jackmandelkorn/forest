var globalSize = 7000;
var defaultWidth = 200;
var gif = false;
var globalResult;
var repeat = 2;

var w = new Worker('js/worker.js');
w.onmessage = function(e) {
  var result = JSON.parse(JSON.parse(e.data));
  globalResult = result;
  for (var i = 0; i < result.items.length; i++) {
    if (gif || result.items[i].mime !== "image/gif") {
      for (var a = 0; a < repeat; a++) {
        var width = defaultWidth + Math.round(Math.random() * (defaultWidth / 10));
        var height = Math.round((width / result.items[i].image.width) * result.items[i].image.height);
        var panel = new Panel(width,height,(Math.round(Math.random() * globalSize) - (globalSize / 2)),0,(Math.round(Math.random() * globalSize) - (globalSize / 2)),("background-image:url(" + result.items[i].link + ")"));
        panel.obj.onclick = function(){window.open(result.items[i].image.contextLink)};
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
