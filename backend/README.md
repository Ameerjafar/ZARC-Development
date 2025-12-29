# ZARC Backend - FastAPI Authentication API

A FastAPI backend with user authentication (signup/signin) using SQLAlchemy ORM, JWT tokens, and bcrypt password hashing.

## Features

- ✅ User signup with email and username validation
- ✅ User signin with JWT token generation
- ✅ Password hashing using bcrypt
- ✅ SQLAlchemy ORM for database operations
- ✅ Pydantic schemas for request/response validation
- ✅ CORS configuration for frontend integration
- ✅ Interactive API documentation (Swagger UI)

## Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── config.py               # Configuration management
├── database.py             # Database setup and session management
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables (create from .env.example)
├── .env.example           # Environment variables template
├── models/
│   └── user.py            # User SQLAlchemy model
├── schemas/
│   └── auth.py            # Pydantic request/response schemas
├── routes/
│   └── auth.py            # Authentication endpoints
└── utils/
    ├── auth.py            # JWT token utilities
    └── security.py        # Password hashing utilities
```

## Setup Instructions

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
```

### 2. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
copy .env.example .env
```

**Important:** Change the `SECRET_KEY` in production to a secure random string.

### 5. Run the Server

```bash
uvicorn main:app --reload
```

The server will start at `http://localhost:8000`

## API Endpoints

### 1. Signup

**POST** `/api/auth/signup`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe",
    "created_at": "2025-12-29T04:40:55.123456"
  }
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit

### 2. Signin

**POST** `/api/auth/signin`

Authenticate an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe",
    "created_at": "2025-12-29T04:40:55.123456"
  }
}
```

**Note:** You can use either email or username in the `email` field.

## Interactive API Documentation

Once the server is running, visit:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## Testing with cURL

### Signup
```bash
curl -X POST "http://localhost:8000/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"username\":\"testuser\",\"password\":\"SecurePass123\"}"
```

### Signin
```bash
curl -X POST "http://localhost:8000/api/auth/signin" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"SecurePass123\"}"
```

## Database

The application uses SQLite by default (`zarc.db`). The database file will be created automatically when you first run the server.

To use a different database (PostgreSQL, MySQL, etc.), update the `DATABASE_URL` in your `.env` file:

```env
# PostgreSQL example
DATABASE_URL=postgresql://user:password@localhost/dbname

# MySQL example
DATABASE_URL=mysql+pymysql://user:password@localhost/dbname
```

## Security Features

- **Password Hashing:** Bcrypt with automatic salt generation
- **JWT Tokens:** Secure token-based authentication with configurable expiration
- **Input Validation:** Pydantic schemas validate all inputs
- **CORS Protection:** Configurable allowed origins
- **SQL Injection Protection:** SQLAlchemy ORM prevents SQL injection

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | JWT secret key (change in production!) | - |
| `ALGORITHM` | JWT algorithm | HS256 |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time | 60 |
| `DATABASE_URL` | Database connection string | sqlite:///./zarc.db |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## Technologies Used

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL ORM toolkit
- **Pydantic** - Data validation using Python type annotations
- **python-jose** - JWT token creation and verification
- **passlib** - Password hashing library
- **bcrypt** - Secure password hashing algorithm
- **Uvicorn** - ASGI server

## Next Steps

To integrate with your frontend:

1. Use the JWT token in the `Authorization` header:
   ```
   Authorization: Bearer <access_token>
   ```

2. Create protected routes by adding authentication middleware

3. Implement token refresh mechanism for better UX

4. Add email verification for new signups

5. Implement password reset functionality
