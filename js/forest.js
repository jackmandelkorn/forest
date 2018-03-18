var globalSize = 1000;
var defaultWidth = 150;
var globalResult;

var w = new Worker('js/worker.js');
w.onmessage = function(e) {
  var result = JSON.parse(JSON.parse(e.data));
  globalResult = result;
  for (var i = 0; i < result.items.length; i++) {
    var width = defaultWidth + Math.round(Math.random() * 10);
    var height = Math.round((width / result.items[i].image.width) * result.items[i].image.height);
    new Panel(width,height,(Math.round(Math.random() * globalSize) - (globalSize / 2)),0,(Math.round(Math.random() * globalSize) - (globalSize / 2)),("background-image:url(" + result.items[i].link + ")"));
  }
}

function search(query,amount) {
  if (!amount) {
    var amount = 100;
  }
  w.postMessage([query,amount]);
}
