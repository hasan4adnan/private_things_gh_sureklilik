import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import './WeatherCard.css';

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

const CITIES = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa'] as const;
const CONDITIONS = ['Güneşli', 'Bulutlu', 'Yağmurlu', 'Karlı', 'Rüzgarlı'] as const;
const EMOJI_MAP: Record<string, string> = {
  'Güneşli': '☀️',
  'Bulutlu': '☁️',
  'Yağmurlu': '🌧️',
  'Karlı': '❄️',
  'Rüzgarlı': '💨',
};

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData>({
    city: 'İstanbul',
    temperature: 22,
    condition: 'Güneşli',
    humidity: 65,
    windSpeed: 12,
  });

  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Simüle edilmiş hava durumu güncellemesi
  const updateWeather = useCallback(() => {
    if (loading) return;
    
    setLoading(true);
    timeoutRef.current = setTimeout(() => {
      setWeather({
        city: CITIES[Math.floor(Math.random() * CITIES.length)],
        temperature: Math.floor(Math.random() * 30) + 10,
        condition: CONDITIONS[Math.floor(Math.random() * CONDITIONS.length)],
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
      });
      setLoading(false);
    }, 1000);
  }, [loading]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const weatherEmoji = useMemo(() => 
    EMOJI_MAP[weather.condition] || '🌤️',
    [weather.condition]
  );

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
            {weatherEmoji} {weather.condition}
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

