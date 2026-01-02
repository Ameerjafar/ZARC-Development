from passlib.context import CryptContext

# Create password context for hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash a password using bcrypt (Truncates to 72 bytes safely)"""
    try:
        # Ensure password is valid
        if not isinstance(password, str) or not password:
            raise ValueError("Password must be a non-empty string")
        
        # ⚠️ CRITICAL FIX: Manually truncate to 72 bytes
        # Newer bcrypt versions crash instead of truncating automatically.
        # This prevents "ValueError: password cannot be longer than 72 bytes"
        return pwd_context.hash(password[:72])
        
    except Exception as e:
        print(f"Error hashing password: {e}")
        raise

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    if not plain_password or not hashed_password:
        return False
        
    # Also truncate input password to match the hashing logic
    return pwd_context.verify(plain_password[:72], hashed_password)
