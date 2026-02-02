from pydantic import BaseModel


class AdminInfo(BaseModel):
    """Admin info returned in responses."""
    id: int
    username: str


class LoginRequest(BaseModel):
    """Login request body."""
    username: str
    password: str


class LoginResponse(BaseModel):
    """Login response body."""
    token: str
    admin: AdminInfo


class VerifyResponse(BaseModel):
    """Token verification response."""
    valid: bool
    admin: AdminInfo


class ErrorResponse(BaseModel):
    """Error response body."""
    error: str
