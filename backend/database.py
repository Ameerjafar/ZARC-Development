# backend/database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from settings import settings

# Validate DATABASE_URL exists
if not settings.DATABASE_URL:
    raise ValueError("DATABASE_URL not set in .env")

engine = create_engine(
    settings.DATABASE_URL,
    echo=True if os.getenv("DEBUG") == "true" else False,  # Debug logging
    pool_pre_ping=True,  # Test connections
    connect_args={
        "ssl": {
            "ssl-mode": "REQUIRED",
            "ca": "/opt/render/project/src/backend/ca.pem"
        }
    } if "mysql" in settings.DATABASE_URL.lower() else {
        "check_same_thread": False  # SQLite
    }
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
