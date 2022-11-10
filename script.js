const WEATHER_API_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = '272b68b95d1c42ff7655c2f715fa4879';


var myLocation = document.getElementById('location-input');
var searchLocation = document.getElementById('search');
var saveButton = document.getElementById("save-button")
var showtext = document.getElementById("your-location")

var fiveDayForecast = 6;

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

// Displays the weather for the next five days for the location submitted
function displayFutureForecast(forecastData){

  const futureTempValue = document.getElementById('daily-weather-box');
  futureTempValue.innerHTML = '';

  // Looping through the five days, displaying each day and its weather
  for(var i=1; i<fiveDayForecast; i++){
    var forecast = forecastData.daily[i];
    console.log(forecast);
    var day = new Date(forecast.dt * 1000).toLocaleDateString('en-GB', {weekday: 'long'});
    var temp = `${forecast.temp.day}°F`;

    var forecastList = document.createElement('div');
    forecastList.classList.add('daily-weather-style');
    // Creates the html tags for the next 5 days with the styles included
    forecastList.innerHTML = 
    `
    <div id="daily-weather-box">
      ${day}
    </div>

    <div id="daily-weather-box">
      ${temp}
    </div>
    `

    futureTempValue.appendChild(forecastList);
  }
}

// Retrives the weather for the current and future 5 days
function getWeather(lat, lon){

  // Fetches the url to include the locations weather infomation (wind speed/pressure, chances of rain)
  var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=d91f911bcf2c0f925fb6535547a5ddc9`

  console.log(queryURL);

  fetch(queryURL)
  .then(function (response) {
    return response.json();
  })

  .then(function(data){
    displayExtraInfo(data);

    displayFutureForecast(data);
  })

  
}

// Displays the extra information about the location other than its temperature for the current day the user has submitted it
// Examples: humidity, wind speed, chance of rain, pressure
function displayExtraInfo(forecastData){

  const extraInfo = forecastData.current;

  console.log(extraInfo);

  document.getElementById('temp-value').textContent = `Temperature: ${extraInfo.temp}°F`
  document.getElementById('humidity_value').textContent = `Humidity: ${extraInfo.humidity}%`
  document.getElementById('wind_gust_value').textContent = `Wind Gust: ${extraInfo.wind_gust}mph`
  document.getElementById('uvi-value').textContent = `UV Index: ${extraInfo.uvi}`
  document.getElementById('feels-like-value').textContent = `Feels Like: ${extraInfo.feels_like}°F`
  document.getElementById('wind-speed-value').textContent = `Wind Speed: ${extraInfo.wind_speed}km/h`

}

// Displays the weather forecast for the location and its country
function displayForecast(forecastData){
  document.getElementById('location-input').textContent = `${forecastData.name}`, `${forecastData.country}`;
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
  var input = document.getElementById('location-input');
  lookUp(savedLocation);
  lookupLocation(savedLocation)

  showtext1.innerHTML = savedLocation
  input.value = savedLocation

  
}

// function to display location on search history
function onSaveLocation() {

  var textval = document.getElementById("location-input").value;
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


