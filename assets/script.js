function latLong(cityName){
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&limit=5&appid=b0ff1a0be60643d1e77c3f09ef10d55b';
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        const lat = data[0].lat
        const long = data[0].lon
        displayWeather(lat, long)
    })
}

function fetchWeather(lat, lon){
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=b0ff1a0be60643d1e77c3f09ef10d55b';
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        displayWeather(data)
        
    })
}



function displayWeather(lat, lon) {
// if (searchBtn) {
    // cityTitle.text(cityInput.val())
    var currentWeather =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial&appid=d8540a4fbc73181f1dfa2d03253a4a74";
  
    fetch(currentWeather)
      .then(function (response) {
        return response.json();
        //   console.log(response)
      })
      .then(function (data) {
        console.log(data);
        var weather = document.getElementById("weather");
        var headingEl = document.createElement('h1');
        var tempEl = document.createElement('p');
        var windEl = document.createElement('p');
        var humidityEl = document.createElement('p');
        headingEl.textContent = data.name;
        tempEl.textContent = "Temp: " + data.main.temp + " °F";
        windEl.textContent = "Wind: " + data.wind.speed + " mph";
        humidityEl.textContent = "Humidity: " + data.main.humidity + " %";
  
        weather.appendChild(headingEl);
        weather.appendChild(tempEl);
        weather.appendChild(windEl);
        weather.appendChild(humidityEl);
      });
   displayForecast(lat, lon)
}

function displayForecast(lat, lon) {
    var forecast =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=d8540a4fbc73181f1dfa2d03253a4a74";

  fetch(forecast)
    .then(function (response) {
      return response.json();
      //   console.log(response)
    })
    .then(function (data) {
      console.log(data);
      var list = data.list;
      console.log(list);
      for (let index = 0; index < list.length; index++) {
        if (index % 9 === 0){ 
            var weatherForDays = document.getElementById('forecast')
        var headingEl = document.createElement('h1');
        headingEl.textContent = JSON.stringify(data.list[index].dt_txt).slice(1, 11);

        var humidityEl = document.createElement('p');
        humidityEl.textContent = "Humidity: " + data.list[index].main.humidity
        // data.list[index].dt_txt
        var tempEl = document.createElement('p');
        tempEl.textContent = "Temperature: "  + data.list[index].main.temp

        var windEl = document.createElement('p');
        windEl.textContent = "Wind: "  + data.list[index].wind.speed

        var parentEl = document.createElement('section')
        parentEl.appendChild(headingEl)
        parentEl.appendChild(humidityEl)
        parentEl.appendChild(windEl)
         parentEl.appendChild(tempEl)

        // add that parent el to html
        weatherForDays.appendChild(parentEl)
        .setAttribute('class', 'future-date')
    }
        
    }
 
    });
}

function getWeather() {
  const city = document.getElementById("city");
    console.log(city.value)
    // save to localstorage
    // check if values are present in locakstorage
    if (localStorage.getItem('cities')) {
        // grab that value from localstorage
        var cities = localStorage.getItem('cities')
        // convert it to array
        cities = JSON.parse(cities)
        // add new value to that array
        cities.push(city.value)
        // save the new array to localstaroage
        localStorage.setItem('cities', JSON.stringify(cities))

    }
    else {
        // create a new array to localstarge
        var cities = []
        cities.push(city.value)
        localStorage.setItem('cities', JSON.stringify(cities))
    }

    latLong(city.value)
}

  

// Add event listener to table
const buttonOne = document.getElementById("buttonOne");
buttonOne.addEventListener("click", getWeather);