# 🌤️ Weather App - Full Stack React & Node.js Application

A modern, responsive weather application built with React, Node.js, and MongoDB. Features real-time weather data, contact form with email notifications, and a beautiful user interface.

![Weather App Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=Weather+App+Screenshot)

## ✨ Features

### 🌡️ Weather Functionality
- **Real-time Weather Data**: Get current weather conditions for any city worldwide
- **Weather Details**: Temperature, humidity, wind speed, pressure, and more
- **Search History**: Track your previous weather searches
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Loading States**: Smooth loading animations and error handling

### 📧 Contact System
- **Contact Form**: Professional contact form with validation
- **Email Notifications**: Receive instant email notifications via Resend
- **Database Storage**: All contact submissions saved to MongoDB
- **Admin Features**: View and manage contact submissions

### 🎨 User Interface
- **Modern Design**: Clean, intuitive interface with smooth animations
- **Responsive Layout**: Optimized for all screen sizes
- **Dark/Light Theme**: Eye-friendly design
- **Performance Optimized**: Fast loading with lazy loading and caching

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **CSS3** - Custom styling with animations and responsive design
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Nodemailer** - Email sending functionality
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

### External Services
- **OpenWeatherMap API** - Weather data provider
- **Resend** - Email service for contact form notifications
- **MongoDB Atlas** - Cloud database hosting

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or Atlas)
- OpenWeatherMap API key
- Resend API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd weather-server
   npm install

   # Install frontend dependencies
   cd ../weather-client
   npm install
   ```

3. **Environment Setup**

   **Backend (.env in weather-server folder):**
   ```env
   MONGO_URI=your_mongodb_connection_string
   OPENWEATHER_API_KEY=your_openweathermap_api_key
   RESEND_API_KEY=your_resend_api_key
   FROM_EMAIL=noreply@resend.dev
   ADMIN_EMAIL=your_email@example.com
   PORT=3000
   NODE_ENV=development
   ```

   **Frontend (.env in weather-client folder):**
   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

4. **Start the application**
   ```bash
   # Start backend server (from weather-server folder)
   npm start

   # Start frontend (from weather-client folder, in new terminal)
   npm start
   ```

5. **Open your browser**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

## 📁 Project Structure

```
weather-app/
├── weather-client/          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── README.md
├── weather-server/          # Node.js backend
│   ├── routes/             # API routes
│   ├── bin/                # Server startup
│   ├── public/             # Static files
│   ├── app.js              # Express app
│   ├── package.json
│   └── README.md
├── DEPLOYMENT.md           # Deployment guide
├── deploy.sh              # Deployment script
└── README.md              # This file
```

## 🔧 API Endpoints

### Weather API
- `GET /weather?city=CityName` - Get weather data for a city
- `GET /weather/history` - Get search history
- `POST /weather/cache/clear` - Clear weather cache

### Contact API
- `POST /contact` - Submit contact form
- `GET /contact` - Get all contact submissions (admin)
- `GET /contact/:id` - Get specific contact submission
- `PUT /contact/:id/status` - Update contact status

## 🌐 Deployment

### Vercel (Recommended - Free)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy backend
cd weather-server
vercel

# Deploy frontend
cd ../weather-client
vercel
```

### Other Options
- **Railway** - Free tier available
- **Render** - Free tier available
- **Heroku** - Paid service

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🔑 Environment Variables

### Required for Backend
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/weatherapp` |
| `OPENWEATHER_API_KEY` | OpenWeatherMap API key | `your_api_key_here` |
| `RESEND_API_KEY` | Resend email service API key | `re_your_key_here` |
| `FROM_EMAIL` | Sender email address | `noreply@resend.dev` |
| `ADMIN_EMAIL` | Admin email for notifications | `admin@example.com` |

### Required for Frontend
| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:3000` |

## 🎯 Features in Detail

### Weather Search
- Search for any city worldwide
- Real-time weather data from OpenWeatherMap
- Detailed weather information including:
  - Current temperature and feels like
  - Humidity, pressure, and wind speed
  - Weather description and icon
  - Sunrise and sunset times

### Search History
- Automatic tracking of previous searches
- Quick access to recent cities
- Persistent storage in database

### Contact Form
- Professional contact form with validation
- Multiple subject categories
- Instant email notifications
- Database storage for all submissions
- Admin interface for managing submissions

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Smooth animations and transitions
- Modern UI/UX design

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Find process using port
   netstat -ano | findstr :3000
   # Kill process
   taskkill /PID <PID> /F
   ```

2. **MongoDB connection issues**
   - Check your connection string
   - Ensure MongoDB is running
   - Verify network access (for Atlas)

3. **Email not sending**
   - Verify Resend API key
   - Check email addresses are valid
   - Review Resend dashboard for errors

4. **Weather API errors**
   - Verify OpenWeatherMap API key
   - Check API quota limits
   - Ensure city names are correct

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Resend](https://resend.com/) for email service
- [MongoDB](https://mongodb.com/) for database
- [React](https://reactjs.org/) and [Node.js](https://nodejs.org/) communities

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review the troubleshooting section above

---

**Made with ❤️ by [Your Name]**

⭐ **Star this repository if you found it helpful!**
