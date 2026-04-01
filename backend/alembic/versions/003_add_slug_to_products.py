"""Add slug column to products

Revision ID: 003_add_slug
Revises: 002_add_image_url
Create Date: 2026-04-01 00:00:00.000000

"""
import re
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import text


# revision identifiers, used by Alembic.
revision: str = '003_add_slug'
down_revision: Union[str, None] = '002_add_image_url'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def _slugify(name: str) -> str:
    slug = name.lower()
    slug = re.sub(r'[()]', '', slug)
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    slug = re.sub(r'-{2,}', '-', slug)
    return slug


def upgrade() -> None:
    # 1. Add slug column as nullable first (existing rows have no value yet)
    op.add_column(
        'products',
        sa.Column('slug', sa.String(length=255), nullable=True)
    )

    # 2. Back-fill slug from name for all existing rows
    connection = op.get_bind()
    rows = connection.execute(text("SELECT id, name FROM products")).fetchall()
    for row in rows:
        slug = _slugify(row.name)
        connection.execute(
            text("UPDATE products SET slug = :slug WHERE id = :id"),
            {"slug": slug, "id": row.id}
        )

    # 3. Add index
    op.create_index('ix_products_slug', 'products', ['slug'], unique=False)


def downgrade() -> None:
    op.drop_index('ix_products_slug', table_name='products')
    op.drop_column('products', 'slug')
