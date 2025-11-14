from fastapi import APIRouter, HTTPException
from jose import jwt
import os

router = APIRouter(prefix="/api/auth", tags=["auth"]) 

SECRET = os.getenv("SECRET_KEY","devsecret")
ALGO = os.getenv("ALGORITHM","HS256")

# Minimal email/password demo; replace with proper DB user store & bcrypt in production
DEMO_EMAIL = "demo@example.com"
DEMO_PASSWORD = "demo123"

@router.post("/login")
async def login(form: dict):
    email = form.get("email"); password = form.get("password")
    if not email or not password:
        raise HTTPException(status_code=400, detail="email and password required")
    if not (email == DEMO_EMAIL and password == DEMO_PASSWORD):
        raise HTTPException(status_code=401, detail="invalid credentials")
    token = jwt.encode({"sub": email}, SECRET, algorithm=ALGO)
    return {"access_token": token, "token_type": "bearer"}
