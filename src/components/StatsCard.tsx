import { useState, useEffect } from 'react';
import './StatsCard.css';

interface Stat {
  label: string;
  value: number;
  icon: string;
  color: string;
}

export default function StatsCard() {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'Toplam Ziyaret', value: 0, icon: '👥', color: '#4f8cff' },
    { label: 'Aktif Kullanıcı', value: 0, icon: '⚡', color: '#10b981' },
    { label: 'Görev Tamamlandı', value: 0, icon: '✅', color: '#f59e0b' },
    { label: 'Mesaj', value: 0, icon: '💬', color: '#ef4444' },
  ]);

  useEffect(() => {
    // Animasyonlu sayı artışı
    const intervals = stats.map((stat, index) => {
      const targetValue = Math.floor(Math.random() * 1000) + 100;
      let currentValue = 0;
      const increment = targetValue / 50;
      
      return setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          setStats(prev => {
            const newStats = [...prev];
            newStats[index] = { ...newStats[index], value: Math.floor(currentValue) };
            return newStats;
          });
        } else {
          setStats(prev => {
            const newStats = [...prev];
            newStats[index] = { ...newStats[index], value: Math.floor(currentValue) };
            return newStats;
          });
        }
      }, 30);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="stats-container">
      <h3 className="stats-title">📊 İstatistikler</h3>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
            style={{ '--stat-color': stat.color } as React.CSSProperties}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value.toLocaleString()}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

