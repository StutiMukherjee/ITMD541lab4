function searchLocation() {
  const searchInput = document.getElementById('searchInput').value;
  if (searchInput.trim() === '') {
    alert('Please enter a location.');
    return;
  }

  const accessKey = '2a75792aaed5c771767ef5ee42f94c3d'; // Replace with your Weatherstack access key
  const apiUrl = `https://api.weatherstack.com/current?access_key=${accessKey}&query=${searchInput}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error.info || 'Unknown error');
      }

      const locationName = data.location.name;
      const sunriseTime = data.current.observation_time.split(' ')[1]; // Parsing sunrise time from observation_time
      const sunsetTime = data.current.sunset; // Adjust this according to Weatherstack's response

      document.getElementById('locationName').textContent = locationName;
      document.getElementById('sunriseTime').textContent = sunriseTime;
      document.getElementById('sunsetTime').textContent = sunsetTime;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert(`Error fetching data: ${error.message}. Please try again.`);
    });
}
