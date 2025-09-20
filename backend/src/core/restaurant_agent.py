"""Restaurant AI Agent for menu inquiries and order assistance."""

import json
from typing import Dict, Any, List, Optional
import structlog
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from src.services.menu_service import MenuService
from src.services.order_service import OrderService
from src.config import settings

logger = structlog.get_logger()

RESTAURANT_SYSTEM_PROMPT = """
You are the AI assistant for {restaurant_name}, a Swedish restaurant. 
Your role is to help customers with:

1. Menu Information:
   - Describe dishes and ingredients
   - Provide allergen information
   - Make recommendations based on preferences
   - Explain prices and special offers

2. Order Assistance:
   - Help add items to cart
   - Answer questions about delivery
   - Check order status
   - Handle special requests

3. General Support:
   - Restaurant hours
   - Location information
   - Contact details
   - Escalate to human support when needed

Current Menu Data:
{menu_context}

Guidelines:
- Be friendly, helpful, and professional
- Provide accurate information about dishes
- Clearly state allergens when relevant
- If unsure, offer to connect with human staff
- Use Swedish dish names but explain in English
"""


class RestaurantAgent:
    """AI agent specialized for restaurant interactions."""
    
    def __init__(self, model_name: str = None):
        """Initialize the restaurant agent."""
        self.llm = ChatOpenAI(
            api_key=settings.openai_api_key,
            model=model_name or settings.model_name,
            temperature=0.7,
            max_tokens=500
        )
        self.menu_service = MenuService()
        self.order_service = OrderService()
        
        # Create the prompt template
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", RESTAURANT_SYSTEM_PROMPT),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{query}")
        ])
        
        # Create the chain
        self.chain = self.prompt | self.llm
        
    async def get_menu_context(self) -> str:
        """Fetch and format current menu data."""
        try:
            menu_data = await self.menu_service.get_all_menu_items()
            
            # Format menu items for context
            menu_text = []
            for category, items in menu_data.items():
                menu_text.append(f"\n{category}:")
                for item in items:
                    allergens = ", ".join(item.get("allergens", [])) or "None"
                    menu_text.append(
                        f"- {item['name']} ({item['priceSek']} SEK)"
                        f"\n  Description: {item['description']}"
                        f"\n  Allergens: {allergens}"
                        f"\n  Tags: {', '.join(item.get('tags', []))}"
                    )
            
            return "\n".join(menu_text)
        except Exception as e:
            logger.error("failed_to_get_menu_context", error=str(e))
            return "Menu data temporarily unavailable"
    
    def _detect_intent(self, query: str) -> Dict[str, Any]:
        """Detect user intent from the query."""
        query_lower = query.lower()
        
        intents = {
            "menu_inquiry": any(word in query_lower for word in 
                ["menu", "dish", "food", "eat", "hungry", "recommend"]),
            "allergen_check": any(word in query_lower for word in 
                ["allerg", "gluten", "dairy", "nut", "vegan", "vegetarian"]),
            "price_inquiry": any(word in query_lower for word in 
                ["price", "cost", "expensive", "cheap", "afford"]),
            "add_to_cart": any(phrase in query_lower for phrase in 
                ["add to cart", "order", "want", "i'll have", "give me"]),
            "order_status": any(phrase in query_lower for phrase in 
                ["order status", "where is", "delivery", "when will"]),
            "human_support": any(phrase in query_lower for phrase in 
                ["human", "person", "staff", "manager", "help"])
        }
        
        detected_intents = [k for k, v in intents.items() if v]
        return {
            "intents": detected_intents,
            "primary_intent": detected_intents[0] if detected_intents else "general"
        }
    
    def _format_chat_history(self, conversation_history: List[Dict]) -> List:
        """Format conversation history for the prompt."""
        messages = []
        for msg in conversation_history[-5:]:  # Keep last 5 messages for context
            if msg["role"] == "user":
                messages.append(HumanMessage(content=msg["content"]))
            else:
                messages.append(AIMessage(content=msg["content"]))
        return messages
    
    async def process_query(
        self,
        query: str,
        conversation_id: str,
        conversation_history: Optional[List[Dict]] = None
    ) -> Dict[str, Any]:
        """Process a user query and generate response."""
        try:
            # Detect intent
            intent_data = self._detect_intent(query)
            logger.info("intent_detected", intents=intent_data["intents"])
            
            # Get menu context
            menu_context = await self.get_menu_context()
            
            # Format chat history
            chat_history = self._format_chat_history(conversation_history or [])
            
            # Generate response
            response = await self.chain.ainvoke({
                "restaurant_name": "Foodie",
                "menu_context": menu_context,
                "chat_history": chat_history,
                "query": query
            })
            
            # Extract tool calls if any (for adding to cart, etc.)
            tool_calls = self._extract_tool_calls(response.content, intent_data)
            
            return {
                "response": response.content,
                "intent": intent_data["primary_intent"],
                "tool_calls": tool_calls,
                "conversation_id": conversation_id
            }
            
        except Exception as e:
            logger.error("agent_processing_error", error=str(e))
            return {
                "response": "I apologize, but I'm having trouble processing your request. Please try again or ask for human assistance.",
                "intent": "error",
                "tool_calls": [],
                "conversation_id": conversation_id,
                "error": str(e)
            }
    
    def _extract_tool_calls(self, response: str, intent_data: Dict) -> List[Dict]:
        """Extract any tool calls from the response."""
        tool_calls = []
        
        # Check for add to cart intent
        if "add_to_cart" in intent_data["intents"]:
            # TODO: Parse response for specific items and quantities
            # This would need more sophisticated parsing
            pass
        
        # Check for human support request
        if "human_support" in intent_data["intents"]:
            tool_calls.append({
                "tool": "escalate_to_human",
                "parameters": {}
            })
        
        return tool_calls


async def run_restaurant_agent(
    query: str,
    conversation_id: str = "default",
    user_id: str = "anonymous",
    conversation_history: Optional[List[Dict]] = None,
    **kwargs
) -> Dict[str, Any]:
    """Run the restaurant agent with the given query."""
    agent = RestaurantAgent()
    result = await agent.process_query(query, conversation_id, conversation_history)
    
    # Add user context
    result["user_id"] = user_id
    
    return result