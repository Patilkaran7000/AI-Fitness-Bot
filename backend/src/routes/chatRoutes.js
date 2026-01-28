const express = require('express');
const { body } = require('express-validator');
const chatController = require('../controllers/chatController');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

/**
 * POST /api/chat/message
 * Send a message to the chatbot
 */
router.post('/message',
  [
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ max: 2000 })
      .withMessage('Message too long (max 2000 characters)'),
    body('conversationId')
      .optional({ nullable: true, checkFalsy: true })
      .isUUID()
      .withMessage('Invalid conversation ID format')
  ],
  validateRequest,
  chatController.sendMessage.bind(chatController)
);

/**
 * GET /api/chat/history/:conversationId
 * Get conversation history
 */
router.get('/history/:conversationId',
  chatController.getHistory.bind(chatController)
);

/**
 * DELETE /api/chat/history/:conversationId
 * Clear conversation history
 */
router.delete('/history/:conversationId',
  chatController.clearHistory.bind(chatController)
);

module.exports = router;
