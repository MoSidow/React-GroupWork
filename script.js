const WEATHER_API_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = '272b68b95d1c42ff7655c2f715fa4879';


var myLocation = document.getElementById('location');
var searchLocation = document.getElementById('search');
var saveButton = document.getElementById("save-button")
var showtext = document.getElementById("your-location")

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

  var apiURL = `${WEATHER_API_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`

  fetch(apiURL)
    .then((response) => response.json())

    .then(data => {

      // Sets the locations weather information (lat, lon, humidity, temp) into an object, displaying it into the console
      const locationInput = data[0];

      console.log(locationInput);

      displayForecast(locationInput);
    });
  
  
}

// Displays the weather for the day it is searched for, including the temperature, wind speed and humidity
function displayCurrentForecast(forecastData){

  var currentForecast = forecastData.current;

  document.getElementById('daily-weather-box').textContent = `${currentForecast.temp_value}°C`;
  document.getElementById('daily-weather-box').textContent = `${currentForecast.humidity}%`;
  document.getElementById('daily-weather-box').textContent = `${currentForecast.wind_speed}KM/H`;
}

// Retrives the weather for the current and future 5 days
function getWeather(lat, lon){

  // var queryURL = `${WEATHER_API_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

  var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=d91f911bcf2c0f925fb6535547a5ddc9`

  console.log(queryURL);

  fetch(queryURL)
  .then(function (response) {
    return response.json();
  })

  .then(function(data){
    displayCurrentForecast(data);

    displayFutureForecast(data);
  })

  
}

// Lists the future 5-day forecast for the location submitted
function displayFutureForecast(forecastData){
  // forecastData.daily;

  const forecastList = document.getElementById('extra-weather-info');
  forecastList.innerHTML = '';

  // Logs the data for the forecast into the console, displaying the weather every 3 hours

  for(var i=0; i<fiveDayForecast; i++){
    var forecast = forecastData.daily[i];
    console.log(forecast);
    var day = new Date(forecast.dt * 1000).toLocaleDateString('en-GB', {weekday: 'long'});
    var temp = `${forecast.temp_value}`;
    var humidity = `${forecast.humidity}%`;
    var wind = `${forecast.wind_speed}km/h`;

    var newForecast = document.createElement('div');
    newForecast.classList.add('extra-weather-info');
    // Adds the html tags for the next 5 day forecast
    newForecast.innerHTML =
    `<div class='extra-weather-info'>
      <div>
        <p>${day}</p>
      </div>

      <div>
        <p>${temp}</p>
      </div>

      <div>
        <p>${humidity}</p>
      </div>

      <div>
        <p>${wind}</p>
      </div>
    </div>`

    forecastList.appendChild(newForecast);
  }
}

function displayForecast(forecastData){
  document.getElementById('location').textContent = `${forecastData.name}`, `${forecastData.country}`;
  console.log(forecastData);
  getWeather(forecastData.lat, forecastData.lon);
}



searchLocation.addEventListener("click", getLocation);



// Displays user location on "your location" when location is searched
searchLocation.addEventListener("click", function () {
    var searchText = myLocation;  
    var showtext1 = showtext
    
    showtext1.innerHTML = searchText.value;
    
});




function onSavedLocationClick(e) {
  var savedLocation = e.target.textContent;
  var showtext1 = document.getElementById("your-location")
  var input = document.getElementById('location');
  lookUp(savedLocation);
  lookupLocation(savedLocation)

  showtext1.innerHTML = savedLocation
  input.value = savedLocation

  
}

// function to display location on search history
function onSaveLocation() {

  var textval = document.getElementById("location").value;
  listItem = document.getElementById("appended-location");

  liItem = document.createElement("li");
  liItem.textContent = textval;
  liItem.addEventListener("click", onSavedLocationClick);
  listItem.appendChild(liItem);

  console.log(liItem)

  var cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities.push(textval);

  localStorage.setItem('cities', JSON.stringify(cities));
}

function loadSavedLocations() {
  var cities = JSON.parse(localStorage.getItem("cities")) || [];

  listItem = document.getElementById("appended-location");
  cities.forEach(function (city) {
    var liItem = document.createElement("li");
    liItem.textContent = city;
    liItem.addEventListener("click", onSavedLocationClick);

    listItem.appendChild(liItem);
  });
}

loadSavedLocations();

saveButton.addEventListener("click", onSaveLocation)


