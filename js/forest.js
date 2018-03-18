var globalSize = 1000;

var w = new Worker('js/worker.js');
w.onmessage = function(e) {
  var result = JSON.parse(JSON.parse(e.data));
  for (var i = 0; i < result.items.length; i++) {
    new Panel(result.items[i].width,result.items[i].height,(Math.round(Math.random() * globalSize) - (globalSize / 2)),0,(Math.round(Math.random() * globalSize) - (globalSize / 2)),("background-image:url(" + result.items[i].link + ")"));
  }
}

function search(query,amount) {
  w.postMessage([query,amount]);
}
