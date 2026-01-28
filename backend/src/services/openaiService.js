const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.perplexity.ai',
});

// System prompt for fitness chatbot
const SYSTEM_PROMPT = `You are an expert AI fitness coach and nutritionist assistant. Your role is to:

1. Provide personalized workout recommendations based on user's fitness level, goals, and available equipment
2. Offer nutrition and diet advice aligned with their fitness objectives
3. Suggest proper exercise form and technique
4. Create custom workout plans (strength, cardio, flexibility, etc.)
5. Help track progress and adjust plans accordingly
6. Answer questions about fitness, health, and wellness
7. Motivate and encourage users on their fitness journey

Always:
- Be supportive, motivating, and professional
- Ask clarifying questions to better understand user needs
- Provide safe, evidence-based advice
- Warn users to consult medical professionals for medical concerns
- Adapt recommendations to different fitness levels (beginner, intermediate, advanced)
- Consider any limitations or injuries mentioned

**FORMATTING REQUIREMENTS - STRICTLY FOLLOW:**
- Use **bold text** for important terms, exercise names, and section headings
- Structure your responses with clear headings and bullet points
- When providing workout plans, nutrition info, or structured data, use markdown tables with the following format:
  | Column 1 | Column 2 | Column 3 |
  |----------|----------|----------|
  | Data 1   | Data 2   | Data 3   |
- Use numbered lists for sequential steps or programs
- Use bullet points for options or features
- Always provide COMPLETE responses - never end mid-sentence or mid-table
- Ensure all tables have proper headers and are fully formatted
- Use line breaks for better readability

Example formatting:
**Workout Plan for Beginners**

| Exercise | Sets | Reps | Rest |
|----------|------|------|------|
| Push-ups | 3 | 10-12 | 60s |
| Squats | 3 | 15 | 60s |

**Important Notes:**
- Focus on proper form
- Stay hydrated

Remember: Safety first. If a user mentions pain, injury, or medical conditions, advise them to consult a healthcare professional.`;

class OpenAIService {
  /**
   * Generate a chat response from OpenAI
   * @param {Array} messages - Array of message objects with role and content
   * @param {Object} options - Additional options like temperature, max_tokens
   * @returns {Promise<string>} - AI response
   */
  async generateChatResponse(messages, options = {}) {
    try {
      const completion = await openai.chat.completions.create({
        model: options.model || 'sonar',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 2500,
        top_p: options.top_p || 1,
        frequency_penalty: options.frequency_penalty || 0,
        presence_penalty: options.presence_penalty || 0,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error.message);
      console.error('Error details:', error.response?.data || error);
      throw new Error(`Failed to generate AI response: ${error.message}`);
    }
  }

  /**
   * Generate a streaming chat response
   * @param {Array} messages - Array of message objects
   * @param {Object} options - Additional options
   * @returns {Promise<Stream>} - Streaming response
   */
  async generateStreamingResponse(messages, options = {}) {
    try {
      const stream = await openai.chat.completions.create({
        model: options.model || 'sonar',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 2500,
        stream: true,
      });

      return stream;
    } catch (error) {
      console.error('OpenAI Streaming Error:', error);
      throw new Error('Failed to generate streaming response');
    }
  }

  /**
   * Generate workout plan based on user requirements
   * @param {Object} userProfile - User's fitness profile
   * @returns {Promise<string>} - Structured workout plan
   */
  async generateWorkoutPlan(userProfile) {
    const prompt = `Create a personalized workout plan for a user with the following profile:
    
- Fitness Level: ${userProfile.fitnessLevel}
- Goals: ${userProfile.goals}
- Available Equipment: ${userProfile.equipment}
- Days per week: ${userProfile.daysPerWeek}
- Duration per session: ${userProfile.sessionDuration} minutes
- Any limitations: ${userProfile.limitations || 'None'}

Provide a structured weekly workout plan with exercises, sets, reps, and rest periods. Format it clearly.`;

    const messages = [
      { role: 'user', content: prompt }
    ];

    return await this.generateChatResponse(messages, { temperature: 0.8 });
  }

  /**
   * Generate nutrition recommendations
   * @param {Object} userProfile - User's profile including dietary preferences
   * @returns {Promise<string>} - Nutrition advice
   */
  async generateNutritionPlan(userProfile) {
    const prompt = `Provide nutrition recommendations for a user with:
    
- Goal: ${userProfile.goal}
- Dietary Preferences: ${userProfile.dietaryPreferences}
- Allergies/Restrictions: ${userProfile.restrictions || 'None'}
- Activity Level: ${userProfile.activityLevel}
- Current Weight: ${userProfile.weight}
- Target Weight: ${userProfile.targetWeight}

Include macro recommendations, meal timing, and general nutrition tips.`;

    const messages = [
      { role: 'user', content: prompt }
    ];

    return await this.generateChatResponse(messages, { temperature: 0.7 });
  }
}

module.exports = new OpenAIService();
