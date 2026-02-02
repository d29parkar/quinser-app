from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from app.db.session import get_db
from app.models.submission import Submission
from app.models.product import Product
from app.schemas.submission import (
    SubmissionCreate,
    SubmissionResponse,
    SubmissionCreateResponse,
    StatsResponse,
    MessageResponse,
)
from app.core.security import get_current_admin

router = APIRouter(prefix="/submissions", tags=["submissions"])


@router.post("/contact", response_model=SubmissionCreateResponse, status_code=status.HTTP_201_CREATED)
def create_submission(
    submission_data: SubmissionCreate,
    db: Session = Depends(get_db)
):
    """Submit a contact form (public)."""
    if not submission_data.name or not submission_data.email or not submission_data.subject or not submission_data.message:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"error": "Name, email, subject, and message are required"}
        )

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

    return SubmissionCreateResponse(
        message="Thank you for your message! We will get back to you soon.",
        id=submission.id
    )


@router.get("/stats/overview", response_model=StatsResponse)
def get_stats(
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin)
):
    """Get dashboard statistics (protected)."""
    # Total submissions
    total_submissions = db.query(func.count(Submission.id)).scalar() or 0

    # Unread submissions
    unread_submissions = db.query(func.count(Submission.id)).filter(Submission.is_read == 0).scalar() or 0

    # Total products
    total_products = db.query(func.count(Product.id)).scalar() or 0

    return StatsResponse(
        totalSubmissions=total_submissions,
        unreadSubmissions=unread_submissions,
        totalProducts=total_products
    )


@router.get("", response_model=List[SubmissionResponse])
def get_submissions(
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin)
):
    """Get all submissions (protected)."""
    submissions = db.query(Submission).order_by(Submission.created_at.desc()).all()
    return submissions


@router.get("/{submission_id}", response_model=SubmissionResponse)
def get_submission(
    submission_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin)
):
    """Get single submission by ID (protected)."""
    submission = db.query(Submission).filter(Submission.id == submission_id).first()

    if not submission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": "Submission not found"}
        )

    return submission


@router.put("/{submission_id}/read", response_model=SubmissionResponse)
def mark_as_read(
    submission_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin)
):
    """Mark submission as read (protected)."""
    submission = db.query(Submission).filter(Submission.id == submission_id).first()

    if not submission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": "Submission not found"}
        )

    submission.is_read = 1
    db.flush()
    db.refresh(submission)

    return submission


@router.delete("/{submission_id}", response_model=MessageResponse)
def delete_submission(
    submission_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin)
):
    """Delete a submission (protected)."""
    submission = db.query(Submission).filter(Submission.id == submission_id).first()

    if not submission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": "Submission not found"}
        )

    db.delete(submission)

    return MessageResponse(message="Submission deleted successfully")
