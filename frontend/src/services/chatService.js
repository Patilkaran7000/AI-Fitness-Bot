import api from './api';

class ChatService {
  /**
   * Send a message to the chatbot
   */
  async sendMessage(message, conversationId = null) {
    try {
      const response = await api.post('/api/chat/message', {
        message,
        conversationId,
      });
      return response.data;
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  }

  /**
   * Get conversation history
   */
  async getHistory(conversationId) {
    try {
      const response = await api.get(`/api/chat/history/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Get history error:', error);
      throw error;
    }
  }

  /**
   * Clear conversation history
   */
  async clearHistory(conversationId) {
    try {
      const response = await api.delete(`/api/chat/history/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Clear history error:', error);
      throw error;
    }
  }
}

const chatService = new ChatService();
export default chatService;
