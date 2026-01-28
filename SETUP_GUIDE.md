# Getting Started with AI Fitness Chatbot

This guide will help you set up and run the AI Fitness Chatbot application locally.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download here](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

## Installation Steps

### 1. Clone or Navigate to the Project

```bash
cd "c:\Users\karan.patil\OneDrive - LRN, INC\Desktop\AI Chatbot"
```

### 2. Set Up the Database

First, create a PostgreSQL database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE fitness_chatbot;

# Exit psql
\q
```

### 3. Configure Backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your credentials:

```env
PORT=3001
NODE_ENV=development

# Your OpenAI API key
OPENAI_API_KEY=sk-your-actual-openai-api-key-here

# Database configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fitness_chatbot
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# JWT secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:3000
```

Run database migrations:

```bash
npm run migrate
```

### 4. Configure Frontend

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

The default configuration should work:

```env
REACT_APP_API_URL=http://localhost:3001
```

### 5. Start the Application

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 3001
📊 Environment: development
🔗 API: http://localhost:3001
✅ Database connected successfully
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

## Usage

### 1. Chat Interface
- Navigate to the Chat page (default landing page)
- Ask fitness-related questions like:
  - "Create a beginner workout plan for me"
  - "What exercises target the chest?"
  - "Give me nutrition tips for muscle gain"

### 2. Generate Workout Plans
- Go to the "Workout Plans" page
- Fill in your fitness profile:
  - Fitness level (beginner/intermediate/advanced)
  - Goals (e.g., "build muscle", "lose weight")
  - Days per week you can work out
  - Session duration
  - Available equipment
  - Any limitations or injuries
- Click "Generate Workout Plan"
- The AI will create a personalized workout plan

### 3. Browse Exercises
- Visit the "Exercises" page
- Browse the exercise library
- Use the search bar to find specific exercises
- View detailed information including:
  - Exercise category and difficulty
  - Target muscle groups
  - Required equipment
  - Step-by-step instructions

## Troubleshooting

### Backend won't start
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database migrations ran successfully: `npm run migrate`

### OpenAI API errors
- Verify your API key is correct
- Check you have credits available in your OpenAI account
- Ensure the API key has proper permissions

### Frontend can't connect to backend
- Ensure backend is running on port 3001
- Check CORS settings in backend `.env`
- Verify `REACT_APP_API_URL` in frontend `.env`

### Database connection errors
- Verify PostgreSQL service is running
- Check database name, username, and password
- Ensure database `fitness_chatbot` exists

## Testing the API

You can test the API endpoints using curl or Postman:

```bash
# Health check
curl http://localhost:3001/health

# Send a chat message
curl -X POST http://localhost:3001/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message": "What exercises help build chest muscles?"}'

# Get exercises
curl http://localhost:3001/api/exercises

# Search exercises
curl http://localhost:3001/api/exercises/search?q=push
```

## Next Steps

- Add user authentication for personalized experiences
- Implement progress tracking features
- Add more exercises to the database
- Create custom workout templates
- Integrate nutrition tracking
- Deploy to production

## Security Note

Remember to:
- Never commit `.env` files to version control
- Keep your OpenAI API key secure
- Use strong JWT secrets in production
- Enable HTTPS in production
- Run Snyk security scans before deployment

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation in the main README
3. Check backend logs for errors
4. Verify all environment variables are set correctly

Happy training! 💪🏋️‍♀️
