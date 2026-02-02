from fastapi import APIRouter

from app.api.routes import auth, products, submissions, health

api_router = APIRouter(prefix="/api")

# Include all route modules
api_router.include_router(auth.router)
api_router.include_router(products.router)
api_router.include_router(submissions.router)
api_router.include_router(health.router)
