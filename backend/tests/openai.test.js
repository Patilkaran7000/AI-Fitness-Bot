const openaiService = require('../src/services/openaiService');

// Mock OpenAI to avoid actual API calls during tests
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => {
    return {
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: 'This is a test response from the AI fitness coach.'
                }
              }
            ]
          })
        }
      }
    };
  });
});

describe('OpenAI Service', () => {
  test('generateChatResponse should return AI response', async () => {
    const messages = [
      { role: 'user', content: 'What exercises build chest muscles?' }
    ];

    const response = await openaiService.generateChatResponse(messages);

    expect(response).toBeDefined();
    expect(typeof response).toBe('string');
  });

  test('generateWorkoutPlan should create workout plan', async () => {
    const userProfile = {
      fitnessLevel: 'beginner',
      goals: 'build muscle',
      daysPerWeek: 3,
      sessionDuration: 60,
      equipment: 'dumbbells'
    };

    const plan = await openaiService.generateWorkoutPlan(userProfile);

    expect(plan).toBeDefined();
    expect(typeof plan).toBe('string');
  });
});
