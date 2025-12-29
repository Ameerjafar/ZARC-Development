from passlib.context import CryptContext

# Create password context for hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    try:
        # Ensure password is a string and not empty
        if not isinstance(password, str) or not password:
            raise ValueError("Password must be a non-empty string")
        
        # Bcrypt can handle up to 72 bytes, but we validate at schema level
        # Passlib's bcrypt will handle truncation if needed
        return pwd_context.hash(password)
    except Exception as e:
        print(f"Error hashing password: {e}")
        print(f"Password type: {type(password)}, Length: {len(password) if isinstance(password, str) else 'N/A'}")
        raise


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)
