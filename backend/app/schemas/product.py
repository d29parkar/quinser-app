from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ProductCreate(BaseModel):
    """Product creation request."""
    name: str
    category: str
    description: Optional[str] = ""


class ProductUpdate(BaseModel):
    """Product update request."""
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None


class ProductResponse(BaseModel):
    """Product response model."""
    id: int
    name: str
    category: str
    description: Optional[str] = ""
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
