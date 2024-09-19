import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Weather.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'aa55f3e9261dc91810ca9bc38fffbdc4'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError(null);
      fetchForecast(response.data.coord.lat, response.data.coord.lon); // Fetch forecast based on coordinates
    } catch (err) {
      setWeather(null);
      setError('City not found');
    }
  };

  const fetchForecast = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      setForecast(response.data);
    } catch (err) {
      console.error('Error fetching forecast:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const handleLocationClick = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data);
        setError(null);
        fetchForecast(latitude, longitude); // Fetch forecast based on coordinates
      } catch (err) {
        setWeather(null);
        setError('Unable to fetch weather for your location');
      }
    });
  };

  const getWeatherIcon = (icon) => {
    const iconMap = {
      '01d': 'sun',
      '01n': 'moon',
      '02d': 'cloud-sun',
      '02n': 'cloud-moon',
      '03d': 'cloud',
      '03n': 'cloud',
      '04d': 'cloud-meatball',
      '04n': 'cloud-meatball',
      '09d': 'cloud-showers-heavy',
      '09n': 'cloud-showers-heavy',
      '10d': 'cloud-sun-rain',
      '10n': 'cloud-moon-rain',
      '11d': 'poo-storm',
      '11n': 'poo-storm',
      '13d': 'snowflake',
      '13n': 'snowflake',
      '50d': 'smog',
      '50n': 'smog',
    };
    return iconMap[icon] || 'sun';
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="controls">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Get Weather</button>
        </form>
        <button className="location-btn" onClick={handleLocationClick}>
          Use My Location
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <i className={`icon fas fa-${getWeatherIcon(weather.weather[0].icon)}`}></i>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}

      {forecast && (
        <div className="weather-forecast">
          <h2>5-Day Forecast</h2>
          <div className="forecast-grid">
            {forecast.list.map((item, index) => (
              <div className="forecast-item" key={index}>
                <i className={`icon fas fa-${getWeatherIcon(item.weather[0].icon)}`}></i>
                <h3>{new Date(item.dt_txt).toLocaleDateString()}</h3>
                <p>{item.weather[0].description}</p>
                <p>Temp: {item.main.temp} °C</p>
                <p>Humidity: {item.main.humidity} %</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
