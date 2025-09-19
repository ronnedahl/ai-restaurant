/**
 * Chat API service for communicating with the restaurant AI backend
 */

export interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
}

export interface ChatRequest {
  query: string;
  conversation_id?: string;
  user_id?: string;
  additional_context?: Record<string, any>;
}

export interface ChatResponse {
  response: string;
  conversation_id: string;
  retrieved_context?: Array<{
    id: string;
    text: string;
    similarity: number;
  }>;
}

export interface ApiError {
  detail: string;
  status_code?: number;
}

class ChatApiService {
  private baseUrl: string;
  private apiKey?: string;

  constructor() {
    // In development, the backend will run on a different port (e.g., 8000)
    // In production, this would be the deployed backend URL
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    this.apiKey = import.meta.env.VITE_API_KEY;
  }

  /**
   * Send a chat message to the AI assistant
   */
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Add API key if available
      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(`${this.baseUrl}/chat/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          detail: `HTTP ${response.status}: ${response.statusText}`,
          status_code: response.status,
        }));
        
        throw new Error(errorData.detail || 'Failed to send message');
      }

      const data: ChatResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Chat API error:', error);
      throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
  }

  /**
   * Check if the backend is available
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const chatApi = new ChatApiService();
export default chatApi;