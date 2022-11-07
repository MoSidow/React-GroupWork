const APIURL = "https://api.openweathermap.org";
const APIKEY = "272b68b95d1c42ff7655c2f715fa4879";


var myLocation = document.getElementById('location');
var searchLocation = document.getElementById('search');

var fiveDayForecast = 5;

// Gets the location the user has submitted
function getLocation(){
  var userInput = myLocation.value;

  console.log('Pressed');

  // Outputs the result of the function once the user has searched for their desired location
  lookUp(userInput);
}

// Searches the weather for the location the user has entered, using the weather api to access up to date information
function lookUp(search){

  var queryAPI = `${APIURL}/geo/1.0/direct?q=${search}&limit=5&appid=${APIKEY}`;

  fetch(queryAPI)
    .then((response) => response.json())

    .then(data => {

      // Sets the locations weather information (lat, lon, humidity, temp) into an array, displaying it into the console
      const locationInput = data[0];

      console.log(locationInput)
    });
  
  
}

searchLocation.addEventListener("click", getLocation);
