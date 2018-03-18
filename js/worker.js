onmessage = function(e) {
  var query = e.data[0];
  var amount = e.data[1];
  search(query,0,amount,function(data){
    postMessage(JSON.stringify(data));
  },true);
}

//run google search (image or regular)
function search(searchTerm,i,total,callback,image) {
  if (i < total) {
    var start = Math.floor(i / 10) * 10;
    var num = 10;
    if (total - start < 10) {
      num = total - start;
    }
    var endpoint = "https://www.googleapis.com/customsearch/v1?key=AIzaSyA-y6-ILMJbJMCfBKn3oDBfrZ4qMn-c51w&cx=012647276964435196336:r1urwy9ecum";
    if (image) {
      endpoint += "&searchType=image";
    }
    endpoint += "&num=" + encodeURIComponent(num);
    if (start !== 0) {
      endpoint += "&start=" + encodeURIComponent(start);
    }
    endpoint += ("&q=" + encodeURIComponent(searchTerm));
    ajax(endpoint,{},function(data){
      search(searchTerm,(i + num),total,callback,image);
      (callback)(data);
    },"GET");
  }
}

//ajax request
var ajax = function(url, data, callback, type) {
  var data_array, data_string, idx, req, value;
  if (data == null) {
    data = {};
  }
  if (callback == null) {
    callback = function() {};
  }
  if (type == null) {
    type = 'GET';
  }
  data_array = [];
  for (idx in data) {
    value = data[idx];
    data_array.push("" + idx + "=" + value);
  }
  data_string = data_array.join("&");
  req = new XMLHttpRequest();
  req.open(type, url, false);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.onreadystatechange = function() {
    if (req.readyState === 4 && req.status === 200) {
      (callback)(req.responseText);
    }
  };
  req.send(data_string);
  return req;
};
