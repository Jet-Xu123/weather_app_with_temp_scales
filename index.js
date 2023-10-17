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

    function weatherData(){
        const APIKey = '53ff1863fb72f76f754256924527c5cb';
        const city_search = document.querySelector('.city-search').value;

        
    }


});