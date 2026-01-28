const openaiService = require('../services/openaiService');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class WorkoutController {
  /**
   * Generate a personalized workout plan
   */
  async generatePlan(req, res, next) {
    try {
      const userProfile = req.body;
      const userId = req.user?.id || 'anonymous';

      // Validate required fields
      const requiredFields = ['fitnessLevel', 'goals', 'daysPerWeek'];
      const missingFields = requiredFields.filter(field => !userProfile[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: { 
            message: 'Missing required fields', 
            fields: missingFields 
          }
        });
      }

      // Generate workout plan using AI
      const workoutPlan = await openaiService.generateWorkoutPlan(userProfile);

      // Save workout plan to database
      const planId = uuidv4();
      await db.query(
        `INSERT INTO workout_plans 
         (id, user_id, fitness_level, goals, plan_content, created_at) 
         VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [planId, userId, userProfile.fitnessLevel, userProfile.goals, workoutPlan]
      );

      res.status(201).json({
        id: planId,
        plan: workoutPlan,
        userProfile,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Generate workout plan error:', error);
      next(error);
    }
  }

  /**
   * Get user's workout plans
   */
  async getUserPlans(req, res, next) {
    try {
      const userId = req.user?.id || 'anonymous';

      const result = await db.query(
        `SELECT id, fitness_level, goals, plan_content, created_at 
         FROM workout_plans 
         WHERE user_id = ? 
         ORDER BY created_at DESC 
         LIMIT 10`,
        [userId]
      );

      res.status(200).json({
        plans: result.rows,
        count: result.rows.length
      });
    } catch (error) {
      console.error('Get user plans error:', error);
      next(error);
    }
  }

  /**
   * Get a specific workout plan
   */
  async getPlanById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || 'anonymous';

      const result = await db.query(
        'SELECT * FROM workout_plans WHERE id = ? AND user_id = ?',
        [id, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: { message: 'Workout plan not found' }
        });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Get plan by ID error:', error);
      next(error);
    }
  }
}

module.exports = new WorkoutController();
