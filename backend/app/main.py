import logging
import traceback
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from sqlalchemy.orm import Session

from app.core.config import settings
from app.api.router import api_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BASE_URL = "https://www.quinserpharma.com"

# Static product slugs — matches src/data/products.json exactly.
# Only update this list when the static JSON is updated.
STATIC_PRODUCT_SLUGS = [
    "sucralser-o-gel",
    "spertoli-sachet",
    "lithomag-b6-active-syrup",
    "gastrosec-dsr-caps",
    "quinser-sp-tablet",
    "pulmoquin-ab-tablet",
    "fluprit-p-tablet",
    "carbosync-500-tablet",
    "carbosync-ds-tablet",
    "tamlocort-s-caps",
    "prostocort-d-tabs",
    "osteoquin-tablet",
    "citraflow-sachet",
    "mitoquin-300-softgel-caps",
    "neuroquin-pfs-injection",
    "inoglide-m-tablet",
    "lumiser-d3-60k-nanoshot-syp",
    "raftogard-syrup",
    "bismag-lc-tablet",
    "cranser-uti-susp",
    "granser-md-mouth-dissolving-tablet",
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    print("Starting Quinser Pharmaceuticals API...")
    yield
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


# Custom exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler."""
    logger.error("Unhandled exception on %s %s", request.method, request.url)
    logger.error(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "detail": str(exc)}
    )


# Include API router
app.include_router(api_router)


# Convenience route for contact form (alias)
from app.db.session import get_db
from app.schemas.submission import SubmissionCreate
from app.models.submission import Submission
from app.models.product import Product


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


@app.get("/sitemap.xml", include_in_schema=False)
def sitemap(db: Session = Depends(get_db)):
    """Dynamic XML sitemap combining static product pages and DB-added products."""

    urls = []

    # Core pages
    core_pages = [
        ("", "weekly", "1.0"),
        ("products", "weekly", "0.9"),
        ("contact", "monthly", "0.8"),
        ("manufacturing", "monthly", "0.7"),
        ("team", "monthly", "0.7"),
    ]
    for path, freq, priority in core_pages:
        loc = f"{BASE_URL}/{path}" if path else BASE_URL
        urls.append(f"""  <url>
    <loc>{loc}</loc>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
  </url>""")

    # Static product pages (always present, no DB needed)
    for slug in STATIC_PRODUCT_SLUGS:
        urls.append(f"""  <url>
    <loc>{BASE_URL}/products/{slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>""")

    # DB-added product pages (slug stored in DB, back-filled by migration)
    db_products = db.query(Product).filter(Product.slug.isnot(None)).order_by(Product.id.asc()).all()
    for product in db_products:
        urls.append(f"""  <url>
    <loc>{BASE_URL}/products/{product.slug}</loc>
    <lastmod>{product.updated_at.strftime('%Y-%m-%d')}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>""")

    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    xml += "\n".join(urls)
    xml += "\n</urlset>\n"

    return Response(content=xml, media_type="application/xml")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=5000, reload=True)
