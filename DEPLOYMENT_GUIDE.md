# Deployment Guide - Quinser Pharmaceuticals

This guide will help you deploy both the backend (FastAPI/Python) and frontend (React) to make your app accessible online.

## Overview - 100% FREE HOSTING

- **Backend:** Deploy to Render (Free tier) - FastAPI/Python
- **Frontend:** Deploy to Vercel (Free tier) - React/Vite
- **Database:** PostgreSQL on Supabase (Free forever tier)

All services are completely free and will work indefinitely!

---

## Local Development Setup

### Prerequisites

- Python 3.11+
- Node.js 18+
- Docker & Docker Compose (for local PostgreSQL)

### Step 1: Start Local PostgreSQL

```bash
# Start PostgreSQL container
docker compose up -d

# Verify it's running
docker compose ps
```

### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Run database migrations
alembic upgrade head

# Seed the database
python -m app.db.init_db

# Start the backend server
uvicorn app.main:app --reload --port 5000
```

### Step 3: Setup Frontend

```bash
# In a new terminal, from project root
npm install
npm run dev
```

### Step 4: Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Docs:** http://localhost:5000/docs
- **Admin Panel:** http://localhost:5173/admin
  - Username: `admin`
  - Password: `quinser2025`

---

## Part 1: Set Up PostgreSQL Database on Supabase

### Step 1: Create a Supabase Account

1. Go to [Supabase.com](https://supabase.com)
2. Click "Start your project" and sign up with GitHub
3. Authorize Supabase to access your GitHub account

### Step 2: Create a New Project

1. Click "New Project"
2. Fill in the details:
   - **Name:** quinser-database
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose closest to your location
   - **Pricing Plan:** Free (selected by default)
3. Click "Create new project"
4. Wait 2-3 minutes for the database to be provisioned

### Step 3: Get Database Connection String

1. Once created, go to "Project Settings" (gear icon at bottom left)
2. Click "Database" in the sidebar
3. Scroll down to "Connection string"
4. Select "URI" and copy the connection string
5. It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`
6. **For FastAPI**, modify the URL to use asyncpg driver:
   - Change `postgresql://` to `postgresql+asyncpg://`
   - Example: `postgresql+asyncpg://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`
7. **Save this connection string** - you'll need it for backend deployment

---

## Part 2: Deploy Backend to Render (FastAPI)

### Step 1: Create a Render Account

