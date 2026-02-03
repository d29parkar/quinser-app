# Quinser Pharmaceuticals -- Full-Stack Web Application

## A. Project Overview

Quinser Pharmaceuticals Pvt. Ltd. is a Mumbai-based pharmaceutical company built on the principles of **Quality, Integrity, and Service**. This repository contains the complete source code for their corporate website and admin content management system.

The system has two audiences:

- **Public visitors** see a marketing website with pages for Home, Products, Manufacturing, Team, and Contact. The Products page pulls live data from a database, and the Contact page submits enquiry forms that directors can review later.
- **Company admins (directors)** access a password-protected admin panel at `/admin` where they can manage the product catalogue, read contact-form submissions, and see dashboard statistics -- all without touching code.

**Core features:**

- Public product catalogue with category filtering (data served from PostgreSQL, not a static JSON file)
- Contact form that persists submissions to the database
- Admin dashboard with stats (total products, total messages, unread messages)
- Full CRUD for products (create, read, update, delete) behind authentication
- Submission management with read/unread status tracking
- JWT-based admin authentication

---

## B. Tech Stack

### Frontend

| Technology | Version | Why it was chosen |
|---|---|---|
| **React** | 18.2 | Component-based UI library -- the industry standard for building interactive SPAs. Huge ecosystem, strong community, and easy to reason about with its one-way data flow. |
| **Vite** | 5.x | Development server and build tool. Chosen over Create React App because it starts instantly (uses native ES modules in dev) and produces smaller, faster production builds. Config lives in [`vite.config.js`](vite.config.js). |
| **Tailwind CSS** | 3.3 | Utility-first CSS framework. Instead of writing separate `.css` files, you compose styles directly in JSX class names (`className="text-primary font-bold"`). The custom colour palette (primary blue `#0047AB`, secondary red `#E4002B`) is defined in [`tailwind.config.js`](tailwind.config.js). |
| **React Router DOM** | 6.x | Client-side routing. Defined in [`src/App.jsx`](src/App.jsx) -- maps URL paths like `/products` or `/admin/submissions` to React components without full-page reloads. |

The frontend has **no state management library** (no Redux, no Zustand). State is handled via React's built-in `useState` and `useContext` hooks. The only shared context is [`src/context/AuthContext.jsx`](src/context/AuthContext.jsx), which manages the admin login token.

### Backend

| Technology | Version | Why it was chosen |
|---|---|---|
| **FastAPI** | 0.109+ | Modern Python web framework with automatic OpenAPI docs, type validation via Pydantic, and dependency injection. Faster than Flask, less boilerplate than Django. Entry point: [`backend/app/main.py`](backend/app/main.py). |
| **Python** | 3.11 | Required version. Set in [`render.yaml`](render.yaml) (`PYTHON_VERSION: 3.11.0`). |
| **SQLAlchemy** | 2.0+ | ORM (Object-Relational Mapper). Maps Python classes to database tables. This project uses **synchronous** SQLAlchemy (not async), with the `psycopg` v3 driver. Session management: [`backend/app/db/session.py`](backend/app/db/session.py). |
| **Alembic** | 1.13+ | Database migration tool. Tracks schema changes in version-controlled migration files so you can upgrade (or rollback) the database schema reproducibly. Config: [`backend/alembic.ini`](backend/alembic.ini), migrations: [`backend/alembic/versions/`](backend/alembic/versions/). |
| **python-jose** | 3.3+ | JWT (JSON Web Token) creation and verification. Used in [`backend/app/core/security.py`](backend/app/core/security.py). |
| **bcrypt** | 4.0+ | Password hashing. Passwords are never stored in plain text -- they are hashed with bcrypt before saving to the database. |
| **pydantic-settings** | 2.1+ | Loads configuration from environment variables and `.env` files into a typed `Settings` class. See [`backend/app/core/config.py`](backend/app/core/config.py). |
| **Uvicorn** | 0.27+ | ASGI server that actually runs the FastAPI app. In production: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`. |

### Database

| Technology | Details |
|---|---|
| **PostgreSQL 16** | Relational database. In production, hosted on Render (or Supabase). Locally, provided via Docker Compose ([`docker-compose.yml`](docker-compose.yml)). |
| **psycopg 3** | Python PostgreSQL driver (synchronous). The backend's `DATABASE_URL` validator in [`backend/app/core/config.py`](backend/app/core/config.py) automatically converts `postgresql://` (what Render provides) to `postgresql+psycopg://` (what SQLAlchemy + psycopg3 needs). |

