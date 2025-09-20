from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: str
    conversation_id: str = "test"
    user_id: str = "test"

class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    retrieved_context: list = []

@app.post("/chat/")
def chat_endpoint(request: ChatRequest):
    # Mock svar
    if "hi" in request.query.lower():
        response = "Hello! I'm your AI restaurant assistant. How can I help you today?"
    elif "menu" in request.query.lower():
        response = "Our menu features delicious Swedish cuisine including köttbullar, fish dishes, and vegetarian options!"
    else:
        response = f"Thanks for your message: '{request.query}'. I'm a demo AI assistant for our restaurant!"
    
    return ChatResponse(
        response=response,
        conversation_id=request.conversation_id
    )

@app.get("/health")
def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)