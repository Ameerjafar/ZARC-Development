from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from schemas.auth import SignUpRequest, SignInRequest, TokenResponse, UserResponse
from utils.security import hash_password, verify_password
from utils.auth import create_access_token

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def signup(request: SignUpRequest, db: Session = Depends(get_db)):
    """
    Create a new user account
    
    - **email**: Valid email address
    - **username**: Unique username (3-50 characters, alphanumeric with _ and -)
    - **password**: Strong password (min 8 chars, must include uppercase, lowercase, and digit)
    """
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if username already exists
    existing_username = db.query(User).filter(User.username == request.username).first()
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Create new user
    hashed_pwd = hash_password(request.password)
    new_user = User(
        email=request.email,
        username=request.username,
        hashed_password=hashed_pwd
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Create access token
    access_token = create_access_token(data={"sub": str(new_user.id), "email": new_user.email})
    
    # Return token and user data
    return TokenResponse(
        access_token=access_token,
        user=UserResponse.model_validate(new_user)
    )


@router.post("/signin", response_model=TokenResponse)
async def signin(request: SignInRequest, db: Session = Depends(get_db)):
    """
    Authenticate an existing user
    
    - **email**: Email address or username
    - **password**: User's password
    """
    # Try to find user by email or username
    user = db.query(User).filter(
        (User.email == request.email) | (User.username == request.email)
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Verify password
    if not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": str(user.id), "email": user.email})
    
    # Return token and user data
    return TokenResponse(
        access_token=access_token,
        user=UserResponse.model_validate(user)
    )
