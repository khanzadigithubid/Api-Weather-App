function getData() {
  const input = document.getElementById('input').value.trim();
  const weatherData = document.getElementById('weatherData');
  const errorMessage = document.getElementById('errorMessage');
  const loading = document.getElementById('loading');

  // Reset previous data
  errorMessage.style.display = 'none';
  loading.style.display = 'none';
  weatherData.innerHTML = '';

  if (input === "") {
      errorMessage.style.display = 'block';
      errorMessage.textContent = "Please enter a city name!";
      return;
  }

  // Display loading message
  loading.style.display = 'block';

  // Fetch weather data
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=91b4369798474fee84b51233233010&q=${input}&days=3&aqi=no `)
      .then(response => response.json())
      .then(data => {
          // Hide loading message
          loading.style.display = 'none';

          if (data.error) {
              errorMessage.style.display = 'block';
              errorMessage.textContent = "City not found. Please try again.";
          } else {
              const city = data.location.name;
              const temp = data.current.temp_c;
              const condition = data.current.condition.text;
              const minTemp = data.forecast.forecastday[0].day.mintemp_c;
              const maxTemp = data.forecast.forecastday[0].day.maxtemp_c;

              // Update UI with weather information
              weatherData.innerHTML = `
                  <div class="cardContainer">
                      <div class="card">
                          <p class="city">${city}</p>
                          <p class="weather">${condition.toUpperCase()}</p>
                          <p class="temp">${temp}°C</p>
                          <div class="minmaxContainer">
                              <div class="min">
                                  <p class="minHeading">Min</p>
                                  <p class="minTemp">${minTemp}°C</p>
                              </div>
                              <div class="max">
                                  <p class="maxHeading">Max</p>
                                  <p class="maxTemp">${maxTemp}°C</p>
                              </div>
                          </div>
                      </div>
                  </div>
              `;
          }
      })
      .catch(err => {
          loading.style.display = 'none';
          errorMessage.style.display = 'block';
          errorMessage.textContent = "An error occurred. Please try again.";
          console.error(err);
      });
}
