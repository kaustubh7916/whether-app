# Weather Server (Backend)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in this directory with the following content:
   ```env
   MONGO_URI=your_mongodb_connection_string
   OPENWEATHER_API_KEY=your_openweathermap_api_key
   RESEND_API_KEY=your_resend_api_key
   FROM_EMAIL=noreply@yourdomain.com
   ADMIN_EMAIL=your_email@example.com
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Environment Variables

- `MONGO_URI`: MongoDB connection string for storing weather data and contact form submissions
- `OPENWEATHER_API_KEY`: API key from OpenWeatherMap for weather data
- `RESEND_API_KEY`: API key from Resend for sending emails
- `FROM_EMAIL`: Email address that will appear as the sender (should be verified in Resend)
- `ADMIN_EMAIL`: Email address where contact form submissions will be sent

## Email Setup with Resend (Free)

Resend is a modern, free email service that's easy to set up:

1. **Sign up for Resend** (free tier):
   - Go to [resend.com](https://resend.com)
   - Create a free account
   - Get 3,000 emails/month free

2. **Get your API key**:
   - Go to Resend dashboard
   - Copy your API key
   - Add it to your `.env` file as `RESEND_API_KEY`

3. **Verify your domain** (optional but recommended):
   - Add your domain to Resend
   - Verify it by adding DNS records
   - Use your domain email as `FROM_EMAIL`

4. **For testing** (without domain verification):
   - Use `noreply@resend.dev` as `FROM_EMAIL`
   - This is a test domain provided by Resend

## API Endpoints

### Weather
- `GET /weather?city=CityName` - Get weather data for a city
- `GET /weather/history` - Get search history
- `POST /weather/cache/clear` - Clear weather cache

### Contact
- `POST /contact` - Submit contact form
- `GET /contact` - Get all contact submissions (admin)
- `GET /contact/:id` - Get specific contact submission
- `PUT /contact/:id/status` - Update contact status

The server will run on port 3000 by default. 