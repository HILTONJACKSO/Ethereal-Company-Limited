# Ethereal Company Limited

Welcome to the official web platform for **Ethereal Company Limited**, a leading infrastructure, construction, logistics management, general procurement, civil engineering, and mining consultancy firm operating primarily across Liberia and Sierra Leone.

## Project Structure

This is a Full-Stack application divided into two primary sub-projects:

- `/frontend` - The Next.js (React) front-end application built with Bootstrap 5 and customized modern aesthetics.
- `/backend` - The Django Python backend providing the API for blog posts, careers, newsletters, and contact forms.
- `/deployment` - Contains scripts and configurations (PM2, Nginx) for seamless VPS deployment.

## Key Features

- **Dynamic Hero Section**: Ultra-modern background videos and statistics counters.
- **Service & Project Showcases**: Beautifully styled UI components to display infrastructure and logistical projects.
- **Fully Responsive**: Fluid typography and constraints ensuring perfect display from 4K TVs down to smartwatches.
- **High-Performance**: Pre-compiled Next.js static generation with Turbopack for lightning-fast speeds.
- **Dark Mode Support**: Deep integration with modern dark mode styling across all components.
- **REST API Integration**: Securely talks to the Django backend for dynamic content.

## Getting Started

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # (or `venv\Scripts\activate` on Windows)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Deployment
See the `/deployment` folder for Nginx reverse proxy routing and PM2 ecosystem configuration scripts tailored for Ubuntu/Hostinger VPS.

---
*Developed by the Ethereal IT Development Team.*
