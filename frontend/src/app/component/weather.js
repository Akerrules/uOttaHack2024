// pages/index.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './component.css'; 

function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Function to fetch weather data
    const fetchWeatherData = async () => {
      try {
        // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=ottawa&appid=c8529b2d7e91ff78a3aa0f28f53f50ae`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    // Call the function to fetch weather data
    fetchWeatherData();
  }, []); // Empty dependency array ensures effect runs only once on mount

  const getWeatherIconUrl = (weatherCondition) => {
    // You can define mappings of weather conditions to icon URLs here
    switch (weatherCondition) {
      case 'Clear':
        return 'url_to_clear_weather_icon';
      case 'Clouds':
        return 'url_to_cloudy_weather_icon';
      case 'Rain':
        return 'url_to_rainy_weather_icon';
      // Add more cases for other weather conditions as needed
      case 'Fog':
        return '/weather/fog.png';
      default:
        return '/weather/sun.png';
    }
  };

  return (
    <div>
      {weatherData && (
        <div className='flex'>
          <p className='font-bold'>{(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
          {weatherData.weather[0].icon && (
            <img
              className="weatherIcon"
              src={getWeatherIconUrl(weatherData.weather[0].main)}
              alt="Weather Icon"
            />
          )}
          <p>{weatherData.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
