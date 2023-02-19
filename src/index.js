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
  let iconElement = document.querySelector("#icon");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let minTemp = document.querySelector("#min-temp");
  let maxTemp = document.querySelector("#max-temp");
  let apiKey = "34ae1065362d42545661451bda2b8a1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    console.log(response.data);
    let cityInputApi = response.data.name.toUpperCase();
    let currentTempApi = Math.round(response.data.main.temp);
    let humidityApi = response.data.main.humidity;
    let windApi = Math.round(response.data.wind.speed);
    let descriptionApi = response.data.weather[0].main;
    let minTempApi = Math.round(response.data.main.temp_min);
    let maxTempApi = Math.round(response.data.main.temp_max);
    city.innerHTML = cityInputApi;
    let citylength = city.innerHTML.length;
    if (citylength > 6) {
      city.style.fontSize = "22px";
    } else {
      city.style.fontSize = "35px";
    }
    currentTemp.innerHTML = currentTempApi;
    // functions Fahrenheit and Celsius
    let fTemp = document.querySelector("#F-temp");
    function showFTemp(event) {
      event.preventDefault();
      currentTemp.innerHTML = Math.round(
        (response.data.main.temp * 9) / 5 + 32
      );
    }
    fTemp.addEventListener("click", showFTemp);
    let cTemp = document.querySelector("#C-temp");
    function showCTemp(event) {
      event.preventDefault();
      currentTemp.innerHTML = Math.round(response.data.main.temp);
    }
    cTemp.addEventListener("click", showCTemp);
    // changing weather-icons
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    humidity.innerHTML = `Humidity: ${humidityApi}%`;
    wind.innerHTML = `Wind: ${windApi} km/h`;
    description.innerHTML = descriptionApi;
    minTemp.innerHTML = `min ${minTempApi}°C |°F`;
    maxTemp.innerHTML = `max ${maxTempApi}°C |°F`;
  });
}
buttonSearch.addEventListener("click", showCityWeather);

// temp current location
let location = document.querySelector("#location");
function currentTemp(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#curent-temp");
  currentTemp.innerHTML = temp;
  // functions Fahrenheit and Celsius
  let fTemp = document.querySelector("#F-temp");
  function showFTemp(event) {
    event.preventDefault();
    currentTemp.innerHTML = Math.round((response.data.main.temp * 9) / 5 + 32);
  }
  fTemp.addEventListener("click", showFTemp);
  let cTemp = document.querySelector("#C-temp");
  function showCTemp(event) {
    event.preventDefault();
    currentTemp.innerHTML = Math.round(response.data.main.temp);
  }
  cTemp.addEventListener("click", showCTemp);
  // Lenght of Location's name
  let nameLoc = document.querySelector("h1");
  nameLoc.innerHTML = response.data.name.toUpperCase();
  let nameLocLength = nameLoc.innerHTML.length;
  if (nameLocLength > 6) {
    nameLoc.style.fontSize = "22px";
  } else {
    nameLoc.style.fontSize = "35px";
  }
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
  minTemp.innerHTML = minTempApi;
  // function F and C for min temperature
  let FTempMin=document.querySelector("#F-tempMin")
  
  function showMinTempF(event){
    event.preventDefault();
    minTemp.innerHTML = Math.round((response.data.main.temp_min*9)/5+32);
  };
  FTempMin.addEventListener("click", showMinTempF);

  let CTempMin=document.querySelector("#C-tempMin");

  function showMinTempC(event){
    event.preventDefault();
    minTemp.inner=Math.round(response.data.main.temp_min);
  };
  CTempMin.addEventListener("click",showMinTempC);

  let maxTemp = document.querySelector("#max-temp");
  let maxTempApi = Math.round(response.data.main.temp_max);
  maxTemp.innerHTML = maxTempApi;
  let FTempMax = document.querySelector("#F-tempMax");
  function showMaxTempF(event){
    event.preventDefault();
    maxTemp.innerHTML = Math.round(response.data.main.temp_max*9/5+32);
  }
  FTempMax.addEventListener("click", showMaxTempF);
  let CTempMax = document.querySelector("#C-tempMax");
  function showMaxTempC(event){
    event.preventDefault();
    maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  };
  CTempMax.addEventListener("click", showMaxTempC);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

let cTemp = document.querySelector("#C-temp");
function showCTemp() {
  currentTemp.innerHTML = 10;
}
cTemp.addEventListener("click", showCTemp);
