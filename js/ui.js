const body = document.querySelector('#body');
const cityForm = document.querySelector('#cityForm');
const txtCity = document.querySelector('#city');
const lblLocation = document.querySelector('#location');
const lblDate = document.querySelector('#date');
const lblHumidity = document.querySelector('#humidity');
const lblWindSpeed = document.querySelector('#wind-speed');
const lblWindDegree = document.querySelector('#wind-degree');

const dayElements  = document.querySelectorAll('.day');
const tempElements = document.querySelectorAll('.temp');
const weatherIconElements = document.querySelectorAll('.weather-icon');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const DEFAULT_CITY = "Mumbai";
const TIME_HOUR = 18;
const iconBasePath = "./images/icons/";

cityForm.addEventListener('submit', processWeatherRequest);
document.addEventListener('DOMContentLoaded', onLoadWeather);

function render(weatherInfoResponse) {
    const cityInfo = weatherInfoResponse.city;
    const weatherInfos = weatherInfoResponse.list;

    lblLocation.innerHTML = cityInfo.name;
    const filterdWeatherInfos = getFilteredWeatherInfos(weatherInfos);
    filterdWeatherInfos.forEach((weatherInfo, index) => {
        const currentDateTime = new Date(weatherInfo.dt_txt);
        dayElements[index].innerHTML = days[currentDateTime.getDay()];

        const currentTemp = Math.round(weatherInfo.main.temp);
        // console.log(weatherInfo.main.temp);
        // console.log(currentTemp)
        tempElements[index].innerHTML = `${currentTemp}<sup>o</sup>`;

        const iconName = weatherInfo.weather[0].icon;
        const iconPath = iconBasePath + iconName + ".svg";
        weatherIconElements[index].setAttribute('src', iconPath);

        if(index === 0) {
            const currentMonth = months[currentDateTime.getMonth()];
            lblDate.innerHTML = currentDateTime.getDate() + " " + currentMonth;

            lblHumidity.innerHTML = weatherInfo.main.humidity + "%";

            const windSpeed = (weatherInfo.wind.speed * 3.6).toFixed(1);
            lblWindSpeed.innerHTML = windSpeed + "kmph";

            lblWindDegree.innerHTML = weatherInfo.wind.deg + "<sup>o</sup>";
        }
    });
}

function getFilteredWeatherInfos(weatherInfos) {
    // console.log(weatherInfos);
    // const data = weatherInfos.filter(weatherInfo => {
    //     const currentDateTime = new Date(weatherInfo.dt_txt);
    //     return currentDateTime.getHours() === TIME_HOUR;
    // });
    let data = new Array();
    for(let i = 0; i < 5; i++) {
        data[i] = weatherInfos[i];
    }
    console.log(data)
    return data;
}

function onLoadWeather(evt) {
    let lat;
    let long;
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        getWeatherfromLatLong(lat, long)
        .then(data => render(data))
        .catch(err => console.warn(err));
    });
    getWeatherfromLatLong(lat, long)
        .then(data => render(data))
        .catch(err => console.warn(err));
}

function processWeatherRequest(evt) {
    evt.preventDefault();
    let cityName = txtCity.value;
    if(cityName === "") {
        cityName = DEFAULT_CITY;
    }

    getWeather(cityName) 
      .then(data => render(data))
      .catch(err => alert("hey it seems you have entered wrong city name!"));
}