> **Note for learners:** The existing `backend/README.md` and `DEPLOYMENT_GUIDE.md` mention `asyncpg` -- that is outdated. The codebase actually uses synchronous psycopg3 (`psycopg[binary]`). You can verify this in [`backend/requirements.txt`](backend/requirements.txt) and [`backend/app/db/session.py`](backend/app/db/session.py) (which uses `create_engine`, not `create_async_engine`).

---

## C. Deployment & Hosting

### Where each piece runs

| Component | Host | URL |
|---|---|---|
| Frontend (React/Vite) | **Vercel** (free tier) | `https://quinser.vercel.app` |
| Backend (FastAPI) | **Render** (free tier) | `https://quinser-app.onrender.com` |
| Database (PostgreSQL) | **Render Postgres** or **Supabase** (free tier) | Managed; backend connects via `DATABASE_URL` |

Evidence:
- Vercel config: [`vercel.json`](vercel.json) (SPA rewrite rules)
- Render config: [`render.yaml`](render.yaml) (service definition with build/start commands)
- CORS origins in [`backend/app/core/config.py`](backend/app/core/config.py) include both `quinser.vercel.app` and `quinser-app.vercel.app`
- Frontend env files ([`.env.production`](.env.production), [`.env.example`](.env.example)) set `VITE_API_URL=https://quinser-app.onrender.com`

### Architecture diagram

```
  Browser (user's device)
      |
      | HTTPS (port 443)
      v
  Vercel CDN
  Serves the built React SPA (HTML/JS/CSS)
  (static files from `npm run build`)
      |
      |  The React code in the browser makes
      |  fetch() calls over HTTPS to:
      v
  Render Web Service
  https://quinser-app.onrender.com
  Runs: uvicorn app.main:app
  (FastAPI application)
      |
      | TCP connection (port 5432)
      | using psycopg3 driver
      v
  PostgreSQL Database
  (Render Postgres or Supabase)
  Tables: admins, products, submissions
```

### Free-tier behaviour

Render's free tier **puts the backend to sleep** after 15 minutes of inactivity. The first request after sleep takes ~30 seconds while the service cold-starts. This is normal and affects all free-tier Render apps.

---

## D. How the Pieces Talk to Each Other (Mental Model)

This section explains what actually happens at the network level when a user interacts with the app. If you're new to full-stack development, this is the most important section to understand.

### What happens when a user opens the website

1. **DNS resolution:** The browser resolves `quinser.vercel.app` to Vercel's edge servers via DNS.
2. **HTML download:** Vercel serves `index.html` (the single-page app shell). This file contains `<script type="module" src="/src/main.jsx">` which triggers the browser to download the bundled JavaScript.
3. **React boots:** `main.jsx` renders `<App />`, which sets up React Router. The router looks at the URL path and renders the matching page component.
4. **API calls:** When the Products page mounts, its `useEffect` calls `fetch(\`${API_URL}/api/products\`)`. The `API_URL` comes from the Vite environment variable `VITE_API_URL` (baked in at build time).

### How the frontend knows the backend URL

Vite replaces `import.meta.env.VITE_API_URL` with the literal string value at **build time** (not runtime). This means:

- In development: the value comes from [`.env.local`](.env.local) or [`.env`](.env.example)
- In production: the value is set in Vercel's dashboard as an environment variable before building

