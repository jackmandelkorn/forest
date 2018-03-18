//when the worker receives a message
onmessage = function(e) {
  var query = e.data[0];
  search(query,function(data){
    postMessage(JSON.stringify(data));
  },true);
}

//run google search (image or regular)
function search(searchTerm,callback,image) {
  var endpoint = "https://www.googleapis.com/customsearch/v1?key=AIzaSyA-y6-ILMJbJMCfBKn3oDBfrZ4qMn-c51w&cx=012647276964435196336:r1urwy9ecum";
  if (image) {
    endpoint += "&searchType=image";
  }
  endpoint += ("&q=" + encodeURIComponent(searchTerm));
  $.ajax({
    method: "GET",
    url: endpoint,
    success: function(data){
      (callback)(data);
    }
  });
}