1. Go to [Render.com](https://render.com)
2. Click "Get Started" and sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Create a New Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub account if not already connected
3. Find and select your `quinser-app` repository
4. Click "Connect"

### Step 3: Configure the Web Service

Fill in the configuration:

- **Name:** `quinser-backend` (or any name you prefer)
- **Region:** Choose closest to your location
- **Branch:** `main`
- **Root Directory:** `backend` ⚠️ IMPORTANT!
- **Runtime:** Python 3
- **Build Command:** `pip install -r requirements.txt && alembic upgrade head && python -m app.db.init_db`
- **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Instance Type:** Free

### Step 4: Add Environment Variables

Scroll down to "Environment Variables" and click "Add Environment Variable"

Add these variables:

```
DATABASE_URL = postgresql+asyncpg://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
JWT_SECRET = your-super-secret-key-change-this-to-something-random
JWT_EXPIRE_HOURS = 24
ENV = production
```

Replace the DATABASE_URL with your actual Supabase connection string from Part 1, Step 3.

### Step 5: Deploy

1. Click "Create Web Service"
2. Render will start building and deploying your backend
3. Wait 3-5 minutes for the first deployment
4. Once deployed, you'll see "Live" status

### Step 6: Get Your Backend URL

1. At the top of the page, you'll see your service URL
2. It looks like: `https://quinser-backend.onrender.com`
3. **Copy and save this URL** - you'll need it for the frontend
4. Test it by visiting: `https://your-backend-url.onrender.com/api/health`
5. You should see: `{"status":"ok","timestamp":"..."}`

**Important Note:** The free tier on Render "sleeps" after 15 minutes of inactivity. When someone visits your site, it will wake up automatically (takes ~30 seconds on first visit).

---

## Part 3: Deploy Frontend to Vercel

### Step 1: Create Vercel Account

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### Step 2: Import Project

1. Click "Add New..." → "Project"
2. Select your `quinser-app` repository
3. Configure the project:
   - **Framework Preset:** Vite
   - **Root Directory:** `.` (leave as root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3: Add Environment Variable

1. Expand the "Environment Variables" section
2. Add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend-url.onrender.com`

   Replace with your actual Render backend URL from Part 2, Step 6

3. Click "Deploy"
4. Wait 2-3 minutes for deployment to complete

### Step 4: Get Your Frontend URL

1. Once deployed, Vercel will show your site
2. URL looks like: `https://quinser-app.vercel.app`
3. Click "Visit" to view your live site
4. You can add a custom domain later if you have one

---

## Part 4: Testing Your Deployment

### Test Backend

1. Visit: `https://your-backend-url.onrender.com/api/health`
2. You should see: `{"status":"ok","timestamp":"..."}`
3. API documentation: `https://your-backend-url.onrender.com/docs`

### Test Frontend

1. Visit your Vercel URL
2. Navigate through the site - all pages should work
3. Try the contact form on the Contact page
4. It should submit successfully

### Test Admin Panel

1. Go to: `https://your-vercel-url.vercel.app/admin`
2. Login with:
   - **Username:** `admin`
   - **Password:** `quinser2025`
3. You should see the admin dashboard
4. Try creating/editing a product
5. Check submissions from the contact form

**Success!** All directors can now access this URL and manage content from anywhere!

---

## API Endpoints Reference

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | Public | Login and get JWT token |
| GET | `/api/auth/verify` | Protected | Verify token validity |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/{id}` | Public | Get single product |
| POST | `/api/products` | Protected | Create product |
| PUT | `/api/products/{id}` | Protected | Update product |
| DELETE | `/api/products/{id}` | Protected | Delete product |

### Submissions
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/submissions/contact` | Public | Submit contact form |
| POST | `/api/contact` | Public | Alias for contact form |
| GET | `/api/submissions` | Protected | Get all submissions |
| GET | `/api/submissions/{id}` | Protected | Get single submission |
| PUT | `/api/submissions/{id}/read` | Protected | Mark as read |
| DELETE | `/api/submissions/{id}` | Protected | Delete submission |
| GET | `/api/submissions/stats/overview` | Protected | Dashboard stats |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

---

## Part 5: Sharing Access with Directors

### Admin Panel Access

Share this URL with all directors:
```
https://your-vercel-url.vercel.app/admin
```

Login credentials:
- **Username:** `admin`
- **Password:** `quinser2025`

**⚠️ IMPORTANT:** Change the default password after first login for security!

### Managing Products & Submissions

All directors can:
- Log in from anywhere in the world
- Add/edit/delete products
- View contact form submissions
- All changes are saved to the cloud database
- Changes are visible to everyone immediately

---

## Part 6: Updating Your App

### To Update Products/Content:

1. Any director logs into the admin panel
2. Makes changes (add products, view submissions, etc.)
3. Changes are saved automatically to Supabase
4. Visible to all users immediately

### To Update Code:

When you make code changes:

1. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```

2. Both Render and Vercel will **automatically redeploy** within 2-3 minutes
3. No manual deployment needed!

---

## Troubleshooting

### Backend takes 30+ seconds to respond
- This is normal for free tier on Render (it was sleeping)
- Use UptimeRobot to keep it awake

### "Failed to fetch products" error
- Check that `VITE_API_URL` is set correctly in Vercel
- Verify backend is running on Render (check dashboard)
- Wait 30 seconds if backend was sleeping

### "Database connection error"
- Verify `DATABASE_URL` is correct in Render
- Make sure it uses `postgresql+asyncpg://` prefix
- Check your Supabase database is running
- Check Render logs for specific errors

### Admin login not working
- Verify backend deployed successfully on Render
- Check Render logs for errors
- Ensure `JWT_SECRET` is set in Render environment variables
- Try resetting the deployment on Render

---

## Cost Summary

| Service | Cost | What You Get |
|---------|------|--------------|
| Supabase | **FREE** | PostgreSQL database, 500MB storage |
| Render | **FREE** | Backend hosting, sleeps after 15min |
| Vercel | **FREE** | Frontend hosting, 100GB bandwidth |
| **TOTAL** | **$0/month** | Fully functional web app! |

---

**Congratulations!** 🎉

Your app is now deployed for **FREE** and accessible to all directors worldwide!
