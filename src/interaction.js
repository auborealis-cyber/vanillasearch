let now = new Date();
console.log(now.getDate());

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let h4 = document.querySelector("h4");
let minutes = now.getMinutes();
let date = now.getDate();
let year = now.getFullYear();

function getCurrentTime() {
  let now = new Date();
  let hour = now.getHours();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return hour + ":" + minutes;
}
let currentTime = getCurrentTime();
h4.innerHTML = `It is ${currentTime} on ${day},  ${month} ${date}, ${year}`;

//Part 2
function showCityValue(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  alert("The city you entered is " + cityInput.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;
}

window.onload = function () {
  let cityForm = document.querySelector("#search-form");
  cityForm.addEventListener("submit", showCityValue);
};

//Part 3: Temperature Conversions
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = parseFloat(temperatureElement.innerHTML);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = parseFloat(temperatureElement.innerHTML);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let fahrenheitLink = document.querySelector("#toFahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#toCelsius");
celsiusLink.addEventListener("click", convertToCelsius);

//Week 5

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
