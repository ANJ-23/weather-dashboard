// container for today's forcast
var todaysWeather = $('#todays-weather'); 

// city name + weather data; variables for today's forcast
var cityName = $('<h2>');
var weatherIcon = $('<img>');
var todayTemp = $('<p>');
var todayWind = $('<p>');
var todayHumidity = $('<p>');

// $('');
// variables for five-day forcast; INSERT THEM IN A FUNCTION
var fiveDayContainer = $('#five-day-container');

var fiveCard = $('<div>');
fiveCard.attr('class', 'card-body');
var fiveDate = $('<h5>');
fiveDate.attr('class', 'card-title');
var fiveIcon = $('<p>');
var fiveTemp = $('<p>');
var fiveWind = $('<p>');
var fiveHumidity = $('<p>');

// search form variables
var searchForm = $('#search-form');
var searchInput = $('input[name="q"]');
var searchButton = $('#search-button');

// local storage variables
var apiKey = '4d00507739121560c1639c937ad7635c';
localStorage.setItem('api', apiKey);

// stores latitude & longitude
var lat;
var lon;


function searchWeather() {
  // upon clicking search, gathers weather info AND save city from API
  
  var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + localStorage.getItem('api');

  fetch(requestUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data)


  })
}

// uses Geocoding API to fetch coordinates for a searched city
function getCoords(event) {
  event.preventDefault();

  // stores search as variable
  var search = searchInput.val();

  // but FIRST, get coordinates for weather
  var requestCoords = "http://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=1&appid=" + localStorage.getItem('api');

  // obtains city coordinates for weather data
  fetch(requestCoords)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    lat = data[0].lat;
    lon = data[0].lon;

    getTodaysWeather();
    getForcast();
  })
}

// fetches from API to gather weather data
function getTodaysWeather() {
  // event.preventDefault();

  var requestUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=4d00507739121560c1639c937ad7635c";

  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    weatherList = data; // getPrevApi() calls from weatherList instead of data?

    // obtains info for icon
    var iconCode = data.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

    // displays today's weather data for city
    cityName.text(data.name);
    weatherIcon.attr('src', iconUrl)
    todayTemp.text("Temp:  " + data.main.temp + " °F")
    todayWind.text("Wind:  " + data.wind.speed + " MPH")
    todayHumidity.text("Humidity:  " + data.main.humidity + " %")

    // appends today's weather data on top of page
    todaysWeather.append(cityName);
    todaysWeather.append(weatherIcon);
    todaysWeather.append(todayTemp);
    todaysWeather.append(todayWind);
    todaysWeather.append(todayHumidity);
    
    // stores searched city as a button
    searchHistory();
  });
}

// appends 5-day forcast data on lower half of page
function getForcast() {
  var requestForcast = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=4d00507739121560c1639c937ad7635c";
  
  fetch(requestForcast)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    fiveDayContainer.html("");
    for (var i = 4; i < data.list.length; i += 8) {
      // creates new card & sets attributes
      var cardContainer = $('<figure>');
      var forcastDate = $('<h5>');
      var forcastIcon = $('<img>');
      var forcastTemp = $('<p>');
      var forcastWind = $('<p>');
      var forcastHumidity = $('<p>');

      // converts unix timestamp to date
      var dateConvert = new Date(data.list[i].dt * 1000);

      // obtains icon code & makes it displayable
      var iconCode = data.list[i].weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

      // sets attributes for each variable
      cardContainer.attr('class', 'card');
      cardContainer.attr('id', 'five-day-forcast')
      forcastDate.attr('class', 'card-title');
      forcastDate.attr('id', 'date');
      forcastIcon.attr('class', 'card-img')
      forcastIcon.attr('id', 'icon')
      forcastTemp.attr('class', 'card-text');
      forcastTemp.attr('id', 'temperature')
      forcastWind.attr('class', 'card-text');
      forcastWind.attr('id', 'wind')
      forcastHumidity.attr('class', 'card-text');
      forcastHumidity.attr('id', 'humidity')

      // changes text + icon displayed in the variables
      forcastDate.text(dayjs(dateConvert).format('MM/DD/YYYY'));
      forcastIcon.attr('src', iconUrl);
      forcastTemp.text("Temp: " + data.list[i].main.temp + " °F")
      forcastWind.text("Wind: " + data.list[i].wind.speed + " MPH")
      forcastHumidity.text("Humidity: " + data.list[i].main.humidity + " %")
      
      // appends forcast data in cards
      fiveDayContainer.append(cardContainer);
      cardContainer.append(forcastDate);
      cardContainer.append(forcastIcon);
      cardContainer.append(forcastTemp);
      cardContainer.append(forcastWind);
      cardContainer.append(forcastHumidity);
    }
  });
}

// creates new button that stores previous cities + can be re-searched with a click
// uses local storage
function searchHistory() {
  var prevCity = $('<button>');
  prevCity.attr('id', 'previous-city');
  prevCity.attr('class', 'btn btn-primary my-2');
  prevCity.text(searchInput.val());

  var text = prevCity.text();

  searchForm.append(prevCity);

  prevCity.on('click', function(event) {
    event.preventDefault();
    searchInput.val(text);

    getCoords(event);
  });
}

// when search button is clicked, API activates
searchButton.on('click', getCoords);
