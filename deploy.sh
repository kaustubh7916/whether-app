#!/bin/bash

echo "🌐 Weather App Deployment Script"
echo "=================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "🚀 Starting deployment..."

# Deploy Backend
echo "📡 Deploying Backend..."
cd weather-server
vercel --prod

# Get backend URL
BACKEND_URL=$(vercel ls | grep weather-server | awk '{print $2}')
echo "✅ Backend deployed at: $BACKEND_URL"

# Deploy Frontend
echo "🎨 Deploying Frontend..."
cd ../weather-client
vercel --prod -e REACT_APP_API_URL=$BACKEND_URL

# Get frontend URL
FRONTEND_URL=$(vercel ls | grep weather-client | awk '{print $2}')
echo "✅ Frontend deployed at: $FRONTEND_URL"

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo "Frontend: $FRONTEND_URL"
echo "Backend: $BACKEND_URL"
echo ""
echo "⚠️  Don't forget to set environment variables in Vercel dashboard:"
echo "   - MONGO_URI"
echo "   - OPENWEATHER_API_KEY"
echo "   - RESEND_API_KEY"
echo "   - FROM_EMAIL"
echo "   - ADMIN_EMAIL"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions" 