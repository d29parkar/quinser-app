"""Quick script to verify the database connection and check table/data status."""

import sys
import os

# Add the backend directory to path so app imports work
sys.path.insert(0, os.path.dirname(__file__))

from app.core.config import settings
from sqlalchemy import create_engine, text

print(f"Testing connection to: {settings.DATABASE_URL[:60]}...")
print()

try:
    engine = create_engine(settings.DATABASE_URL, connect_args={"connect_timeout": 10})

    with engine.connect() as conn:
        # 1. Basic connectivity
        conn.execute(text("SELECT 1"))
        print("✓ Connection successful")

        # 2. Check tables exist
        result = conn.execute(text("""
            SELECT table_name FROM information_schema.tables
            WHERE table_schema = 'public'
            ORDER BY table_name
        """))
        tables = [row[0] for row in result]
        print(f"✓ Tables found: {tables}")

        # 3. Check row counts
        for table in ["admins", "products", "submissions"]:
            if table in tables:
                count = conn.execute(text(f"SELECT COUNT(*) FROM {table}")).scalar()
                print(f"  - {table}: {count} rows")
            else:
                print(f"  - {table}: TABLE MISSING (run alembic upgrade head)")

except Exception as e:
    print(f"✗ Connection failed: {e}")
    sys.exit(1)
