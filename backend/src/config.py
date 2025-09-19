"""Configuration settings for the restaurant AI assistant."""

import os
import json
from typing import Dict, Any, List
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # API Configuration
    api_host: str = Field(default="0.0.0.0", env="API_HOST")
    api_port: int = Field(default=8000, env="API_PORT")
    api_env: str = Field(default="development", env="API_ENV")
    
    # OpenAI Configuration
    openai_api_key: str = Field(..., env="OPENAI_API_KEY")
    model_name: str = Field(default="gpt-4-turbo-preview", env="MODEL_NAME")
    
    # Firebase Configuration
    firebase_project_id: str = Field(..., env="FIREBASE_PROJECT_ID")
    firebase_private_key: str = Field(..., env="FIREBASE_PRIVATE_KEY")
    firebase_client_email: str = Field(..., env="FIREBASE_CLIENT_EMAIL")
    
    # Restaurant Configuration
    restaurant_name: str = Field(default="Foodie", env="RESTAURANT_NAME")
    restaurant_description: str = Field(
        default="AI-powered restaurant with Swedish cuisine",
        env="RESTAURANT_DESCRIPTION"
    )
    menu_collection: str = Field(default="menu", env="MENU_COLLECTION")
    orders_collection: str = Field(default="orders", env="ORDERS_COLLECTION")
    
    # Security
    api_key: str = Field(..., env="API_KEY")
    api_keys: List[str] = Field(default_factory=list)
    rate_limit: int = Field(default=100, env="RATE_LIMIT")
    
    # Logging
    log_level: str = Field(default="INFO", env="LOG_LEVEL")
    
    # AI Model Settings
    llm_timeout: int = Field(default=30, env="LLM_TIMEOUT")
    request_timeout: int = Field(default=60, env="REQUEST_TIMEOUT")
    
    # Vector Store Settings
    embedding_model: str = Field(default="text-embedding-ada-002", env="EMBEDDING_MODEL")
    vector_dimension: int = Field(default=1536, env="VECTOR_DIMENSION")
    max_search_results: int = Field(default=5, env="MAX_SEARCH_RESULTS")
    similarity_threshold: float = Field(default=0.7, env="SIMILARITY_THRESHOLD")
    firebase_collection_name: str = Field(default="knowledge_base", env="FIREBASE_COLLECTION_NAME")
    
    # Environment flags
    @property
    def is_development(self) -> bool:
        """Check if running in development mode."""
        return self.api_env.lower() == "development"
    
    @property
    def is_production(self) -> bool:
        """Check if running in production mode."""
        return self.api_env.lower() == "production"
    
    def get_firebase_credentials(self) -> Dict[str, Any]:
        """Get Firebase credentials as dictionary."""
        return {
            "type": "service_account",
            "project_id": self.firebase_project_id,
            "private_key": self.firebase_private_key.replace("\\n", "\n"),
            "client_email": self.firebase_client_email,
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs"
        }
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Parse API keys from environment
        if self.api_key:
            self.api_keys = [self.api_key]
        
        # Add any additional API keys from comma-separated list
        additional_keys = os.getenv("API_KEYS", "")
        if additional_keys:
            self.api_keys.extend([key.strip() for key in additional_keys.split(",") if key.strip()])
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


# Global settings instance
settings = Settings()