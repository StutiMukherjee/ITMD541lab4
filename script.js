// script.js
async function getCoordinates(location) {
    const apiKey = '2a75792aaed5c771767ef5ee42f94c3d';
    const geocodeUrl = `https://geocode.maps.com/?location=${location}&key=${apiKey}`;

    try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            return { lat, lng };
        } else {
            return null; // Location not found
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}

async function getSunriseSunset(lat, lng) {
    const sunriseSunsetUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`;

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
        const sunriseSunset = await getSunriseSunset(lat, lng);

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
