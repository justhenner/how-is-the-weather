const buttonOne = document.getElementById("buttonOne");
buttonOne.addEventListener("click", getWeather);

function latLong(cityName) {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=b0ff1a0be60643d1e77c3f09ef10d55b';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const lat = data[0].lat
            const long = data[0].lon
            fetchWeather(lat, long)
        })
}

