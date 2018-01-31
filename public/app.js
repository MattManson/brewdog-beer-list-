var makeRequest = function(url, callback){
  request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var populateList = function(beers){
  var ul = document.querySelector('#beer-list');
  beers.forEach(function(beer){
    var li = document.createElement('li');
    li.innerText = beer.name;
    ul.appendChild(li);
  });
}


var requestComplete = function(){
  if(this.status !== 200)return;
  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);
  save(beers);
}

var save = function(beers) {
    var storedBeers = JSON.stringify(beers)
    localStorage.setItem('beers', storedBeers);
}

var app = function(){
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);
  var beers = JSON.parse(localStorage.getItem('beers')) || [];
  populateList(beers);
  // select.addEventListener('change', function(event){
  //   var beer = beers[event.target.value];
}

document.addEventListener('DOMContentLoaded', app);
