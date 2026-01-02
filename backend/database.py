from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    DATABASE_URL: str

settings = Settings()

engine = create_engine(
    settings.DATABASE_URL,
    connect_args={
        "ssl": {
            "ssl-mode": "REQUIRED",
            "ca": "/opt/render/project/src/backend/ca.pem"
        }
    } if "mysql" in settings.DATABASE_URL else {
        "check_same_thread": False
    }
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
