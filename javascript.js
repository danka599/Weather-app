function showTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(`#input-city`);

  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let form = document.querySelector(`#city-form`);
form.addEventListener(`submit`, enterCity);
let button = document.querySelector("#button");
button.addEventListener("click", geoLocation);
//challenge 2

let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satuday",
];
let day = days[date.getDay()];
let hours = date.getHours();
let minutes = date.getMinutes();
let changeDay = document.querySelector(`#changeDay`);
changeDay.innerHTML = `${day}`;
let changeTime = document.querySelector(`#changeTime`);
changeTime.innerHTML = `${hours}:${minutes}`;

//challenge 3

function changeTemperature(event) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "66";
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeTemperature);

function changeTemperatureToCelsius(event) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "16";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeTemperatureToCelsius);
