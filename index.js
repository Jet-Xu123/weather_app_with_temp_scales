$(document).ready(function() {
    const container = document.querySelector('.container');
    const weather = document.querySelector('.weather');
    const search_button = document.querySelector('.search-button');
    const weather_icon = document.querySelector('.mw-icon');
    const temperature = document.querySelector('.temperature');
    const city = document.querySelector('.city');
    const feels_like  = document.querySelector('.feels-like');
    const weather_info = document.querySelector('.weather-info');

    const wind = document.querySelector('.speed');
    const humidity = document.querySelector('.percentage');

    const wind_metric = " m/s";
    const wind_imperial = " mph";
    

    search_button.addEventListener('click', weatherData);

    /**
     search_button.addEventListener('click', function() {
        weather_icon.className = "mw-icon fa-solid fa-circle-exclamation text-light";
        city.innerHTML = "Whoops! Something went wrong. Please try again later.";
    });
     */
    

    function weatherData(){
        const APIKey = '53ff1863fb72f76f754256924527c5cb';
        const city_search = document.querySelector('.city-search').value;

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city_search + '&units=metric&appid=' + APIKey)
            .then(function (response) {
                if (response.status === 404){
                    weather_icon.className = "mw-icon fa-solid fa-person-circle-question text-light";
                    city.innerHTML = "Unable to find city. Please try again.";
                    temperature.innerHTML = "";
                    feels_like.innerHTML = "";
                    return;
                } else if (response.status !== 200 && response.status !== 404){
                    weather_icon.className = "mw-icon fa-solid fa-circle-exclamation text-light";
                    city.innerHTML = "Whoops! Something went wrong. Please try again later.";
                    temperature.innerHTML = "";
                    feels_like.innerHTML = "";
                    console.log(response.status);
                    return;
                }
                response.json().then(function (data) {
                    weather.style.display = "block";
                    city.innerHTML = data.name;
                    feels_like.innerHTML = "Feels like: " + Math.round(data.main.feels_like) + String.fromCharCode(176) + 'C';
                    temperature.innerHTML = Math.round(data.main.temp) + String.fromCharCode(176) + 'C';
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
                    wind.innerHTML = data.wind.speed + wind_metric;
                    humidity.innerHTML = data.main.humidity + "%";
                });
            });
    }


});