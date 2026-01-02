# backend/database.py - INLINE (No settings.py required!)
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Direct from environment - No pydantic_settings needed
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("❌ DATABASE_URL environment variable REQUIRED")

engine = create_engine(
    DATABASE_URL,
    connect_args={
        "ssl": {
            "ssl-mode": "REQUIRED",
            "ca": "/opt/render/project/src/backend/ca.pem"
        }
    } if "mysql" in DATABASE_URL.lower() else {
        "check_same_thread": False  # Local SQLite fallback
    }
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# REQUIRED for routes/auth.py
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
