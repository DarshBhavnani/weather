const API_KEY = "47d5e1909923207c4eedf30cbc5167c6";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

const http = new slHTTP();

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

async function getWeatherfromLatLong(lat, long) {
    let queryString = `?units=metric&lat=${lat}&lon=${long}&appid=${API_KEY}`;
    const URL = BASE_URL + queryString;
    const data = await http.get(URL);
    console.log(data);
    return data;
}

async function getWeather(cityName) {
    let queryString = `?units=metric&q=${cityName}&appid=${API_KEY}`;
    const URL = BASE_URL + queryString;
     const data = await http.get(URL);
     return data;
}