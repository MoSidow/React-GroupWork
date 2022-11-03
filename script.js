// function for google maps api

function initMap() {
   
  const uluru = { lat: -25.344, lng: 131.031 };
 
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

window.initMap = initMap;



var mylocation = document.getElementById('#location');
var searchLocation = document.getElementById('#search');

var weatherAPIKey = '272b68b95d1c42ff7655c2f715fa4879';
var APIURL = 'https://api.openweathermap.org/';

var fiveDayForecast = 5;

// Gets the location the user has submitted
function getLocation(e){
  var userInput = location.value;
  console.log('Searching');
}

searchLocation.addEventListener("click", getLocation);
