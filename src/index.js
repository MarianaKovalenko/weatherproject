// date
let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[date.getDay()];
let hour = date.getHours();
let minute = date.getMinutes();
function curentDate() {
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let curentDate = document.querySelector("#curently-date");
  return `${day}: ${hour}:${minute}`;
}
let showDate = document.querySelector("#curently-date");
showDate.innerHTML = curentDate();

// city

let buttonSearch = document.querySelector("#search");
function showCityWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("h1");
  let currentTemp = document.querySelector("#curent-temp");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let minTemp = document.querySelector("#min-temp");
  let maxTemp = document.querySelector("#max-temp");
  let apiKey = "34ae1065362d42545661451bda2b8a1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    let cityInputApi = response.data.name.toUpperCase();
    let currentTempApi = Math.round(response.data.main.temp);
    let humidityApi = response.data.main.humidity;
    let windApi = Math.round(response.data.wind.speed);
    let descriptionApi = response.data.weather[0].main;
    let minTempApi = Math.round(response.data.main.temp_min);
    let maxTempApi = Math.round(response.data.main.temp_max);
    city.innerHTML = cityInputApi;
    currentTemp.innerHTML = currentTempApi;
    humidity.innerHTML = `Humidity: ${humidityApi}%`;
    wind.innerHTML = `Wind: ${windApi} km/h`;
    description.innerHTML = descriptionApi;
    minTemp.innerHTML = `min ${minTempApi}°C |°F`;
    maxTemp.innerHTML = `max ${maxTempApi}°C |°F`;
  });
}

buttonSearch.addEventListener("click", showCityWeather);
// let cTemp = document.querySelector("#C-temp");
// function showCTemp() {
// curentTemp.innerHTML = `${Math.round(
// weather[cityInput.value.trim().toLowerCase()].temp
// )}`;
// }
// cTemp.addEventListener("click", showCTemp);

// let fTemp = document.querySelector("#F-temp");
// function showFTemp() {
// curentTemp.innerHTML = `${Math.round(
// (weather[cityInput.value.trim().toLowerCase()].temp * 9) / 5 + 32
// )}`;
// }
// fTemp.addEventListener("click", showFTemp);

// temp curren location
let location = document.querySelector("#location");
function currentTemp(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#curent-temp");
  currentTemp.innerHTML = temp;
  let nameLoc = document.querySelector("h1");
  nameLoc.innerHTML = response.data.name.toUpperCase();
  let humidity = document.querySelector("#humidity");
  let humidityApi = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${humidityApi}%`;
  let wind = document.querySelector("#wind");
  let windApi = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windApi} km/h`;
  let description = document.querySelector("#description");
  let descriptionApi = response.data.weather[0].main;
  description.innerHTML = descriptionApi;
  let minTemp = document.querySelector("#min-temp");
  let minTempApi = Math.round(response.data.main.temp_min);
  minTemp.innerHTML = `min ${minTempApi}°C |°F`;
  let maxTemp = document.querySelector("#max-temp");
  let maxTempApi = Math.round(response.data.main.temp_max);
  maxTemp.innerHTML = `max ${maxTempApi}°C |°F`;
}
function showMylocation(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "34ae1065362d42545661451bda2b8a1f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let part = "current";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}

function currentTempLocal(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMylocation);
}
location.addEventListener("click", currentTempLocal);
