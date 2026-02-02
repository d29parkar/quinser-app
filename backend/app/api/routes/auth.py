from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.db.session import get_db
from app.models.admin import Admin
from app.schemas.auth import LoginRequest, LoginResponse, VerifyResponse, AdminInfo
from app.core.security import verify_password, create_access_token, get_current_admin

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db)
):
    """Authenticate admin and return JWT token."""
    if not credentials.username or not credentials.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"error": "Username and password required"}
        )

    # Find admin by username
    admin = db.query(Admin).filter(Admin.username == credentials.username).first()

    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"error": "Invalid credentials"}
        )

    # Verify password
    if not verify_password(credentials.password, admin.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"error": "Invalid credentials"}
        )

    # Create JWT token
    token = create_access_token(data={"id": admin.id, "username": admin.username})

    return LoginResponse(
        token=token,
        admin=AdminInfo(id=admin.id, username=admin.username)
    )


@router.get("/verify", response_model=VerifyResponse)
def verify_token(
    current_admin: dict = Depends(get_current_admin)
):
    """Verify JWT token validity."""
    return VerifyResponse(
        valid=True,
        admin=AdminInfo(id=current_admin["id"], username=current_admin["username"])
    )