If `VITE_API_URL` is not set, the code falls back to `'https://quinser-app.onrender.com'` (hardcoded in [`src/context/AuthContext.jsx`](src/context/AuthContext.jsx) and [`src/pages/Products.jsx`](src/pages/Products.jsx)).

### Cross-Origin Resource Sharing (CORS)

The frontend (`quinser.vercel.app`) and backend (`quinser-app.onrender.com`) are on **different origins** (different hostnames). Browsers block cross-origin requests by default as a security measure. To allow the frontend to call the backend:

1. FastAPI applies `CORSMiddleware` in [`backend/app/main.py`](backend/app/main.py):
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=settings.CORS_ORIGINS,  # List of allowed frontend URLs
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

2. The allowed origins list is defined in [`backend/app/core/config.py`](backend/app/core/config.py):
   ```
   http://localhost:5173       (Vite dev server)
   http://localhost:5174       (Vite dev server alternate port)
   http://localhost:3000       (alternative dev server)
   https://quinser-app.vercel.app
   https://quinser.vercel.app
   https://www.quinser.com
   https://quinser.com
   ```

3. When the browser makes a cross-origin request, it first sends a **preflight** `OPTIONS` request. FastAPI's CORS middleware responds with `Access-Control-Allow-Origin: https://quinser.vercel.app`, telling the browser "this origin is allowed". The browser then proceeds with the actual `GET`/`POST` request.

**Why this matters:** If you deploy the frontend to a new domain and forget to add it to `CORS_ORIGINS`, all API calls will fail with a CORS error in the browser console. The backend itself works fine -- it's the *browser* that blocks the response.

### Network protocols used

| Leg | Protocol | Why |
|---|---|---|
| Browser -> Vercel | HTTPS (TLS over TCP) | Vercel provides free TLS certificates. All traffic is encrypted. |
| Browser -> Render backend | HTTPS (TLS over TCP) | Render also provides free TLS. The browser sends `fetch()` requests over HTTPS. |
| Render backend -> PostgreSQL | TCP (port 5432) | The psycopg3 driver opens a direct TCP connection to the database. This connection is *not* HTTP -- it uses PostgreSQL's wire protocol. In production, Render-to-Render connections may use internal networking. |

### The "trust" model

The frontend does **not** share any secret with the backend. Trust works like this:

1. **HTTPS** ensures data in transit is encrypted and the server is who it claims to be (TLS certificate verification).
2. **CORS** ensures only approved frontend origins can make requests (browser-enforced).
3. **JWT tokens** prove the user has authenticated. The token is signed with `JWT_SECRET` (only the backend knows this). The frontend stores the token in `localStorage` and sends it in the `Authorization: Bearer <token>` header.
4. The backend **never trusts the frontend blindly** -- it validates the JWT signature on every protected request using the `get_current_admin` dependency.

---

## E. API Surface Area (Routes)

All routes are prefixed with `/api` (defined in [`backend/app/api/router.py`](backend/app/api/router.py)).

### Authentication (`/api/auth/*`) -- [`backend/app/api/routes/auth.py`](backend/app/api/routes/auth.py)

| Method | Path | Auth | Purpose | Request Body | Response |
|---|---|---|---|---|---|
| `POST` | `/api/auth/login` | No | Admin login | `{ "username": "...", "password": "..." }` | `{ "token": "jwt...", "admin": { "id": 1, "username": "admin" } }` |
| `GET` | `/api/auth/verify` | Yes (Bearer) | Verify token is still valid | -- | `{ "valid": true, "admin": { "id": 1, "username": "admin" } }` |

### Products (`/api/products/*`) -- [`backend/app/api/routes/products.py`](backend/app/api/routes/products.py)

