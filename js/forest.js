var w = new Worker('js/worker.js');

w.onmessage = function(e) {
  var result = JSON.parse(e.data);
  console.log(result);
}


function search(query,amount) {
  w.postMessage([query,amount]);
}
