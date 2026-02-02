from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database (using psycopg v3 sync driver)
    DATABASE_URL: str = "postgresql+psycopg://postgres:postgres@localhost:5432/quinser"

    # JWT
    JWT_SECRET: str = "your-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_HOURS: int = 24

    # Environment
    ENV: str = "development"

    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
