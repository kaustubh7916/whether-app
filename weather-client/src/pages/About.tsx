import React from 'react';

const About: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>About WeatherApp</h1>
          <p>Your trusted companion for weather information</p>
        </div>

        <div className="about-sections">
          <section className="about-section">
            <h2>🌤️ What We Do</h2>
            <p>
              WeatherApp provides real-time weather information for cities around the world. 
              Get accurate temperature, humidity, wind speed, and more with our easy-to-use interface.
            </p>
          </section>

          <section className="about-section">
            <h2>🚀 Features</h2>
            <ul className="features-list">
              <li>Real-time weather data from OpenWeatherMap API</li>
              <li>Search any city worldwide</li>
              <li>Detailed weather information including temperature, humidity, and wind</li>
              <li>Search history to track your previous searches</li>
              <li>Responsive design that works on all devices</li>
              <li>Modern, intuitive user interface</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>🛠️ Technology Stack</h2>
            <div className="tech-stack">
              <div className="tech-item">
                <h3>Frontend</h3>
                <ul>
                  <li>React 18 with TypeScript</li>
                  <li>Modern CSS with animations</li>
                  <li>Responsive design</li>
                </ul>
              </div>
              <div className="tech-item">
                <h3>Backend</h3>
                <ul>
                  <li>Node.js with Express</li>
                  <li>MongoDB for data storage</li>
                  <li>OpenWeatherMap API integration</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>📊 Data Sources</h2>
            <p>
              Our weather data is powered by OpenWeatherMap, a leading provider of weather information. 
              We ensure accurate and up-to-date weather forecasts for locations worldwide.
            </p>
          </section>

          <section className="about-section">
            <h2>📱 Get Started</h2>
            <p>
              Simply enter a city name in the search bar on our home page to get started. 
              View current weather conditions, check your search history, and stay informed about the weather anywhere in the world.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About; 