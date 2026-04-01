from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ProductCreate(BaseModel):
    """Product creation request."""
    name: str
    category: str
    description: Optional[str] = ""
    image_url: Optional[str] = None


class ProductUpdate(BaseModel):
    """Product update request."""
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None


class ProductResponse(BaseModel):
    """Product response model."""
    id: int
    name: str
    category: str
    description: Optional[str] = ""
    image_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
