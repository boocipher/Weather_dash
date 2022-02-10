var apiKey = "7bf625b6f361397e552906be67e23a90";
var searchInput = document.getElementById('search');
var searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var city = searchInput.value;
    var currentWeather =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    

    fetch(currentWeather)
    .then(res => {
        return res.json();
    })
    .then(data => {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

        fetch(oneCall)
        .then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
        })
        console.log(data)
    })
})