| Method | Path | Auth | Purpose | Request Body | Response |
|---|---|---|---|---|---|
| `GET` | `/api/products` | No | List all products | -- | `[ { "id", "name", "category", "description", "created_at", "updated_at" } ]` |
| `GET` | `/api/products/{id}` | No | Get one product | -- | `{ "id", "name", "category", "description", "created_at", "updated_at" }` |
| `POST` | `/api/products` | Yes (Bearer) | Create a product | `{ "name": "...", "category": "...", "description": "..." }` | Created product object (201) |
| `PUT` | `/api/products/{id}` | Yes (Bearer) | Update a product | `{ "name?", "category?", "description?" }` (partial update) | Updated product object |
| `DELETE` | `/api/products/{id}` | Yes (Bearer) | Delete a product | -- | `{ "message": "Product deleted successfully" }` |

### Submissions (`/api/submissions/*`) -- [`backend/app/api/routes/submissions.py`](backend/app/api/routes/submissions.py)

| Method | Path | Auth | Purpose | Request Body | Response |
|---|---|---|---|---|---|
| `POST` | `/api/submissions/contact` | No | Submit contact form | `{ "name", "email", "phone?", "subject", "message" }` | `{ "message": "Thank you...", "id": 5 }` (201) |
| `POST` | `/api/contact` | No | Alias for above (convenience) | Same as above | Same as above |
| `GET` | `/api/submissions` | Yes (Bearer) | List all submissions | -- | `[ { "id", "name", "email", "phone", "subject", "message", "is_read", "created_at" } ]` |
| `GET` | `/api/submissions/{id}` | Yes (Bearer) | Get one submission | -- | Single submission object |
| `PUT` | `/api/submissions/{id}/read` | Yes (Bearer) | Mark as read | -- | Updated submission (is_read=1) |
| `DELETE` | `/api/submissions/{id}` | Yes (Bearer) | Delete a submission | -- | `{ "message": "Submission deleted successfully" }` |
| `GET` | `/api/submissions/stats/overview` | Yes (Bearer) | Dashboard statistics | -- | `{ "totalSubmissions", "unreadSubmissions", "totalProducts" }` |

### Health -- [`backend/app/api/routes/health.py`](backend/app/api/routes/health.py)

| Method | Path | Auth | Purpose | Response |
|---|---|---|---|---|
| `GET` | `/api/health` | No | Health check | `{ "status": "ok", "timestamp": "2025-..." }` |

### Auto-generated API docs

FastAPI automatically generates interactive API documentation:

- **Swagger UI:** `https://quinser-app.onrender.com/docs`
- **ReDoc:** `https://quinser-app.onrender.com/redoc`

---

## F. Authentication & Permissions

### How it works

1. **Login flow:**
   - Admin submits username/password to `POST /api/auth/login`
   - Backend looks up the username in the `admins` table ([`backend/app/models/admin.py`](backend/app/models/admin.py))
   - Verifies the password against the bcrypt hash using `bcrypt.checkpw()` ([`backend/app/core/security.py`](backend/app/core/security.py))
   - If valid, creates a JWT containing `{ "id": admin.id, "username": admin.username, "exp": <24h from now> }`
   - Returns the JWT to the frontend

2. **Token storage:**
   - The frontend stores the JWT in **`localStorage`** under the key `adminToken` ([`src/context/AuthContext.jsx`](src/context/AuthContext.jsx))
   - On every page load, the `AuthProvider` component tries to verify the stored token by calling `GET /api/auth/verify`
   - If verification fails (token expired or invalid), the token is removed and the user is logged out

3. **Protected routes (frontend):**
   - The [`ProtectedRoute`](src/components/ProtectedRoute.jsx) component wraps admin pages
   - If `admin` is `null` (not logged in), it redirects to `/admin/login`

4. **Protected endpoints (backend):**
   - Routes that need authentication use FastAPI's dependency injection: `_: dict = Depends(get_current_admin)`
   - `get_current_admin` extracts the Bearer token from the `Authorization` header, decodes and validates the JWT, and returns the admin info or raises a 401 error

### Role model

This system has a **single role**: admin. There is no multi-role system (no "editor" vs "viewer" distinction). Anyone with valid admin credentials has full access to all admin endpoints.

### Security-sensitive environment variables

