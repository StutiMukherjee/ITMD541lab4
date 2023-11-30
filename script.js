// Get references to the buttons and input field
const searchButton = document.getElementById("searchButton");
const geoButton = document.getElementById("geoButton");
const searchBar = document.getElementById("searchBar");

// Event listeners for the search and current location buttons
searchButton.addEventListener("click", async function () {
  try {
    const locSearch = searchBar.value;

    if (!locSearch) {
      throw new Error("Please enter a location");
    }

    const coordinates = await fetchCoordinates(locSearch);
    displayData(coordinates['lat'], coordinates['lon']);
  } catch (error) {
    handleDisplayError(error);
  }
});

geoButton.addEventListener("click", async function () {
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;

    displayData(latitude, longitude);
  } catch (error) {
    handleDisplayError(error);
  }
});

// Functions for fetching coordinates, sunrise/sunset data, and displaying data
async function fetchCoordinates(location) {
  const apiUrl = `https://geocode.maps.co/search?q=${location}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Geocoding HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    throw new Error('Location not found');
  }

  return data[0];
}

async function fetchData(lat, lon, date) {
  const apiUrl = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&date=${date}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Sunrise Sunset API HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}

async function displayData(lat, lon) {
  try {
    const todayData = await fetchData(lat, lon, 'today');
    const tomorrowData = await fetchData(lat, lon, 'tomorrow');

    updateUI(todayData.results, tomorrowData.results);
  } catch (error) {
    handleDisplayError(error);
  }
}

function updateUI(todayData, tomorrowData) {
  const updateElement = (id, value, iconClass) => {
    const element = document.getElementById(id);
    element.innerHTML = `<i class="${iconClass}"></i> ${value}`;
  };

  updateElement('sunriseToday', "Sunrise: " + todayData.sunrise, 'fas fa-sun');
  updateElement('sunsetToday', "Sunset: " + todayData.sunset, 'fas fa-sun');
  updateElement('dawnToday', "Dawn: " + todayData.dawn, 'fas fa-arrow-up');
  updateElement('duskToday', "Dusk: " + todayData.dusk, 'fas fa-arrow-down');
  updateElement('dayLengthToday', "Day Length: " + todayData.day_length, 'fas fa-clock');
  updateElement('solarNoonToday', "Solar Noon: " + todayData.solar_noon, 'fas fa-sun');

  updateElement('sunriseTomorrow', "Sunrise: " + tomorrowData.sunrise, 'fas fa-sun');
  updateElement('sunsetTomorrow', "Sunset: " + tomorrowData.sunset, 'fas fa-sun');
  updateElement('dawnTomorrow', "Dawn: " + tomorrowData.dawn, 'fas fa-arrow-up');
  updateElement('duskTomorrow', "Dusk: " + tomorrowData.dusk, 'fas fa-arrow-down');
  updateElement('dayLengthTomorrow', "Day Length: " + tomorrowData.day_length, 'fas fa-clock');
  updateElement('solarNoonTomorrow', "Solar Noon: " + tomorrowData.solar_noon, 'fas fa-sun');
}
  showElement("todayInfo");
  showElement("tomorrowInfo");
  showElement("timezone");
}

// Utility functions
function hideElement(id) {
  document.getElementById(id).style.display = "none";
}

function showElement(id) {
  document.getElementById(id).style.display = "block";
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function handleDisplayError(error) {
  console.error('Error:', error.message);
  hideElement("todayInfo");
  hideElement("tomorrowInfo");
  hideElement("timezone");
  alert('Error: ' + error.message);
}
