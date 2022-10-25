function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="weather-forecast-day">${formatDay(
                  forecastDay.dt
                )} </div>
                <div class="weather-forecast-temperature">
                <span class="weather-forecast-temp-max">${Math.round(
                  forecastDay.temp.max
                )}°C/</span>
                <span class="weather-forecast-temp-min">${Math.round(
                  forecastDay.temp.min
                )}°C</span>
                </div>
                <img  class="icon"  src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
              alt="icon-weather" />
                </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  showTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(showTemp);
  document.querySelector("#chosen-city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#actual-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function geoLocation(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function search(city) {
  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(`#input-city`);
  search(cityInput.value);
}

let form = document.querySelector(`#city-form`);
form.addEventListener(`submit`, enterCity);

let button = document.querySelector("#button");
button.addEventListener("click", geoLocation);
//change time

let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let changeDay = document.querySelector(`#changeDay`);
changeDay.innerHTML = `${day}`;
let changeTime = document.querySelector(`#changeTime`);
changeTime.innerHTML = `${hours}:${minutes}`;

//Unit change

function changeTemperatureToFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (showTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function changeTemperatureToCelsius(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(showTemp);
}
let showTemp = null;
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeTemperatureToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeTemperatureToCelsius);
search("Amsterdam");
