import React from 'react';

interface SearchFormProps {
  city: string;
  setCity: (city: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ city, setCity, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="search-form">
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="search-input"
          disabled={loading}
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? '⏳' : '🔍'}
        </button>
      </div>
    </form>
  );
};

export default SearchForm; 