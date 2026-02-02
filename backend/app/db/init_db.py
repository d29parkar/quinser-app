"""Database initialization and seeding script."""

from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.admin import Admin
from app.models.product import Product
from app.core.security import get_password_hash


# Default admin credentials
DEFAULT_ADMIN_USERNAME = "admin"
DEFAULT_ADMIN_PASSWORD = "quinser2025"

# Default products (matching the original SQLite data)
DEFAULT_PRODUCTS = [
    {"name": "Antibiotic Capsules 500mg", "category": "Antibiotics", "description": "Broad-spectrum antibiotic capsules for treating bacterial infections"},
    {"name": "Pain Relief Tablets", "category": "Analgesics", "description": "Fast-acting pain relief tablets for mild to moderate pain"},
    {"name": "Cardiac Care Formula", "category": "Cardiology", "description": "Cardiovascular health supplement for heart wellness"},
    {"name": "Diabetes Management", "category": "Endocrinology", "description": "Blood sugar management supplement"},
    {"name": "Respiratory Relief", "category": "Pulmonology", "description": "Respiratory health support for easier breathing"},
    {"name": "Digestive Health Capsules", "category": "Gastroenterology", "description": "Probiotic capsules for digestive wellness"},
    {"name": "Multivitamin Complex", "category": "Nutritional Supplements", "description": "Complete daily multivitamin with essential nutrients"},
    {"name": "Skin Care Cream", "category": "Dermatology", "description": "Moisturizing cream for healthy skin"},
    {"name": "Allergy Relief Tablets", "category": "Allergy", "description": "Non-drowsy antihistamine tablets"},
    {"name": "Joint Health Supplement", "category": "Orthopedics", "description": "Glucosamine and chondroitin for joint health"},
    {"name": "Eye Care Drops", "category": "Ophthalmology", "description": "Lubricating eye drops for dry eyes"},
    {"name": "Antiviral Tablets", "category": "Antivirals", "description": "Antiviral medication for viral infections"},
    {"name": "Fertility Support Formula", "category": "Fertility Products", "description": "Nutritional support for reproductive health"},
]


def seed_admin(session: Session) -> None:
    """Seed the default admin user."""
    # Check if admin already exists
    existing_admin = session.query(Admin).filter(Admin.username == DEFAULT_ADMIN_USERNAME).first()

    if existing_admin:
        print(f"Admin user '{DEFAULT_ADMIN_USERNAME}' already exists. Skipping.")
        return

    # Create default admin
    hashed_password = get_password_hash(DEFAULT_ADMIN_PASSWORD)
    admin = Admin(
        username=DEFAULT_ADMIN_USERNAME,
        password=hashed_password,
    )
    session.add(admin)
    session.commit()
    print(f"Created default admin user: {DEFAULT_ADMIN_USERNAME}")


def seed_products(session: Session) -> None:
    """Seed default products."""
    # Check if products already exist
    existing_products = session.query(Product).all()

    if existing_products:
        print(f"Products already exist ({len(existing_products)} found). Skipping.")
        return

    # Insert default products
    for product_data in DEFAULT_PRODUCTS:
        product = Product(
            name=product_data["name"],
            category=product_data["category"],
            description=product_data["description"],
        )
        session.add(product)

    session.commit()
    print(f"Created {len(DEFAULT_PRODUCTS)} default products.")


def init_db() -> None:
    """Initialize database with seed data."""
    print("Initializing database...")

    session = SessionLocal()
    try:
        seed_admin(session)
        seed_products(session)
    finally:
        session.close()

    print("Database initialization complete!")


if __name__ == "__main__":
    init_db()
