var globalSize = 7000;
var radius = 100;
var defaultWidth = 200;
var gif = false;
var globalResult;
var clear = false;
var repeat = 2;

initPanel();
updateAll();

var w = new Worker('js/worker.js');
w.onmessage = function(e) {
  var result = JSON.parse(JSON.parse(e.data));
  globalResult = result;
  document.getElementById("clear-button").className = "panel-button";
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
        clear = true;
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
  var panel = new Panel(700,400,0,50,0,0,"background-color:#0f0f0f;");
    var el = panel.obj;
  el.className = "panel panel-flex safe";
  var title = document.createElement("h1");
  title.id = "panel-title";
  title.innerHTML = "forest.js";
  var p = document.createElement("p");
  p.id = "panel-subtitle";
  p.innerHTML = "image searching reimagined";
  var input = document.createElement("input");
  input.id = "panel-input";
  input.type = "text";
  input.spellcheck = false;
  input.maxLength = 32;
  input.placeholder = "search...";
  input.onchange = inputChange;
  input.onkeypress = inputChange;
  input.onkeydown = inputChange;
  input.onkeyup = inputChange;
  var buttonContainer = document.createElement("div");
  buttonContainer.style.marginTop = "20px";
  buttonContainer.style.marginBottom = "20px";
    var b1 = document.createElement("button");
    b1.className = "panel-button disabled";
    b1.id = "search-button";
    b1.innerHTML = "ADD SEARCH";
    b1.onclick = searchClick;
    var b2 = document.createElement("button");
    b2.className = "panel-button disabled";
    b2.id = "clear-button";
    b2.innerHTML = "CLEAR";
    b2.onclick = clearClick;
    buttonContainer.appendChild(b1);
    buttonContainer.appendChild(b2);
  var bottom = document.createElement("p");
  bottom.id = "panel-bottom";
  bottom.innerHTML = "0 results";
  el.appendChild(title);
  el.appendChild(p);
  el.appendChild(input);
  el.appendChild(buttonContainer);
  el.appendChild(bottom);
  input.focus();
}

function inputChange() {
  var input = document.getElementById("panel-input");
  if (input.value.length > 0 && input.value.length < 33) {
    document.getElementById("search-button").className = "panel-button";
  }
  else {
    document.getElementById("search-button").className = "panel-button disabled";
  }
}

function searchClick() {
  var button = document.getElementById("search-button");
  if (!button.className.includes("disabled")) {
    search(document.getElementById("panel-input").value);
    document.getElementById("panel-input").value = "";
  }
}

function clearClick() {
  var button = document.getElementById("clear-button");
  if (clear) {
    for (var i = 0; i < Panel.all.length; i++) {
      if (!Panel.all[i].obj.className.includes("safe")) {
        Panel.all[i].obj.remove();
      }
    }
    clear = false;
    button.className = "panel-button disabled";
  }
}
