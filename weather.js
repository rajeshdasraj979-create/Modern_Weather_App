const apiKey = '46404e3c4ae83ca5a1ee62d283678a62';
const btn = document.getElementById('getWeatherBtn');
const input = document.getElementById('WeatherResult');
const result = document.getElementById('Result');

btn.addEventListener('click', getWeather);

function getWeather() {
    const city = input.value.trim();

    if (city === '') {
        result.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                result.innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <img class="weather-icon" src="${icon}" alt="Weather icon">
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].main}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind: ${data.wind.speed} m/s</p>
                `;
            } else {
                result.innerHTML = '<p>City not found!</p>';
            }
        })
        .catch(() => {
            result.innerHTML = '<p>Error fetching weather data.</p>';
        });
}
