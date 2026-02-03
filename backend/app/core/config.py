from pydantic_settings import BaseSettings
from pydantic import field_validator
from typing import Optional


class Settings(BaseSettings):
    # Database (using psycopg v3 sync driver)
    DATABASE_URL: str = "postgresql+psycopg://postgres:postgres@localhost:5432/quinser"

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def fix_database_url(cls, v: str) -> str:
        # Render provides postgresql:// but psycopg3 needs postgresql+psycopg://
        if v.startswith("postgresql://"):
            return v.replace("postgresql://", "postgresql+psycopg://", 1)
        return v

    # JWT
    JWT_SECRET: str = "your-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_HOURS: int = 24

    # Environment
    ENV: str = "development"

    # CORS - Allow frontend origins
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "https://quinser-app.vercel.app",
        "https://quinser.vercel.app",
        "https://www.quinser.com",
        "https://quinser.com",
    ]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
