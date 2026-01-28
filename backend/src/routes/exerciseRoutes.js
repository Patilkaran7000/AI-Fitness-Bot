const express = require('express');
const { query, param } = require('express-validator');
const exerciseController = require('../controllers/exerciseController');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

/**
 * GET /api/exercises
 * Get all exercises with optional filtering
 */
router.get('/',
  [
    query('category').optional().isIn(['strength', 'cardio', 'flexibility', 'balance']),
    query('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']),
    query('equipment').optional().isString()
  ],
  validateRequest,
  exerciseController.getExercises.bind(exerciseController)
);

/**
 * GET /api/exercises/search
 * Search exercises
 */
router.get('/search',
  [
    query('q').notEmpty().withMessage('Search query is required')
  ],
  validateRequest,
  exerciseController.searchExercises.bind(exerciseController)
);

/**
 * GET /api/exercises/:id
 * Get a specific exercise
 */
router.get('/:id',
  [
    param('id').isUUID().withMessage('Invalid exercise ID')
  ],
  validateRequest,
  exerciseController.getExerciseById.bind(exerciseController)
);

module.exports = router;
