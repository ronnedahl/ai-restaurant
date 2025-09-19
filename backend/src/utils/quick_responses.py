"""Quick response handler for simple queries to avoid unnecessary LLM calls."""

import re
from typing import Optional, Dict, Any
import structlog

logger = structlog.get_logger()

# Simple greeting patterns
GREETING_PATTERNS = [
    r'^(hej|hello|hi|hallå|tjena|tja|yo)\.?!?$',
    r'^(hej|hello|hi)\s+(där|peter|du)\.?!?$',
    r'^(god\s+morgon|godmorgon|gm)\.?!?$',
    r'^(god\s+kväll|godkväll|gk)\.?!?$',
    r'^(god\s+dag|goddag)\.?!?$',
    r'^(bra\s+dag|ha\s+en\s+bra\s+dag)\.?!?$'
]

QUICK_PATTERNS = {
    r'^(vad\s+heter\s+du|what.+name)': {
        'sv': "Hej! Jag är AI-assistenten på Foodie restaurang. Vad kan jag hjälpa dig med idag?",
        'en': "Hi! I'm the AI assistant at Foodie restaurant. How can I help you today?"
    },
    r'^(hur\s+mår\s+du|how\s+are\s+you)': {
        'sv': "Tack för att du frågar! Jag mår bra och är redo att hjälpa dig med vår meny. Vad är du nyfiken på?",
        'en': "Thanks for asking! I'm doing well and ready to help you with our menu. What are you curious about?"
    },
    r'^(vem\s+är\s+du|who\s+are\s+you)': {
        'sv': "Jag är AI-assistenten på Foodie, en svensk restaurang. Jag kan hjälpa dig med menyn, allergener och beställningar. Vad behöver du hjälp med?",
        'en': "I'm the AI assistant at Foodie, a Swedish restaurant. I can help you with our menu, allergens, and orders. What do you need help with?"
    },
    r'^(öppettider|opening\s+hours|when\s+open)': {
        'sv': "Vi är öppna måndag-fredag 11:00-22:00 och helger 12:00-23:00. Vill du veta något mer om restaurangen?",
        'en': "We're open Monday-Friday 11:00-22:00 and weekends 12:00-23:00. Would you like to know more about the restaurant?"
    },
    r'^(var\s+ligger|where\s+located|location)': {
        'sv': "Du hittar oss på Storgatan 123, Stockholm. Vi har även hemleverans! Vill du se vår meny?",
        'en': "You can find us at Storgatan 123, Stockholm. We also offer home delivery! Would you like to see our menu?"
    }
}

# Standard greeting responses
GREETING_RESPONSES = {
    'sv': [
        "Hej där! Välkommen till Foodie! Jag är er AI-assistent. Vad kan jag hjälpa dig med idag?",
        "Hallå! Trevligt att träffas! Jag kan hjälpa dig med vår meny, allergener och beställningar. Vad är du nyfiken på?",
        "Hej! Välkommen till Foodie restaurang! Jag är här för att hjälpa dig. Vad kan jag visa dig?"
    ],
    'en': [
        "Hello there! Welcome to Foodie! I'm your AI assistant. How can I help you today?",
        "Hi! Nice to meet you! I can help you with our menu, allergens, and orders. What are you curious about?",
        "Hello! Welcome to Foodie restaurant! I'm here to help you. What can I show you?"
    ]
}

def detect_language(text: str) -> str:
    """Detect if text is Swedish or English."""
    swedish_words = ['är', 'och', 'det', 'en', 'du', 'jag', 'vad', 'hur', 'vem', 'hej', 'där']
    english_words = ['are', 'and', 'the', 'you', 'what', 'how', 'who', 'hello', 'hi']
    
    text_lower = text.lower()
    swedish_count = sum(1 for word in swedish_words if word in text_lower)
    english_count = sum(1 for word in english_words if word in text_lower)
    
    return 'sv' if swedish_count > english_count else 'en'

def get_quick_response(query: str) -> Optional[str]:
    """
    Check if query can be answered quickly without LLM calls.
    
    Args:
        query: User query
        
    Returns:
        Quick response if applicable, None otherwise
    """
    query_clean = query.lower().strip()
    language = detect_language(query)
    
    logger.info("checking_quick_response", query=query[:50], language=language)
    
    for pattern in GREETING_PATTERNS:
        if re.match(pattern, query_clean, re.IGNORECASE):
            import random
            response = random.choice(GREETING_RESPONSES[language])
            logger.info("quick_greeting_response", pattern=pattern, language=language)
            return response
    
    for pattern, responses in QUICK_PATTERNS.items():
        if re.search(pattern, query_clean, re.IGNORECASE):
            logger.info("quick_pattern_response", pattern=pattern, language=language)
            return responses.get(language, responses['en'])
    
    return None

def should_use_quick_response(query: str) -> bool:
    """
    Determine if query should use quick response path.
    
    Args:
        query: User query
        
    Returns:
        True if quick response should be used
    """
    return get_quick_response(query) is not None