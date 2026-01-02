from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    """Zarc API Settings - Loads from .env"""
    
    # REQUIRED - No defaults for production DB
    DATABASE_URL: str  
    SECRET_KEY: str
    
    # Optional with safe defaults
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    FRONTEND_URL: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False  # DATABASE_URL = database_url
        extra = "ignore"

settings = Settings()
