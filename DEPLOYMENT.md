# 🌐 Weather App Deployment Guide

## 🚀 Quick Deploy Options

### **Option 1: Vercel (Recommended - Free)**

#### **Frontend (React) Deployment:**
1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend:**
   ```bash
   cd weather-client
   vercel
   ```
   - Follow the prompts
   - Set environment variable: `REACT_APP_API_URL` to your backend URL

3. **Deploy Backend:**
   ```bash
   cd weather-server
   vercel
   ```
   - Set environment variables in Vercel dashboard:
     - `MONGO_URI`
     - `OPENWEATHER_API_KEY`
     - `RESEND_API_KEY`
     - `FROM_EMAIL`
     - `ADMIN_EMAIL`

---

### **Option 2: Railway (Free Tier)**

#### **Deploy Both Frontend & Backend:**
1. **Sign up at [railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Deploy Backend:**
   - Select `weather-server` directory
   - Add environment variables
4. **Deploy Frontend:**
   - Select `weather-client` directory
   - Set build command: `npm run build`
   - Set output directory: `build`

---

### **Option 3: Render (Free Tier)**

#### **Backend Deployment:**
1. **Sign up at [render.com](https://render.com)**
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Configure:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables: Add all required vars

#### **Frontend Deployment:**
1. **Create a new Static Site**
2. **Configure:**
   - Build Command: `npm run build`
   - Publish Directory: `build`

---

### **Option 4: Heroku (Paid)**

#### **Backend Deployment:**
1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku app:**
   ```bash
   cd weather-server
   heroku create your-weather-app-backend
   ```

3. **Add MongoDB addon:**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

4. **Set environment variables:**
   ```bash
   heroku config:set OPENWEATHER_API_KEY=your_key
   heroku config:set RESEND_API_KEY=your_key
   heroku config:set FROM_EMAIL=noreply@resend.dev
   heroku config:set ADMIN_EMAIL=your_email@example.com
   ```

5. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

#### **Frontend Deployment:**
1. **Create another Heroku app:**
   ```bash
   cd weather-client
   heroku create your-weather-app-frontend
   ```

2. **Set buildpack:**
   ```bash
   heroku buildpacks:set mars/create-react-app
   ```

3. **Set environment variable:**
   ```bash
   heroku config:set REACT_APP_API_URL=https://your-backend-app.herokuapp.com
   ```

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy frontend"
   git push heroku main
   ```

---

## 🔧 Required Environment Variables

### **Backend (.env):**
```env
MONGO_URI=your_mongodb_connection_string
OPENWEATHER_API_KEY=your_openweathermap_api_key
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@resend.dev
ADMIN_EMAIL=your_email@example.com
PORT=3000
NODE_ENV=production
```

### **Frontend (.env):**
```env
REACT_APP_API_URL=https://your-backend-url.com
```

---

## 📊 Database Options

### **MongoDB Atlas (Free):**
1. **Sign up at [mongodb.com](https://mongodb.com)**
2. **Create a free cluster**
3. **Get connection string**
4. **Add to environment variables**

### **Railway MongoDB (Free):**
1. **Create MongoDB service in Railway**
2. **Copy connection string**
3. **Add to environment variables**

---

## 📧 Email Service Setup

### **Resend (Free Tier):**
1. **Sign up at [resend.com](https://resend.com)**
2. **Get API key**
3. **Add to environment variables**

---

## 🔍 Testing Your Deployment

1. **Test Weather API:**
   ```
   GET https://your-backend-url.com/weather?city=London
   ```

2. **Test Contact Form:**
   - Submit a test message
   - Check if you receive email
   - Verify data is saved to database

3. **Check Logs:**
   - Monitor your deployment platform's logs
   - Look for any errors

---

## 🚨 Common Issues & Solutions

### **CORS Errors:**
- Ensure your backend CORS settings include your frontend domain
- Update the CORS configuration in `app.js`

### **Environment Variables:**
- Double-check all environment variables are set correctly
- Ensure no typos in variable names

### **Database Connection:**
- Verify MongoDB connection string is correct
- Check if your IP is whitelisted (MongoDB Atlas)

### **Email Not Working:**
- Verify Resend API key is correct
- Check if email addresses are valid

---

## 📈 Performance Optimization

### **Frontend:**
- Enable compression in your deployment platform
- Use CDN for static assets
- Implement caching headers

### **Backend:**
- Enable compression middleware
- Implement proper caching
- Use connection pooling for database

---

## 🔒 Security Considerations

1. **Environment Variables:** Never commit sensitive data to Git
2. **CORS:** Configure properly for production domains
3. **Rate Limiting:** Implement API rate limiting
4. **HTTPS:** Ensure all communications use HTTPS
5. **Input Validation:** Validate all user inputs

---

## 📞 Support

If you encounter issues:
1. Check the deployment platform's logs
2. Verify all environment variables are set
3. Test API endpoints individually
4. Check database connectivity

---

**Choose the deployment option that best fits your needs and budget!** 