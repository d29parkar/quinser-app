"""Add image_url to products

Revision ID: 002_add_image_url
Revises: 001_initial
Create Date: 2026-04-01 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '002_add_image_url'
down_revision: Union[str, None] = '001_initial'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'products',
        sa.Column('image_url', sa.Text(), nullable=True)
    )


def downgrade() -> None:
    op.drop_column('products', 'image_url')
