/* 
save city in local storage & output it as a button

two calls to Weather API: Geocoding API and 5 Day/3 Hour Forcast Data

Geocoding:
- "lat": ...
- "lon": ...

5 Day/3 Hour Forcast:
- only need 1 hour per day for forcast data


// instructor-given code; pulls weather data from individual city:

ICONS:
// First Fetch
`api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}`
// Second Fetch
`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid={APIkey}`

*/