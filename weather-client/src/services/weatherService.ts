import { WeatherData, HistoryItem } from '../types/weather';
import { performanceMonitor } from '../utils/performance';

const API_BASE_URL = 'http://localhost:5000/weather';

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const isCacheValid = (timestamp: number) => {
  return Date.now() - timestamp < CACHE_DURATION;
};

export const weatherService = {
  async getWeather(city: string): Promise<WeatherData> {
    const startTime = performance.now();
    const cacheKey = `weather:${city.toLowerCase().trim()}`;
    const cached = cache.get(cacheKey);
    
    // Return cached data if still valid
    if (cached && isCacheValid(cached.timestamp)) {
      performanceMonitor.trackApiCall('weather-cache-hit', performance.now() - startTime);
      return cached.data;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}?city=${encodeURIComponent(city.trim())}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'City not found');
      }
      
      const data = await response.json();
      
      // Cache the result
      cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      // Track performance
      performanceMonitor.trackApiCall('weather-api', performance.now() - startTime);
      
      return data;
    } catch (error) {
      performanceMonitor.trackApiCall('weather-error', performance.now() - startTime);
      throw error;
    }
  },

  async getHistory(): Promise<HistoryItem[]> {
    const startTime = performance.now();
    const cacheKey = 'history';
    const cached = cache.get(cacheKey);
    
    // Return cached data if still valid (shorter cache for history)
    if (cached && isCacheValid(cached.timestamp)) {
      performanceMonitor.trackApiCall('history-cache-hit', performance.now() - startTime);
      return cached.data;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/history`);
      const data = await response.json();
      
      // Cache the result
      cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      // Track performance
      performanceMonitor.trackApiCall('history-api', performance.now() - startTime);
      
      return data;
    } catch (error) {
      performanceMonitor.trackApiCall('history-error', performance.now() - startTime);
      console.log('Failed to fetch history');
      return [];
    }
  },

  // Clear cache method for manual cache invalidation
  clearCache() {
    cache.clear();
  },

  // Get cache stats for debugging
  getCacheStats() {
    return {
      size: cache.size,
      keys: Array.from(cache.keys())
    };
  },

  // Get performance stats
  getPerformanceStats() {
    return performanceMonitor.getStats();
  }
}; 