| Variable | Why it's sensitive |
|---|---|
| `JWT_SECRET` | If leaked, anyone can forge valid admin tokens. Must be a long, random string in production. |
| `DATABASE_URL` | Contains the database hostname, username, and password. If leaked, the database is directly accessible. |

---

## G. Environment Variables & Configuration

### Frontend variables

| Variable | Set where | What it does |
|---|---|---|
| `VITE_API_URL` | Vercel dashboard (production), `.env.local` (development) | The base URL for all API calls. Baked into the JavaScript bundle at build time by Vite. Example: `https://quinser-app.onrender.com` |

**How Vite env vars work:** Only variables prefixed with `VITE_` are exposed to the frontend code. They are replaced at build time -- changing them requires a rebuild/redeploy. Access them via `import.meta.env.VITE_API_URL`.

### Backend variables

| Variable | Set where | What it does | Default |
|---|---|---|---|
| `DATABASE_URL` | Render dashboard, or `.env` locally | PostgreSQL connection string. The [`config.py`](backend/app/core/config.py) validator auto-converts `postgresql://` to `postgresql+psycopg://` for psycopg3 compatibility. | `postgresql+psycopg://postgres:postgres@localhost:5432/quinser` |
| `JWT_SECRET` | Render dashboard, or `.env` locally | Secret key used to sign and verify JWT tokens. Must be changed from the default in production. | `your-secret-key-change-in-production` |
| `JWT_ALGORITHM` | `.env` (rarely changed) | JWT signing algorithm. | `HS256` |
| `JWT_EXPIRE_HOURS` | Render dashboard, or `.env` locally | How long a login session lasts before the token expires. | `24` |
| `ENV` | Render dashboard, or `.env` locally | `development` enables SQL query logging. `production` disables it. | `development` |

### Backend .env template

See [`backend/.env.example`](backend/.env.example) for a ready-to-copy template.

### Troubleshooting

#### "Frontend can't reach backend" (CORS errors, network errors)

1. **CORS error in browser console** (`Access-Control-Allow-Origin` missing): The frontend's origin is not in `CORS_ORIGINS`. Add it to the list in [`backend/app/core/config.py`](backend/app/core/config.py) and redeploy.
2. **Wrong `VITE_API_URL`**: Check the value in Vercel's environment variables. It must include the scheme (`https://`) and must NOT have a trailing slash.
3. **Mixed content** (`http` frontend calling `https` backend or vice versa): Both must be HTTPS in production.
4. **Backend is sleeping**: On Render free tier, the first request after inactivity takes ~30 seconds. The frontend may show "Failed to fetch products" during this cold start. Refresh the page.

#### "Backend can't connect to database"

1. **Wrong `DATABASE_URL`**: Verify the connection string in Render's environment variables. It must be a valid PostgreSQL URL.
2. **psycopg3 driver prefix**: Render provides `postgresql://...` but psycopg3 needs `postgresql+psycopg://...`. The app's config validator handles this automatically, but if you set `DATABASE_URL` in a `.env` file manually, use the `postgresql+psycopg://` prefix.
3. **Migrations not run**: If tables don't exist, the build command must include `alembic upgrade head`. Check [`render.yaml`](render.yaml) to confirm.
4. **Database not provisioned**: Ensure the PostgreSQL instance is running on Render/Supabase.

---

## H. Local Development Setup

### Prerequisites

- **Node.js** 18+ (for the frontend)
- **Python** 3.11+ (for the backend)
- **Docker & Docker Compose** (for local PostgreSQL -- optional if you have Postgres installed natively)

### Step 1: Clone and install frontend dependencies

```bash
git clone <your-repo-url>
cd quinser-app
npm install
```

### Step 2: Start local PostgreSQL

```bash
docker compose up -d
```

This starts a PostgreSQL 16 container on `localhost:5432` with username `postgres`, password `postgres`, database `quinser` (configured in [`docker-compose.yml`](docker-compose.yml)).

### Step 3: Set up the backend

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv

# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Copy the environment file
cp .env.example .env
# The defaults in .env.example work with the Docker Compose Postgres

