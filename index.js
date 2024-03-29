$(document).ready(function() {
    const container = document.querySelector('.container');
    const weather = document.querySelector('.weather');
    const search = document.querySelector('.city-search');
    const search_button = document.querySelector('.search-button');
    const weather_icon = document.querySelector('.mw-icon');
    const temperature = document.querySelector('.temperature');
    const city = document.querySelector('.city');
    const feels_like  = document.querySelector('.feels-like');
    const weather_info = document.querySelector('.weather-info');

    const wind = document.querySelector('.speed');
    const humidity = document.querySelector('.percentage'); 

    var onC = true;
    var temp_search = "";

    //Button elements (Set celsius to be default scale of temperature)
    const celsius = document.querySelector('.celsius');
    celsius.style.background = "#7D6346";
    const fahrenheit = document.querySelector('.fahrenheit');

    //Event Listeners for buttons
    search_button.addEventListener('click', weatherData);
    celsius.addEventListener('click', clickC);
    fahrenheit.addEventListener('click', clickF);

    function weatherData(){
        const APIKey = 'OLD KEY DELETED';
        const city_search = search.value;
        var units, deg, wind_unit;

        if (onC === true){
            units = 'metric';
            deg = "C";
            wind_unit = "m/s";
        }else{
            units = 'imperial';
            deg = "F";
            wind_unit = "mph";
        }

        temp_search = city_search;

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city_search + '&units=' + units + '&appid=' + APIKey)
            .then(function (response) {
                if (response.status === 404 || response.status === 400){
                    weather_icon.className = "mw-icon fa-solid fa-person-circle-question text-light";
                    city.innerHTML = "Unable to find city. Please try again.";
                    temperature.innerHTML = "";
                    feels_like.innerHTML = "";
                    weather.style.display = "block";
                    weather_info.style.display = "none";
                    return;
                } else if (response.status !== 200 && response.status !== 404 && response.status !== 400){
                    weather_icon.className = "mw-icon fa-solid fa-circle-exclamation text-light";
                    city.innerHTML = "Whoops! Something went wrong. Please try again later.";
                    temperature.innerHTML = "";
                    feels_like.innerHTML = "";
                    weather.style.display = "block";
                    weather_info.style.display = "none";
                    return;
                }
                response.json().then(function (data) {
                    weather.style.display = "block";
                    weather_info.style.display = "flex";
                    city.innerHTML = data.name;
                    
                    feels_like.innerHTML = "Feels like: " + Math.round(data.main.feels_like) + String.fromCharCode(176) + deg;
                    temperature.innerHTML = Math.round(data.main.temp) + String.fromCharCode(176) + deg;
                    switch(data.weather[0].main){
                        case 'Clear':
                            weather_icon.className = "mw-icon fa-solid fa-sun text-light";
                            break;
                        case 'Rain':
                            weather_icon.className = "mw-icon fa-solid fa-cloud-showers-heavy text-light";
                            break;
                        case 'Thunderstorm':
                            weather_icon.className = "mw-icon fa-solid fa-cloud-bolt text-light";
                            break;
                        case 'Drizzle':
                            weather_icon.className = "mw-icon fa-solid fa-cloud-rain text-light";
                            break;
                        case 'Clouds':
                            weather_icon.className = "mw-icon fa-solid fa-cloud text-light";
                            break;
                        case 'Snow':
                            weather_icon.className = "mw-icon fa-regular fa-snowflake text-light";
                            break;
                    }
                    wind.innerHTML = Math.round(data.wind.speed * 10) / 10 + wind_unit;
                    humidity.innerHTML = data.main.humidity + "%";
                });
            });
    };

    function weatherDataTemp(){
        const APIKey = 'OLD KEY DELETED';
        const city_search = search.value;
        var units, deg, wind_unit;

        if (onC === true){
            units = 'metric';
            deg = "C";
            wind_unit = "m/s";
        }else{
            units = 'imperial';
            deg = "F";
            wind_unit = "mph";
        }

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + temp_search + '&units=' + units + '&appid=' + APIKey)
            .then(function (response) {
                if (response.status === 404 || response.status === 400){
                    weather_icon.className = "mw-icon fa-solid fa-person-circle-question text-light";
                    city.innerHTML = "Unable to find city. Please try again.";
                    temperature.innerHTML = "";
                    feels_like.innerHTML = "";
                    weather.style.display = "block";
                    weather_info.style.display = "none";
                    return;
                } else if (response.status !== 200 && response.status !== 404 && response.status !== 400){
                    weather_icon.className = "mw-icon fa-solid fa-circle-exclamation text-light";
                    city.innerHTML = "Whoops! Something went wrong. Please try again later.";
                    temperature.innerHTML = "";
                    feels_like.innerHTML = "";
                    weather.style.display = "block";
                    weather_info.style.display = "none";
                    return;
                }
                response.json().then(function (data) {
                    weather.style.display = "block";
                    weather_info.style.display = "flex";
                    city.innerHTML = data.name;
                    
                    feels_like.innerHTML = "Feels like: " + Math.round(data.main.feels_like) + String.fromCharCode(176) + deg;
                    temperature.innerHTML = Math.round(data.main.temp) + String.fromCharCode(176) + deg;
                    switch(data.weather[0].main){
                        case 'Clear':
                            weather_icon.className = "mw-icon fa-solid fa-sun text-light";
                            break;
                        case 'Rain':
                            weather_icon.className = "mw-icon fa-solid fa-cloud-showers-heavy text-light";
                            break;
                        case 'Thunderstorm':
                            weather_icon.className = "mw-icon fa-solid fa-cloud-bolt text-light";
                            break;
                        case 'Drizzle':
                            weather_icon.className = "mw-icon fa-solid fa-cloud-rain text-light";
                            break;
                        case 'Clouds':
                            weather_icon.className = "mw-icon fa-solid fa-cloud text-light";
                            break;
                        case 'Snow':
                            weather_icon.className = "mw-icon fa-regular fa-snowflake text-light";
                            break;
                    }
                    wind.innerHTML = Math.round(data.wind.speed * 10) / 10 + wind_unit;
                    humidity.innerHTML = data.main.humidity + "%";
                });
            });
    };

    function clickC(){
        const city_search = search.value;
        if (onC === false){
            onC = true;
            fahrenheit.style.background = "";
            celsius.style.background = "#7D6346";
            //if (city_search !== "" && temp_search === city_search){
            //    weatherData();
            //}
            if (temp_search !== ""){
                if (city_search !== temp_search){
                    weatherDataTemp();
                }else{
                    weatherData();
                }
            }else{
                return;
            }
        }else{
            return;
        }
        
        
    }

    function clickF(){
        const city_search = search.value;
        if (onC === true){
            onC = false;
            celsius.style.background = "";
            fahrenheit.style.background = "#7D6346";
            //if (city_search !== "" && temp_search === city_search){
            //    weatherData();
            //}
            if (temp_search !== ""){
                if (city_search !== temp_search){
                    weatherDataTemp();
                }else{
                    weatherData();
                }
            }else{
                return;
            }
        }else{
            return;
        }
        
    }


});