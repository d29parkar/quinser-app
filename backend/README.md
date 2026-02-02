# Quinser Pharmaceuticals - FastAPI Backend

FastAPI backend for Quinser Pharmaceuticals website.

## Tech Stack

- **FastAPI** - Modern Python web framework
- **SQLAlchemy 2.0** - Async ORM
- **asyncpg** - Async PostgreSQL driver
- **Alembic** - Database migrations
- **Pydantic** - Data validation
- **python-jose** - JWT authentication
- **passlib** - Password hashing (bcrypt)

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── core/
│   │   ├── config.py        # Settings and configuration
│   │   └── security.py      # JWT and password utilities
│   ├── db/
│   │   ├── base.py          # SQLAlchemy base class
│   │   ├── session.py       # Database session management
│   │   └── init_db.py       # Database seeding script
│   ├── models/
│   │   ├── admin.py         # Admin model
│   │   ├── product.py       # Product model
│   │   └── submission.py    # Submission model
│   ├── schemas/
│   │   ├── auth.py          # Auth Pydantic schemas
│   │   ├── product.py       # Product Pydantic schemas
│   │   └── submission.py    # Submission Pydantic schemas
│   ├── api/
│   │   ├── router.py        # Main API router
│   │   └── routes/
│   │       ├── auth.py      # Auth endpoints
│   │       ├── products.py  # Product endpoints
│   │       ├── submissions.py # Submission endpoints
│   │       └── health.py    # Health check endpoint
│   └── services/            # Business logic (if needed)
├── alembic/
│   ├── env.py               # Alembic environment
│   └── versions/            # Migration files
├── alembic.ini              # Alembic configuration
├── requirements.txt         # Python dependencies
├── Dockerfile               # Docker build file
├── .env.example             # Environment template
└── README.md                # This file
```

## Quick Start

### Prerequisites

- Python 3.11+
- PostgreSQL (local or Docker)

### Setup

1. **Create virtual environment:**
   ```bash
   python -m venv venv

   # Windows
   venv\Scripts\activate

   # macOS/Linux
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Run migrations:**
   ```bash
   alembic upgrade head
   ```

5. **Seed database:**
   ```bash
   python -m app.db.init_db
   ```

6. **Start server:**
   ```bash
   uvicorn app.main:app --reload --port 5000
   ```

### Using Docker Compose

From the project root:

```bash
# Start PostgreSQL
docker compose up -d

# Run migrations
cd backend
alembic upgrade head

# Seed database
python -m app.db.init_db

# Start server
uvicorn app.main:app --reload --port 5000
```

## API Documentation

Once the server is running:

- **Swagger UI:** http://localhost:5000/docs
- **ReDoc:** http://localhost:5000/redoc

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql+asyncpg://postgres:postgres@localhost:5432/quinser` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key-change-in-production` |
| `JWT_ALGORITHM` | JWT signing algorithm | `HS256` |
| `JWT_EXPIRE_HOURS` | Token expiration time | `24` |
| `ENV` | Environment (development/production) | `development` |

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token (protected)

### Products
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get single product
- `POST /api/products` - Create product (protected)
- `PUT /api/products/{id}` - Update product (protected)
- `DELETE /api/products/{id}` - Delete product (protected)

### Submissions
- `POST /api/submissions/contact` - Submit contact form
- `POST /api/contact` - Alias for contact form
- `GET /api/submissions` - List submissions (protected)
- `GET /api/submissions/{id}` - Get submission (protected)
- `PUT /api/submissions/{id}/read` - Mark as read (protected)
- `DELETE /api/submissions/{id}` - Delete submission (protected)
- `GET /api/submissions/stats/overview` - Dashboard stats (protected)

### Health
- `GET /api/health` - Health check

## Default Admin Credentials

- **Username:** `admin`
- **Password:** `quinser2025`

## Database Migrations

```bash
# Create a new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1

# View migration history
alembic history
```

## Testing

```bash
# Run tests (if implemented)
pytest

# With coverage
pytest --cov=app
```

## Deployment

See [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for full deployment instructions.

### Quick Deploy to Render

1. Set root directory to `backend`
2. Build command: `pip install -r requirements.txt && alembic upgrade head && python -m app.db.init_db`
3. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables (DATABASE_URL, JWT_SECRET, ENV)
