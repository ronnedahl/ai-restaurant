import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm your Foodie AI assistant. I can help you with menu information, recommendations, order status, and more. What can I do for you today?",
      timestamp: new Date()
    },
    {
      id: '2',
      role: 'assistant',
      content: "For example, you can ask me about today's specials, gluten-free options, or even ask for a recommendation under a certain price. I can also help you add items to your cart or check the status of your order.",
      timestamp: new Date()
    },
    {
      id: '3',
      role: 'assistant',
      content: "If you need to speak to a human, just let me know, and I'll connect you.",
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newUserMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: inputValue,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      setInputValue('');
      
      // TODO: Implement AI response logic
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I'm processing your request. This feature will be connected to the AI backend in the next sprint!",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-[600px] flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <X size={20} className="text-gray-600" />
          </button>
          
          {/* Brand */}
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-[#10B981]" />
            <span className="text-xl font-bold text-black">Foodie</span>
          </div>
          
          {/* Welcome text */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-1">
              How can I help you?
            </h2>
            <p className="text-sm text-gray-500">
              Ask me anything about our menu!
            </p>
          </div>
        </div>

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {message.role === 'assistant' ? (
                  <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-700">U</span>
                  </div>
                )}
              </div>
              
              {/* Message content */}
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">
                  {message.role === 'assistant' ? 'Foodie AI' : 'You'}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.role === 'assistant' 
                    ? 'bg-[#F3F4F6]' 
                    : 'bg-blue-100'
                }`}>
                  <p className="text-sm text-gray-800">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center bg-[#F3F4F6] rounded-full px-4 py-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 w-8 h-8 bg-[#10B981] hover:bg-[#0EA570] rounded-full flex items-center justify-center transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pb-3 text-center">
          <p className="text-xs text-gray-400">Powered by Foodie AI</p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;