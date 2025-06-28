export interface WeatherData {
  name: string;
  main: { 
    temp: number; 
    humidity: number; 
    feels_like: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  weather: { 
    description: string; 
    main: string;
    icon: string;
  }[];
  wind: { speed: number };
  sys: { country: string };
  visibility: number;
}

export interface HistoryItem {
  city: string;
  weather: WeatherData;
  date: string;
  _id: string;
} 