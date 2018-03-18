var w = new Worker('js/worker.js');

w.onmessage = function(e) {
  var result = e.data;
  console.log(result);
}


function search(query) {
  w.postMessage([query]);
}
