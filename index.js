$(document).ready(function() {
    const container = document.querySelector('.container');
    const weather = document.querySelector('.weather');
    const search_city = document.querySelector('.search-city');
    const search_button = document.querySelector('.search-button');
    const weather_icon = document.querySelector('.mw-icon');
    const temperature = document.querySelector('.temperature');
    const city = document.querySelector('.city');
    const feels_like  = document.querySelector('.feels-like');
    

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

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city_search + '&units=metric&appid=53ff1863fb72f76f754256924527c5cb')
            .then(function (response) {
                if (response.status !== 200){
                    weather_icon.className = "mw-icon bi bi-emoji-frown text-light";
                    city.innerHTML = "Whoops! Something went wrong. Please try again later.";
                    console.log(response.status);
                    return;
                }
                response.json().then(function (data) {
                    city.innerHTML = data.name;
                    feels_like.innerHTML = "Feels like: " + Math.round(data.main.feels_like) + String.fromCharCode(176) + "C";
                    temperature.innerHTML = Math.round(data.main.temp) + String.fromCharCode(176) + 'C';
                    console.log(data);
                    console.log(data.main);
                    console.log(data.weather[0].main);
                    console.log(data.name);
                    console.log(data.main.temp);
                });
            });
    }


});