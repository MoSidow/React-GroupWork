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

  fetch(
    `${APIURL}/geo/1.0/direct?q=${search}&limit=5&appid=${APIKEY}`  
    )
    .then((response) => response.json())

    .then(data => {

      // Sets the locations weather information (lat, lon, humidity, temp) into an object, displaying it into the console
      const locationInput = data[0];

      console.log(locationInput);
    });
  
  
}

// Displays the weather for the day it is searched for, including the temperature, wind speed and humidity
function displayCurrentForecast(forecastData){

  const currentForecast = forecastData.current;

  document.getElementById('temperature-value').textContent = "Temperature: ${currentForecast.temp}°C";
  document.getElementById('humidity-value').textContent = "Humidity: ${currentForecast.humidity}%";
  document.getElementById('wind-speed-value').textContent = "Wind Speed: ${currentForecast.wind}KM/H";
}

// Retrieves both the current and future weather forecasts for the location, displaying both of them onscreen.
function getWeather(lat, lon){

  fetch(
    `${APIURL}/data/2.5/onecall?lat=${lat}&lon=${lon}&limit=5&appid=${APIKEY}`
    )

    .then(function (response){
      return response.json();
    })

    .then(function (data){
      displayCurrentForecast(data);
    })
}


searchLocation.addEventListener("click", getLocation);




searchLocation.addEventListener("click", function () {
    var searchText = document.getElementById("location");  
    var showtext = document.getElementById("your-location")
    
    showtext.innerHTML = searchText.value;
    
});