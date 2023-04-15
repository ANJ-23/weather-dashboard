/* 
save city in local storage & output it as a button
two calls to Weather API: Geocoding API and 5 Day/3 Hour Forcast Data

Geocoding:
- "lat": ...
- "lon": ...

5 Day/3 Hour Forcast:
- only need 1 hour per day for forcast data

// instructor-given code; pulls weather data from individual city:

ICONS(?):
// First Fetch
`api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}`
// Second Fetch
`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid={APIkey}`

*/



// stores all data points for weather forcast
var weatherList = {};

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
var cardContainerArray;

// var fiveDayContainer = $('#five-day-forcast');
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
var historyButton = $('<button>');
historyButton.attr('class', 'btn btn-primary my-2');
historyButton.attr('id', 'previous-city');

// local storage variables
/* var localName = localStorage.getItem("name");
var localIcon;
var localTemp = localStorage.getItem("temperature");
var localWind = localStorage.getItem("wind");
var localHumidity = localStorage.getItem("humidity"); */

// stores latitude & longitude
var lat;
var lon;

// OpenWeather API key: 4d00507739121560c1639c937ad7635c
// API call: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=4d00507739121560c1639c937ad7635c


function searchWeather() {
  // upon clicking search, gathers weather info AND save city from API
  
  var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=4d00507739121560c1639c937ad7635c';

  fetch(requestUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data)


  })
}

// INSTRUCTOR'S CODE:
/*
  I am loading the sample data via another script tag on the index.html page, so I have that data 
  available here as a global variable. It was named sample in the other file so we'll use that here.
*/


// This is the array of hour blocks: 8 per day, for a total of 40.
const daysInForecast = weatherList.list 

/*
Each date object has a property called "dt", which is a Unix timestamp for the date and time 
of that object's data. The first one is 1681333200.
*/ 

// Create a new array to hold one day block per forecast day.
const newForecastArr = [] 

// END OF INSTRUCTOR'S CODE


// creates 5-day forcast cards
function createForcastCards() {
  for (var i = 0; i < 5; i++) {
    var cardContainer = $('<figure>');
    cardContainer.attr('id', 'five-day-forcast');
    cardContainer.attr('class', 'card');
    fiveDayContainer.append(cardContainer);
  }
  cardContainerArray = document.querySelectorAll("figure");
}
// createForcastCards();

// uses Geocoding API to fetch coordinates for a searched city
function getCoords(event) {
  event.preventDefault();

  // stores search as variable
  var search = searchInput.val();

  // but FIRST, get coordinates for weather
  
  var requestCoords = "http://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=1&appid=4d00507739121560c1639c937ad7635c";

  fetch(requestCoords)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    localStorage.setItem("latitude", data[0].lat)
    localStorage.setItem("longitude", data[0].lon)
    lat = localStorage.getItem("latitude");
    lon = localStorage.getItem("longitude");

    // stores geographical data locally
    localStorage.setItem("city", data);

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

    // locally stores city weather data
    localStorage.setItem("city weather", weatherList);

    // appends today's weather data on top of page
    todaysWeather.append(cityName);
    todaysWeather.append(weatherIcon);
    todaysWeather.append(todayTemp);
    todaysWeather.append(todayWind);
    todaysWeather.append(todayHumidity);
    
    // stores searched city as a button
    searchHistory();

    // stores weather data locally
    // storeWeather(data.name, data.main.temp, data.wind.speed, data.main.humidity);
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
    
    for (var i = 4; i < data.list.length; i += 8) {
      console.log(data);
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

      // $('#previous-city').on('click', getCoords);
    }
    

    // cardContainerArray = document.querySelectorAll("figure");

    // var elementStorage = document.querySelectorAll("#five-day-forcast");
    // console.log(elementStorage[i]);
  });
}

function formCards() {
  // sets attributes for new cards; returns as array
  var cardContainer = $('<figure>');
  // var cardBody = $('<summary>');
  var forcastDate = $('<h5>');
  var forcastIcon = $('<img>');
  var forcastTemp = $('<p>');
  var forcastWind = $('<p>');
  var forcastHumidity = $('<p>');

  var divArray = [cardContainer, forcastDate, forcastIcon, forcastTemp, forcastWind, forcastHumidity];

  return divArray;
}

function fiveDayForcast(divArray, index) {
  var divs = formCards();

  // icon variables
  var iconCode = newForecastArr[index].weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  
  // cardBody.attr('class', 'card-body');
  // cardBody.attr('id', i);
  divArray[0].attr('class', 'card');
  divArray[0].attr('id', 'five-day-forcast')
  divArray[1].attr('class', 'card-title');
  divArray[1].attr('id', 'date');
  divArray[2].attr('class', 'card-img')
  divArray[2].attr('id', 'icon')
  divArray[2].attr('src', iconUrl);
  divArray[3].attr('class', 'card-text');
  divArray[3].attr('id', 'temperature')
  divArray[4].attr('class', 'card-text');
  divArray[4].attr('id', 'wind')
  divArray[5].attr('class', 'card-text');
  divArray[5].attr('id', 'humidity')

  // converts unix timestamp to date
  var dateConvert = new Date(newForecastArr[index].dt * 1000);

  // stores forcast text as variables, then returns it in an array
  var forDate = divArray[1].text(dayjs(dateConvert).format('MM/DD/YYYY'));
  // var forIcon = 
  // FIX THIS ARRAY CALL
  var forTemp = divArray[3].text("Temp: " + newForecastArr[i].main.temp + " °F")
  var forWind = divArray[4].text("Wind: " + newForecastArr[i].wind.speed + " MPH")
  var forHumid = divArray[5].text("Humidity: " + newForecastArr[i].main.humidity + " %")
  
  var forcastData =  {
    divs: divArray,
    text: [forDate, forTemp, forWind, forHumid]
  };
  
  var forcastVariables = []
  
  return forcastData;
}

// creates new button that stores previous cities + can be re-searched with a click
// uses local storage
function searchHistory() {
  var prevCity = $('<button>');
  prevCity.attr('id', 'previous-city');
  prevCity.attr('class', 'btn btn-primary my-2');
  prevCity.text(searchInput.val());

  var text = prevCity.text();
  console.log(text)

  searchForm.append(prevCity);

  console.log(prevCity.text());

  prevCity.on('click', function(event) {
    event.preventDefault();
    searchInput.val(text);

    getCoords(event);
  });
}

function searchHistoryText() {
  // transfers history button's text as something to be searched
}

// upon loading stage, gets weather from last search & shows it on stage
// uses local storage
function showPrevWeather() {
  
}

// loads previous weather data
// showPrevWeather();

// when search button is clicked, API activates
searchButton.on('click', getCoords);
/* $('#previous-city').on('click', function(event) {
  event.preventDefault();

  console.log("test");
}) */