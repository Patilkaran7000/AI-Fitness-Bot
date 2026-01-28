const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validation');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('name').trim().notEmpty().withMessage('Name is required')
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const { email, password, name } = req.body;

      // Check if user already exists
      const existingUser = await db.query(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(409).json({
          error: { message: 'Email already registered' }
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const userId = uuidv4();
      await db.query(
        'INSERT INTO users (id, email, password, name, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
        [userId, email, hashedPassword, name]
      );

      const user = { id: userId, email, name };

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      next(error);
    }
  }
);

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Find user
      const result = await db.query(
        'SELECT id, email, name, password FROM users WHERE email = ?',
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({
          error: { message: 'Invalid credentials' }
        });
      }

      const user = result.rows[0];

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({
          error: { message: 'Invalid credentials' }
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      next(error);
    }
  }
);

module.exports = router;
