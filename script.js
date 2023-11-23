//script.js

async function getCoordinates(location) {

    const geocodeUrl = `https://geocode.maps.co/search?q=${location}`;

    try {
        let response = await fetch(geocodeUrl);
        let data = await response.json();
        let c = data[0];
        return { lat: c['lat'], lng: c['lon'] };
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}

async function getSunriseSunset(lat, lng, date) {
    const sunriseSunsetUrl = 'https://api.sunrisesunset.io/json?lat=' + lat + '&lng=' + lng + '&date=' + date;

    try {
        const response = await fetch(sunriseSunsetUrl);
        const data = await response.json();

        const { sunrise, sunset, dawn, dusk, day_length, solar_noon, timezone } = data.results;
        return { sunrise, sunset, dawn, dusk, day_length, solar_noon, timezone };
    } catch (error) {
        console.error('Error fetching sunrise/sunset:', error);
        return null;
    }
}




async function fetchSunriseSunsetInfo() {
    const userLocation = document.getElementById('searchInput').value;

    const coordinates = await getCoordinates(userLocation);
    if (coordinates) {
        const { lat, lng } = coordinates;
        const sunriseSunsetToday = await getSunriseSunset(lat, lng, 'today');
        const sunriseSunsetTomorrow = await getSunriseSunset(lat, lng, 'tomorrow');


       if (sunriseSunsetToday) {
            displaySunriseSunsetToday(userLocation, sunriseSunsetToday);
            displaySunriseSunsetTomorrow(userLocation, sunriseSunsetTomorrow);
        } else {
            displayError();
        }
    } else {
        displayError();
    }
}

function displaySunriseSunsetToday(locationtoday, sunriseSunset) {
    document.getElementById('locationNameToday').textContent = location;
    document.getElementById('sunriseTimeToday').textContent = sunriseSunset.sunrise;
    document.getElementById('sunsetTimeToday').textContent = sunriseSunset.sunset;
    document.getElementById('dawnTimeToday').textContent = sunriseSunset.dawn;
    document.getElementById('duskTimeToday').textContent = sunriseSunset.dusk;
    document.getElementById('dayLengthToday').textContent = sunriseSunset.day_length;
    document.getElementById('solarNoonTimeToday').textContent = sunriseSunset.solar_noon;
    document.getElementById('timezoneToday').textContent = sunriseSunset.timezone;

}

function displaySunriseSunsetTomorrow(locationtomorrow, sunriseSunset) {
    ///// create new html code for tomorrow and change fields here
    document.getElementById('locationNameTomorrow').textContent = location;
    document.getElementById('sunriseTimeTomorrow').textContent = sunriseSunset.sunrise;
    document.getElementById('sunsetTimeTomorrow').textContent = sunriseSunset.sunset;
    document.getElementById('dawnTimeTomorrow').textContent = sunriseSunset.dawn;
    document.getElementById('duskTimeTomorrow').textContent = sunriseSunset.dusk;
    document.getElementById('dayLengthTomorrow').textContent = sunriseSunset.day_length;
    document.getElementById('solarNoonTimeTomorrow').textContent = sunriseSunset.solar_noon;
    document.getElementById('timezoneTomorrow').textContent = sunriseSunset.timezone;

}

function displayError() {
    document.getElementById('locationName').textContent = 'Location not found';
    document.getElementById('sunriseTime').textContent = 'N/A';
    document.getElementById('sunsetTime').textContent = 'N/A';
}
