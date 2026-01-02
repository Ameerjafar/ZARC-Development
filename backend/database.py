# backend/database.py - NO IMPORT NEEDED
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable required")

engine = create_engine(
    DATABASE_URL,
    connect_args={
        "ssl": {
            "ssl-mode": "REQUIRED", 
            "ca": "/opt/render/project/src/backend/ca.pem"
        }
    } if "mysql" in DATABASE_URL.lower() else {
        "check_same_thread": False
    }
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