# Run database migrations (creates tables)
alembic upgrade head

# Seed the database with default admin + sample products
python -m app.db.init_db

# Start the backend server
uvicorn app.main:app --reload --port 5000
```

### Step 4: Start the frontend (separate terminal)

```bash
# From the project root (not backend/)
npm run dev
```

### Step 5: Open in browser

| URL | What it shows |
|---|---|
| `http://localhost:5173` | Public website |
| `http://localhost:5173/admin` | Admin panel (login required) |
| `http://localhost:5000/docs` | FastAPI Swagger UI (interactive API docs) |
| `http://localhost:5000/redoc` | FastAPI ReDoc (alternative API docs) |

### Default admin credentials

- **Username:** `admin`
- **Password:** `quinser2025`

These are seeded by [`backend/app/db/init_db.py`](backend/app/db/init_db.py). Change the password in production by updating the database directly or modifying the seed script.

### Common local development issues

| Problem | Fix |
|---|---|
| `pip install` fails on `psycopg` | Install system dependency: `apt install libpq-dev` (Linux) or `brew install libpq` (macOS) |
| Port 5432 already in use | Another Postgres instance is running. Stop it or change the port in `docker-compose.yml` |
| Frontend shows "Failed to fetch products" | Make sure the backend is running on port 5000 and that `.env.local` has `VITE_API_URL=http://localhost:5000` |
| `alembic upgrade head` fails | Make sure PostgreSQL is running and `DATABASE_URL` in `.env` is correct |

---

## I. Admin API & Admin Workflows (Developer View)

### How "admin" is implemented

The system uses a single `admins` table ([`backend/app/models/admin.py`](backend/app/models/admin.py)) with columns: `id`, `username`, `password` (bcrypt hash), `created_at`. There is no role column -- all admins have identical permissions.

### Admin endpoints summary

All admin (protected) endpoints require the `Authorization: Bearer <jwt>` header. The JWT is validated by the `get_current_admin` dependency in [`backend/app/core/security.py`](backend/app/core/security.py).

**Product management:**

