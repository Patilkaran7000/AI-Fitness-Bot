import api from './api';

class WorkoutService {
  /**
   * Generate a workout plan
   */
  async generatePlan(userProfile) {
    try {
      const response = await api.post('/api/workouts/generate', userProfile);
      return response.data;
    } catch (error) {
      console.error('Generate plan error:', error);
      throw error;
    }
  }

  /**
   * Get user's workout plans
   */
  async getUserPlans() {
    try {
      const response = await api.get('/api/workouts');
      return response.data;
    } catch (error) {
      console.error('Get plans error:', error);
      throw error;
    }
  }

  /**
   * Get a specific workout plan
   */
  async getPlanById(id) {
    try {
      const response = await api.get(`/api/workouts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get plan error:', error);
      throw error;
    }
  }
}

const workoutService = new WorkoutService();
export default workoutService;
