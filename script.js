function searchLocation() {
  const searchInput = document.getElementById('searchInput').value;
  if (searchInput.trim() === '') {
    alert('Please enter a location.');
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=04fd905b6d5e293c8bb76f277a85e36f`)
    .then(response => response.json())
    .then(data => {
      const locationName = data.name;
      const sunriseTimestamp = data.sys.sunrise;
      const sunsetTimestamp = data.sys.sunset;

      const sunriseTime = new Date(sunriseTimestamp * 1000).toLocaleTimeString();
      const sunsetTime = new Date(sunsetTimestamp * 1000).toLocaleTimeString();

      document.getElementById('locationName').textContent = locationName;
      document.getElementById('sunriseTime').textContent = sunriseTime;
      document.getElementById('sunsetTime').textContent = sunsetTime;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again.');
    });
}
