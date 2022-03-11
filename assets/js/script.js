var apiKey = "7bf625b6f361397e552906be67e23a90";
var cityInput = document.getElementById('search');
var searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var city = cityInput.value;
    var currentWeather =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    

    fetch(currentWeather)
    .then(res => {
        return res.json();
    })
    .then(data => {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var cityName = data.name;
        var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

        fetch(oneCall)
        .then(res => {
            return res.json()
        }).then(data => {
            var date = moment.unix(data.current.dt).format("MM/DD/YYYY")
            var cardTitle = $('<h2>').addClass('card-title').text(cityName + ` (${date})`);
            var img = $('<img>').attr('src', `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`)
            var temp = $('<p>').addClass('temp').text('Temp: ' + data.current.temp + 'º F')
            var wind = $('<p>').addClass('wind').text('Wind Speed: ' + data.current.wind_speed + 'MPH')
            var humidity = $('<p>').addClass('humidity').text('Humidity: ' + data.current.humidity + '%')
            var uvi = $('<p>').text('UV Index: ');
            var uviBtn = $('<button>').attr('type', 'button').addClass('btn').text(data.current.uvi);

            if(data.current.uvi < 4) {
                uviBtn.addClass('btn-success')
            } else if(data.current.uvi < 7) {
                uviBtn.removeClass('btn-success');
                uviBtn.addClass('btn-warning')
            } else {
                uviBtn.removeClass('btn-success');
                uviBtn.removeClass('btn-warning');
                uviBtn.addClass('btn-danger');
            }

            // Create Elements to Append data retrieved from API to abd append to the proper div i.e. forecast div or current weather div.
            cardTitle.append(img);
            uvi.append(uviBtn)

            $('.card-body').append(cardTitle, temp, wind, humidity, uvi);
            console.log(data)

            // Write forecast loop to iterate five times and create cards
        })
        console.log(data)
    })
})