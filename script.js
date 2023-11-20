/ script.js
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

async function getSunriseSunsettoday(lat, lng) {
    const sunriseSunsetUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`;

    try {
        const response = await fetch(sunriseSunsetUrl);
        const data = await response.json();

        const { sunrise, sunset } = data.results;
        return { sunrise, sunset };
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
        const sunriseSunset = await getSunriseSunsettoday(lat, lng);

        if (sunriseSunset) {
            displaySunriseSunset(userLocation, sunriseSunset);
        } else {
            displayError();
        }
    } else {
        displayError();
    }
}

function displaySunriseSunset(location, sunriseSunset) {
    document.getElementById('locationName').textContent = location;
    document.getElementById('sunriseTime').textContent = sunriseSunset.sunrise;
    document.getElementById('sunsetTime').textContent = sunriseSunset.sunset;
}

function displayError() {
    document.getElementById('locationName').textContent = 'Location not found';
    document.getElementById('sunriseTime').textContent = 'N/A';
    document.getElementById('sunsetTime').textContent = 'N/A';
}
