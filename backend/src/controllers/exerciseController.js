const db = require('../config/database');

class ExerciseController {
  /**
   * Parse muscle_groups from JSON string for SQLite
   */
  parseExercise(exercise) {
    if (exercise && exercise.muscle_groups) {
      try {
        exercise.muscle_groups = JSON.parse(exercise.muscle_groups);
      } catch (e) {
        exercise.muscle_groups = [];
      }
    }
    return exercise;
  }

  /**
   * Get all exercises with optional filtering
   */
  async getExercises(req, res, next) {
    try {
      const { category, difficulty, equipment } = req.query;
      
      let query = 'SELECT * FROM exercises WHERE 1=1';
      const params = [];
      let paramIndex = 1;

      if (category) {
        query += ` AND category = ?`;
        params.push(category);
      }

      if (difficulty) {
        query += ` AND difficulty = ?`;
        params.push(difficulty);
      }

      if (equipment) {
        query += ` AND equipment = ?`;
        params.push(equipment);
      }

      query += ' ORDER BY name ASC';

      const result = await db.query(query, params);
      
      // Parse JSON muscle_groups for each exercise
      const exercises = result.rows.map(ex => this.parseExercise(ex));

      res.status(200).json({
        exercises,
        count: exercises.length
      });
    } catch (error) {
      console.error('Get exercises error:', error);
      next(error);
    }
  }

  /**
   * Get a specific exercise by ID
   */
  async getExerciseById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await db.query(
        'SELECT * FROM exercises WHERE id = ?',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: { message: 'Exercise not found' }
        });
      }

      res.status(200).json(this.parseExercise(result.rows[0]));
    } catch (error) {
      console.error('Get exercise by ID error:', error);
      next(error);
    }
  }

  /**
   * Search exercises by name or description
   */
  async searchExercises(req, res, next) {
    try {
      const { q } = req.query;

      if (!q || q.trim().length === 0) {
        return res.status(400).json({
          error: { message: 'Search query is required' }
        });
      }

      const result = await db.query(
        `SELECT * FROM exercises 
         WHERE name LIKE ? OR description LIKE ? 
         ORDER BY name ASC 
         LIMIT 50`,
        [`%${q}%`, `%${q}%`]
      );

      const exercises = result.rows.map(ex => this.parseExercise(ex));

      res.status(200).json({
        exercises,
        count: exercises.length,
        query: q
      });
    } catch (error) {
      console.error('Search exercises error:', error);
      next(error);
    }
  }
}

module.exports = new ExerciseController();
