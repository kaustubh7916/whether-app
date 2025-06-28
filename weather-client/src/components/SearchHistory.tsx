import React from 'react';
import { WeatherData, HistoryItem } from '../types/weather';

interface SearchHistoryProps {
  history: HistoryItem[];
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="history-section">
      <h3>📚 Recent Searches</h3>
      <div className="history-list">
        {history.map(item => (
          <div key={item._id} className="history-item">
            <div className="history-city">{item.city}</div>
            <div className="history-temp">{Math.round(item.weather.main.temp)}°C</div>
            <div className="history-date">{formatDate(item.date)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory; 