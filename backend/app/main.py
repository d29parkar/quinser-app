from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.core.config import settings
from app.api.router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    # Startup
    print("Starting Quinser Pharmaceuticals API...")
    yield
    # Shutdown
    print("Shutting down Quinser Pharmaceuticals API...")


app = FastAPI(
    title="Quinser Pharmaceuticals API",
    description="Backend API for Quinser Pharmaceuticals website",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Custom exception handler to match Express.js error format
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler."""
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error"}
    )


# Include API router
app.include_router(api_router)


# Convenience route for contact form (alias)
from app.db.session import get_db
from app.schemas.submission import SubmissionCreate
from app.models.submission import Submission

@app.post("/api/contact", status_code=201)
def contact_alias(submission_data: SubmissionCreate, db: Session = Depends(get_db)):
    """Alias for /api/submissions/contact."""
    submission = Submission(
        name=submission_data.name,
        email=submission_data.email,
        phone=submission_data.phone or "",
        subject=submission_data.subject,
        message=submission_data.message,
    )
    db.add(submission)
    db.flush()
    db.refresh(submission)
    return {
        "message": "Thank you for your message! We will get back to you soon.",
        "id": submission.id
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=5000, reload=True)
