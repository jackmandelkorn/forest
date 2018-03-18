//Onboard KeyMapping
var keyMap = [];
for (i = 0; i < 223; i++) {
  keyMap[i] = false;
}

document.onkeydown = function(e) {
    e = e || event;
    keyMap[e.keyCode] = true;
};

document.onkeyup = function(e) {
    e = e || event;
    keyMap[e.keyCode] = false;
};

function key(code) {
  return keyMap[code];
}

function onKey(code,execute,temporary) {
  var test = setInterval(function(){
  if (keyMap[code] === true) {
    (execute)();
    if (temporary) {
      clearInterval(test);
    }
  }
  },1000/30);
}
