import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import WeatherCard from '../components/WeatherCard';
import SearchHistory from '../components/SearchHistory';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { WeatherData, HistoryItem } from '../types/weather';
import { weatherService } from '../services/weatherService';

const Home: React.FC = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Memoize the fetchHistory function
  const fetchHistory = useCallback(async () => {
    try {
      const data = await weatherService.getHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  }, []);

  // Memoize the fetchWeather function
  const fetchWeather = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    
    setError('');
    setLoading(true);
    setWeather(null);
    
    try {
      const data = await weatherService.getWeather(city);
      setWeather(data);
      await fetchHistory();
    } catch (err: any) {
      setError(err.message || 'Could not fetch weather data');
    } finally {
      setLoading(false);
    }
  }, [city, fetchHistory]);

  // Memoize the search form props
  const searchFormProps = useMemo(() => ({
    city,
    setCity,
    onSubmit: fetchWeather,
    loading
  }), [city, fetchWeather, loading]);

  // Memoize the error message component
  const errorMessage = useMemo(() => {
    return error ? <ErrorMessage message={error} /> : null;
  }, [error]);

  // Memoize the loading spinner
  const loadingSpinner = useMemo(() => {
    return loading ? <LoadingSpinner /> : null;
  }, [loading]);

  // Memoize the weather card
  const weatherCard = useMemo(() => {
    return weather ? <WeatherCard weather={weather} /> : null;
  }, [weather]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="home-page">
      <Header />
      
      <SearchForm {...searchFormProps} />
      {errorMessage}
      {loadingSpinner}
      {weatherCard}
      <SearchHistory history={history} />
    </div>
  );
};

export default React.memo(Home); 