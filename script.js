// Function to fetch coordinates from the geocode API
async function getCoordinates(location) {
    const apiKey = '2a75792aaed5c771767ef5ee42f94c3d';
    const geocodeUrl = `https://geocode.maps.co/?location=${location}&key=${apiKey}`;

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
        return null; // Return null to signify an error
    }
}

// Function to fetch sunrise and sunset using coordinates from Sunrise-Sunset.org API
async function getSunriseSunset(lat, lng) {
    const sunriseSunsetUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`;
    
    try {
        const response = await fetch(sunriseSunsetUrl);
        const data = await response.json();
        
        // Parse the response and extract sunrise and sunset times
        const { sunrise, sunset } = data.results;
        return { sunrise, sunset };
    } catch (error) {
        console.error('Error fetching sunrise/sunset:', error);
        return null; // Return null to signify an error
    }
}

// Example usage
async function fetchSunriseSunsetInfo() {
    const userLocation = prompt("Enter a named location:");
    
    const coordinates = await getCoordinates(userLocation);
    if (coordinates) {
        const { lat, lng } = coordinates;
        const sunriseSunset = await getSunriseSunset(lat, lng);
        
        if (sunriseSunset) {
            console.log(`Sunrise: ${sunriseSunset.sunrise}\nSunset: ${sunriseSunset.sunset}`);
        } else {
            console.log('Error fetching sunrise/sunset information.');
        }
    } else {
        console.log('Location not found or an error occurred.');
    }
}

// Call the function to initiate the process
fetchSunriseSunsetInfo();
