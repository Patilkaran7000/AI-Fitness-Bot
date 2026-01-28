const express = require('express');
const { body, param } = require('express-validator');
const workoutController = require('../controllers/workoutController');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

/**
 * POST /api/workouts/generate
 * Generate a personalized workout plan
 */
router.post('/generate',
  [
    body('fitnessLevel')
      .notEmpty()
      .isIn(['beginner', 'intermediate', 'advanced'])
      .withMessage('Valid fitness level required'),
    body('goals')
      .notEmpty()
      .withMessage('Goals are required'),
    body('daysPerWeek')
      .isInt({ min: 1, max: 7 })
      .withMessage('Days per week must be between 1 and 7'),
    body('sessionDuration')
      .optional()
      .isInt({ min: 15, max: 180 })
      .withMessage('Session duration must be between 15 and 180 minutes'),
    body('equipment')
      .optional()
      .isString(),
    body('limitations')
      .optional()
      .isString()
  ],
  validateRequest,
  workoutController.generatePlan.bind(workoutController)
);

/**
 * GET /api/workouts
 * Get user's workout plans
 */
router.get('/',
  workoutController.getUserPlans.bind(workoutController)
);

/**
 * GET /api/workouts/:id
 * Get a specific workout plan
 */
router.get('/:id',
  [
    param('id').isUUID().withMessage('Invalid workout plan ID')
  ],
  validateRequest,
  workoutController.getPlanById.bind(workoutController)
);

module.exports = router;
