#!/bin/bash
set -e

echo "======================================"
echo "Starting Ethereal Company Deployment"
echo "======================================"

# Ensure we are in the right directory (change to your path if different)
# cd /var/www/ethera-website

echo "1. Pulling latest code..."
git pull origin main

echo "2. Backend Setup (Django)..."
cd backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
deactivate
cd ..

echo "3. Frontend Setup (Next.js)..."
cd frontend
npm install
npm run build
cd ..

echo "4. Restarting Services with PM2..."
# If this is the first time, pm2 start ecosystem.config.js will run.
# Otherwise, pm2 reload all will gracefully restart existing apps.
pm2 reload ecosystem.config.js --update-env || pm2 start deployment/ecosystem.config.js

echo "======================================"
echo "Deployment Complete!"
echo "======================================"
