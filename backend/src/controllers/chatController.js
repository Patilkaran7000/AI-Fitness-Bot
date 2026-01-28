const openaiService = require('../services/openaiService');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class ChatController {
  /**
   * Handle incoming chat message
   */
  async sendMessage(req, res, next) {
    try {
      const { message, conversationId } = req.body;
      const userId = req.user?.id || 'anonymous';

      if (!message || message.trim().length === 0) {
        return res.status(400).json({ 
          error: { message: 'Message cannot be empty' } 
        });
      }

      // Get conversation history for context
      const history = await ChatController.getConversationHistory(conversationId, userId);

      // Prepare messages for OpenAI
      const messages = [
        ...history.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: message }
      ];

      // Generate AI response
      const aiResponse = await openaiService.generateChatResponse(messages);

      // Save user message and AI response to database
      const newConversationId = conversationId || await ChatController.createConversation(userId);
      
      await ChatController.saveMessage(newConversationId, userId, 'user', message);
      await ChatController.saveMessage(newConversationId, userId, 'assistant', aiResponse);

      res.status(200).json({
        conversationId: newConversationId,
        message: aiResponse,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Chat error:', error);
      next(error);
    }
  }

  /**
   * Get conversation history
   */
  async getHistory(req, res, next) {
    try {
      const { conversationId } = req.params;
      const userId = req.user?.id || 'anonymous';

      const history = await ChatController.getConversationHistory(conversationId, userId);

      res.status(200).json({
        conversationId,
        messages: history,
        count: history.length
      });
    } catch (error) {
      console.error('History retrieval error:', error);
      next(error);
    }
  }

  /**
   * Clear conversation history
   */
  async clearHistory(req, res, next) {
    try {
      const { conversationId } = req.params;
      const userId = req.user?.id || 'anonymous';

      await db.query(
        'DELETE FROM messages WHERE conversation_id = ? AND user_id = ?',
        [conversationId, userId]
      );

      res.status(200).json({
        message: 'Conversation history cleared successfully'
      });
    } catch (error) {
      console.error('Clear history error:', error);
      next(error);
    }
  }

  /**
   * Helper: Get conversation history from database
   */
  static async getConversationHistory(conversationId, userId) {
    if (!conversationId) return [];

    try {
      const result = await db.query(
        `SELECT role, content, created_at 
         FROM messages 
         WHERE conversation_id = ? AND user_id = ? 
         ORDER BY created_at ASC 
         LIMIT 20`,
        [conversationId, userId]
      );

      return result.rows;
    } catch (error) {
      console.error('Database error fetching history:', error);
      return [];
    }
  }

  /**
   * Helper: Create new conversation
   */
  static async createConversation(userId) {
    const conversationId = uuidv4();
    await db.query(
      'INSERT INTO conversations (id, user_id, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)',
      [conversationId, userId]
    );
    return conversationId;
  }

  /**
   * Helper: Save message to database
   */
  static async saveMessage(conversationId, userId, role, content) {
    await db.query(
      'INSERT INTO messages (id, conversation_id, user_id, role, content, created_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
      [uuidv4(), conversationId, userId, role, content]
    );
  }
}

module.exports = new ChatController();
