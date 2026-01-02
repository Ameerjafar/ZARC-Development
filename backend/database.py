from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from urllib.parse import quote_plus

# Ensure PyMySQL driver is used
DATABASE_URL = settings.DATABASE_URL.replace("mysql://", "mysql+pymysql://")

if "sqlite" in DATABASE_URL:
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )
else:  # MySQL (Aiven)
    engine = create_engine(
        DATABASE_URL,
        connect_args={
            "ssl": {
                "ssl-mode": "REQUIRED",
                "ca": "/opt/render/project/src/backend/ca.pem"  # Full path for Render
            }
        }
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
