var appKey = "0ba6c4589d6d2ce5aa646ddf301c4ae5";
var currentCity = "";


// Get and display current weather for city 
var getCurrentWeather = (event) => {
    let city = $('#search-city').val();
    currentCity = $('#search-city').val();

    // fetch queryUrl from API 
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=imperial&appid=" + appKey;
    fetch(queryUrl)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        // create html for current city 
        let currentWeatherHTML = `
        <h3>${response.name} 
        <ul class="list-unstyled">
            <li>Tempature: ${response.main.temp}&#8457;</li>
            <li>Humidty: ${response.main.humidity}%</li>
            <li>Wind Speed: ${response.wind.speed} mph</li>
            <li id="uvIndex">UV Index:</li>
        </ul>`;
        $('#current-weather').html(currentWeatherHTML);
        // fetch UV index from API 
        let latitude = response.coord.lat;
        let longitude = response.coord.lon;
        let uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + appKey;

        fetch(uvQueryURL)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let uvIndex = response.value;
            $('#uvIndex').html(`UV Index: <span id="uvVal"> ${uvIndex}</span>`);
            if (uvIndex>=0 && uvIndex<3){
                $('#uvVal').attr("class", "uv-favorable");
            } else if (uvIndex>=3 && uvIndex<8){
                $('#uvVal').attr("class", "uv-moderate");
            } else if (uvIndex>=8){
                $('#uvVal').attr("class", "uv-severe");
            }
        });
    })
}

// City search event listner 
$('#search-btn').on("click", (event) => {
    event.preventDefault();
    currentCity = $('#search-city').val();
    getCurrentWeather(event);
});

getCurrentWeather();