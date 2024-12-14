from datetime import datetime, timedelta
from typing import Any, Union

import jwt
from passlib.context import CryptContext
from app.schemas.users import TokenData
from app.config import settings

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    return password_context.verify(password, hashed_pass)


def create_token(key: str, subject: Union[TokenData, Any], expires_delta):
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    to_encode = {"exp": expire, "sub": subject}
    encoded_jwt = jwt.encode(to_encode, key, settings.auth.ALGORITHM)
    return encoded_jwt


def create_access_token(
    subject: Union[TokenData, Any],
    expires_delta: int = settings.auth.access_token_expire_minutes,
) -> str:
    return create_token(settings.auth.JWT_SECRET_KEY, subject.dict(), expires_delta)


def create_refresh_token(
    subject: Union[TokenData, Any],
    expires_delta: int = settings.auth.refresh_token_expire_minutes,
) -> str:
    return create_token(settings.auth.JWT_REFRESH_SECRET_KEY, subject.dict(), expires_delta)
