import React, { useMemo } from 'react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  // Memoize the weather icon URL
  const weatherIconUrl = useMemo(() => {
    return `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  }, [weather.weather[0].icon]);

  // Memoize the weather details
  const weatherDetails = useMemo(() => [
    {
      label: '🌡️ Min/Max',
      value: `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
    },
    {
      label: '💧 Humidity',
      value: `${weather.main.humidity}%`
    },
    {
      label: '🌬️ Wind Speed',
      value: `${weather.wind.speed} m/s`
    },
    {
      label: '📊 Pressure',
      value: `${weather.main.pressure} hPa`
    },
    {
      label: '👁️ Visibility',
      value: `${(weather.visibility / 1000).toFixed(1)} km`
    }
  ], [weather.main, weather.wind, weather.visibility]);

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="description">{weather.weather[0].description}</p>
        </div>
        <img 
          src={weatherIconUrl} 
          alt={weather.weather[0].description}
          className="weather-icon"
          loading="lazy"
        />
      </div>

      <div className="temperature">
        <span className="temp-main">{Math.round(weather.main.temp)}°C</span>
        <span className="temp-feels">Feels like {Math.round(weather.main.feels_like)}°C</span>
      </div>

      <div className="weather-details">
        {weatherDetails.map((detail, index) => (
          <div key={index} className="detail-item">
            <span className="detail-label">{detail.label}</span>
            <span className="detail-value">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(WeatherCard); 