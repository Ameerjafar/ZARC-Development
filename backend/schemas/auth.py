from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import datetime
from typing import Optional
import re

class SignUpRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=72)

    fullName: str = Field(..., min_length=3, max_length=100)
    
    # Kept username because your frontend generates it and you have a validator for it
    username: str = Field(..., min_length=3, max_length=50)
    
    company: str = Field(..., min_length=3, max_length=100)
    industry: Optional[str] = None
    
    @field_validator('username')
    @classmethod
    def validate_username(cls, v):
        if not re.match(r'^[a-zA-Z0-9_-]+$', v):
            raise ValueError('Username can only contain letters, numbers, underscores, and hyphens')
        return v
    
    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search(r'[a-z]', v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search(r'[0-9]', v):
            raise ValueError('Password must contain at least one digit')
        return v

class SignInRequest(BaseModel):
    """Request schema for user signin"""
    email: str  
    password: str

class UserResponse(BaseModel):
    """Response schema for user data"""
    id: int
    email: str
    username: str
    fullName: str # Matching the request schema
    company: str
    industry: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    """Response schema for authentication token"""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
