import { useState, useEffect } from 'react';
import './WeatherCard.css';

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData>({
    city: 'İstanbul',
    temperature: 22,
    condition: 'Güneşli',
    humidity: 65,
    windSpeed: 12,
  });

  const [loading, setLoading] = useState(false);

  // Simüle edilmiş hava durumu güncellemesi
  const updateWeather = () => {
    setLoading(true);
    setTimeout(() => {
      const cities = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa'];
      const conditions = ['Güneşli', 'Bulutlu', 'Yağmurlu', 'Karlı', 'Rüzgarlı'];
      
      setWeather({
        city: cities[Math.floor(Math.random() * cities.length)],
        temperature: Math.floor(Math.random() * 30) + 10,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
      });
      setLoading(false);
    }, 1000);
  };

  const getWeatherEmoji = (condition: string) => {
    const emojiMap: Record<string, string> = {
      'Güneşli': '☀️',
      'Bulutlu': '☁️',
      'Yağmurlu': '🌧️',
      'Karlı': '❄️',
      'Rüzgarlı': '💨',
    };
    return emojiMap[condition] || '🌤️';
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h3>🌡️ Hava Durumu</h3>
        <button 
          className="weather-refresh-btn" 
          onClick={updateWeather}
          disabled={loading}
        >
          {loading ? '⏳' : '🔄'}
        </button>
      </div>
      
      <div className="weather-content">
        <div className="weather-main">
          <div className="weather-city">{weather.city}</div>
          <div className="weather-temp">
            {weather.temperature}°C
          </div>
          <div className="weather-condition">
            {getWeatherEmoji(weather.condition)} {weather.condition}
          </div>
        </div>
        
        <div className="weather-details">
          <div className="weather-detail-item">
            <span className="detail-label">Nem</span>
            <span className="detail-value">{weather.humidity}%</span>
          </div>
          <div className="weather-detail-item">
            <span className="detail-label">Rüzgar</span>
            <span className="detail-value">{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