- `POST /api/products` -- Create. Requires `name` and `category`. [`backend/app/api/routes/products.py:35`](backend/app/api/routes/products.py#L35)
- `PUT /api/products/{id}` -- Update. Partial updates supported (send only changed fields). [`backend/app/api/routes/products.py:61`](backend/app/api/routes/products.py#L61)
- `DELETE /api/products/{id}` -- Delete. Permanent, no soft-delete. [`backend/app/api/routes/products.py:91`](backend/app/api/routes/products.py#L91)

**Submission management:**

- `GET /api/submissions` -- List all, ordered by newest first. [`backend/app/api/routes/submissions.py:73`](backend/app/api/routes/submissions.py#L73)
- `GET /api/submissions/{id}` -- Read single submission. [`backend/app/api/routes/submissions.py:83`](backend/app/api/routes/submissions.py#L83)
- `PUT /api/submissions/{id}/read` -- Mark as read (sets `is_read = 1`). [`backend/app/api/routes/submissions.py:101`](backend/app/api/routes/submissions.py#L101)
- `DELETE /api/submissions/{id}` -- Permanent delete. [`backend/app/api/routes/submissions.py:123`](backend/app/api/routes/submissions.py#L123)
- `GET /api/submissions/stats/overview` -- Returns counts for dashboard cards. [`backend/app/api/routes/submissions.py:51`](backend/app/api/routes/submissions.py#L51)

### Admin UI pages

| Page | URL | Component file | Backend dependency |
|---|---|---|---|
| Login | `/admin/login` | [`src/pages/admin/Login.jsx`](src/pages/admin/Login.jsx) | `POST /api/auth/login` |
| Dashboard | `/admin` | [`src/pages/admin/Dashboard.jsx`](src/pages/admin/Dashboard.jsx) | `GET /api/submissions/stats/overview` |
| Products | `/admin/products` | [`src/pages/admin/Products.jsx`](src/pages/admin/Products.jsx) | `GET/POST/PUT/DELETE /api/products` |
| Submissions | `/admin/submissions` | [`src/pages/admin/Submissions.jsx`](src/pages/admin/Submissions.jsx) | `GET/PUT/DELETE /api/submissions` |

Admin pages have their own header (no public Navbar/Footer). This is handled by the `Layout` component in [`src/App.jsx`](src/App.jsx) which checks `location.pathname.startsWith('/admin')`.

---

## J. SEO (Current State & Improvements)

### What currently exists

The project has solid SEO foundations, all implemented in [`index.html`](index.html):

**Meta tags (lines 9-14):**
- Title: "Quinser Pharmaceuticals Pvt. Ltd. | Quality, Integrity and Service"
- Description, keywords, author, robots (`index, follow`)
- Canonical URL: `https://quinser.vercel.app/`

**Open Graph and Twitter Cards (lines 18-30):**
- `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:site_name`
- Twitter card metadata (summary_large_image)

**Structured data / JSON-LD (lines 38-75):**
- Schema.org `Organization` type with name, logo, address, contact points, email

**Sitemap and robots.txt:**
- [`public/sitemap.xml`](public/sitemap.xml) -- Lists 5 public pages with priorities and change frequencies
- [`public/robots.txt`](public/robots.txt) -- `Allow: /` with sitemap reference

**Google Search Console:**
- [`public/google5bbf0f33e418713b.html`](public/google5bbf0f33e418713b.html) -- Verification file present

### Proposed improvements (future)

1. **Dynamic meta tags per page:** Currently all pages share the same `<title>` and `<meta description>` from `index.html`. Use a library like `react-helmet-async` to set page-specific titles (e.g., "Our Products | Quinser Pharmaceuticals" on the Products page).

2. **Dynamic OG images:** Generate unique Open Graph images per product or page for richer social media previews.

3. **Extended JSON-LD:** Add `Product` schema markup for individual products (requires server-side rendering or pre-rendering to be useful to crawlers).

4. **Automated sitemap generation:** The current sitemap is static. Automate it as part of the build process to stay in sync with routes.

5. **Server-side rendering (SSR) or pre-rendering:** React SPAs are not ideal for SEO because search engine crawlers may not execute JavaScript. Consider:
   - **Pre-rendering** with a tool like `vite-plugin-ssr` or `prerender-spa-plugin` to generate static HTML for each public route at build time
   - **SSR** with Next.js or Remix if the project grows significantly

6. **Performance:** Add `loading="lazy"` to images, optimize the logo PNG, use WebP format, minimize CSS/JS bundle size.

7. **Accessibility:** Add ARIA labels to interactive elements, ensure sufficient colour contrast ratios, add skip-to-content links.

---

## K. Repo Cleanup Note

The following files existed before this documentation update and have been consolidated:

| File | Action | Reason |
|---|---|---|
| `README.md` (root) | **Replaced** | Previously contained only `# quinser-app`. Now contains the comprehensive developer documentation you are reading. |
| `backend/README.md` | **Kept as-is** | Contains backend-specific quick-start instructions and project structure. Useful for developers working only on the backend. Points to this README for full context. |
| `DEPLOYMENT_GUIDE.md` | **Kept as-is** | Contains step-by-step deployment instructions for Supabase, Render, and Vercel with screenshots-level detail. Useful as a standalone deployment tutorial. |

**Inaccuracy corrected:** Both `backend/README.md` and `DEPLOYMENT_GUIDE.md` reference `asyncpg` as the database driver. The codebase actually uses **psycopg v3 (synchronous)**. See [`backend/requirements.txt`](backend/requirements.txt) (`psycopg[binary]>=3.2.3`) and [`backend/app/db/session.py`](backend/app/db/session.py) (`create_engine`, not `create_async_engine`). This README reflects the actual code.

**Legacy file:** [`src/data/products.json`](src/data/products.json) is a static JSON file from before the database migration. It is no longer used by the frontend (products are fetched from the API). It remains in the repo as a reference but has no runtime effect.

---

## Project Structure

```
quinser-app/
├── index.html                     # SPA entry point with SEO meta tags
├── package.json                   # Frontend dependencies (React, Vite, Tailwind)
├── vite.config.js                 # Vite build configuration
├── tailwind.config.js             # Tailwind theme (custom colours, fonts)
├── postcss.config.js              # PostCSS plugins (Tailwind, Autoprefixer)
├── vercel.json                    # Vercel SPA rewrite rules
├── render.yaml                    # Render backend service definition
├── docker-compose.yml             # Local PostgreSQL via Docker
├── .env.example                   # Frontend env template
├── .env.local                     # Local frontend env (VITE_API_URL)
├── .env.production                # Production frontend env
│
├── public/
│   ├── assets/logo.png            # Company logo
│   ├── favicon.svg                # Browser tab icon
│   ├── robots.txt                 # Search engine crawler rules
│   ├── sitemap.xml                # Sitemap for SEO
│   └── google5bbf0f33e418713b.html # Google Search Console verification
│
├── src/
│   ├── main.jsx                   # React entry point
│   ├── App.jsx                    # Router + Layout (public + admin routes)
│   ├── index.css                  # Tailwind base styles
│   ├── context/
│   │   └── AuthContext.jsx        # Auth state (token, login, logout)
│   ├── components/
│   │   ├── Navbar.jsx             # Public navigation bar
│   │   ├── Footer.jsx             # Public footer with contact info
│   │   └── ProtectedRoute.jsx     # Auth guard for admin pages
│   ├── pages/
│   │   ├── Home.jsx               # Landing page (hero, about, leadership)
│   │   ├── Products.jsx           # Public product catalogue
│   │   ├── Manufacturing.jsx      # Capabilities and certifications
│   │   ├── Team.jsx               # Team member profiles
│   │   ├── Contact.jsx            # Contact form
│   │   └── admin/
│   │       ├── Login.jsx          # Admin login form
│   │       ├── Dashboard.jsx      # Stats + quick actions
│   │       ├── Products.jsx       # CRUD product management
│   │       └── Submissions.jsx    # Contact form submissions viewer
│   └── data/
│       └── products.json          # Legacy static data (unused)
│
└── backend/
    ├── app/
    │   ├── main.py                # FastAPI app, CORS, global error handler
    │   ├── core/
    │   │   ├── config.py          # Settings (env vars, CORS origins)
    │   │   └── security.py        # JWT + bcrypt utilities
    │   ├── db/
    │   │   ├── base.py            # SQLAlchemy declarative base
    │   │   ├── session.py         # Engine + session factory
    │   │   └── init_db.py         # Seed script (admin + products)
    │   ├── models/
    │   │   ├── admin.py           # Admin table model
    │   │   ├── product.py         # Product table model
    │   │   └── submission.py      # Submission table model
    │   ├── schemas/
    │   │   ├── auth.py            # Login/verify request/response shapes
    │   │   ├── product.py         # Product CRUD shapes
    │   │   └── submission.py      # Submission shapes + stats
    │   ├── api/
    │   │   ├── router.py          # API router (/api prefix)
    │   │   └── routes/
    │   │       ├── auth.py        # POST /login, GET /verify
    │   │       ├── products.py    # Product CRUD endpoints
    │   │       ├── submissions.py # Submission endpoints + stats
    │   │       └── health.py      # GET /health
    │   └── services/              # (empty, for future business logic)
    ├── alembic/
    │   ├── env.py                 # Alembic config (reads DATABASE_URL)
    │   └── versions/
    │       └── 001_initial_tables.py  # Creates admins, products, submissions
    ├── alembic.ini                # Alembic settings
    ├── requirements.txt           # Python dependencies
    ├── Dockerfile                 # Docker build for backend
    ├── .env.example               # Backend env template
    └── README.md                  # Backend-specific quick start
```
