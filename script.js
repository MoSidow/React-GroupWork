const weatherAPIKey = '272b68b95d1c42ff7655c2f715fa4879';
const APIURL = 'https://api.openweathermap.org/';


var myLocation = document.getElementById('location');
var searchLocation = document.getElementById('search');

var fiveDayForecast = 5;

// Gets the location the user has submitted
function getLocation(){
  var userInput = myLocation.value;

  console.log('Pressed');

  lookUp(myLocation);
}

// Searches the weather for the location the user has entered, using the weather api to access up to date information
function lookUp(search){

  var queryAPI = `${weatherAPIKey}geo/1.0/direct?q=${search}&limit=5&appid=${APIURL}`

  fetch(queryAPI)

    .then((response) => response.json())

    .then(data => {

      // Sets the locations weather information (lat, lon, humidity, temp) into an array, in case there are other locations with similar names to it.
      const locationInput = data[0];

      console.log(locationInput)
    });
  
}

searchLocation.addEventListener("click", getLocation);
