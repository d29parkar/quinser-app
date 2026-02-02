from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class SubmissionCreate(BaseModel):
    """Contact form submission request."""
    name: str
    email: str
    phone: Optional[str] = ""
    subject: str
    message: str


class SubmissionResponse(BaseModel):
    """Submission response model."""
    id: int
    name: str
    email: str
    phone: Optional[str] = ""
    subject: str
    message: str
    is_read: int
    created_at: datetime

    class Config:
        from_attributes = True


class SubmissionCreateResponse(BaseModel):
    """Response after creating a submission."""
    message: str
    id: int


class StatsResponse(BaseModel):
    """Dashboard statistics response."""
    totalSubmissions: int
    unreadSubmissions: int
    totalProducts: int


class MessageResponse(BaseModel):
    """Generic message response."""
    message: str
