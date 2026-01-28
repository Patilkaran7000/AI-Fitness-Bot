# 🏋️ AI Fitness Coach - Complete Application Guide

An intelligent AI-powered fitness coaching application featuring a modern, Apple-inspired design. Get personalized workout plans, nutrition guidance, and fitness support through natural conversations with an AI coach powered by Perplexity AI.

## 🎨 Design

This application features a **premium, Apple-inspired design** with:
- Frosted glass effects (glassmorphism)
- Smooth animations and transitions
- SF Pro Display typography
- Gradient accents and modern color palette
- Responsive mobile-first layout

📖 See [DESIGN_GUIDE.md](DESIGN_GUIDE.md) for complete design system documentation.

---

## 📱 Pages & Functionality

### 1. **Chat Page** (`/`)
**File**: `frontend/src/pages/ChatPage.js`

**Purpose**: Main interactive page for conversing with the AI fitness coach

**Features**:
- 💬 **Real-time Chat Interface** - Natural conversation with AI
- 🤖 **AI-Powered Responses** - Context-aware fitness advice using Perplexity AI
- 📝 **Markdown Rendering** - Rich text with tables, bold formatting, and structured content
- 💾 **Conversation History** - Automatic saving and retrieval of chat sessions
- 🗑️ **Clear History** - Delete conversation and start fresh
- ⚡ **Smart Suggestions** - Get workout recommendations, nutrition advice, form tips

**Components Used**:
- `ChatInterface` - Main chat UI component
- Hero section with large typography
- Feature cards highlighting benefits

**API Endpoints**:
- `POST /api/chat/message` - Send message and get AI response
- `GET /api/chat/history/:conversationId` - Retrieve conversation history
- `DELETE /api/chat/history/:conversationId` - Clear conversation

**Key Functionality**:
```javascript
// User can ask questions like:
- "Create a workout plan for building muscle"
- "What should I eat for breakfast?"
- "How do I perform a proper squat?"
- "Design a 30-minute HIIT routine"
```

---

### 2. **Workout Plans Page** (`/workout`)
**File**: `frontend/src/pages/WorkoutPage.js`

**Purpose**: Generate customized workout plans based on user preferences

**Features**:
- 📋 **Interactive Form** - Input your fitness details
- 🎯 **Personalization** - Tailored to fitness level, goals, and equipment
- 📅 **Flexible Scheduling** - Choose days per week (1-7)
- ⏱️ **Duration Control** - Set session length (15-180 minutes)
- 🏋️ **Equipment Options** - Plans adapt to available equipment
- 🩹 **Injury Awareness** - Accounts for limitations and injuries
- 📊 **Structured Output** - Plans displayed with tables and clear formatting

**Form Fields**:
1. **Fitness Level**: Beginner 🟢 | Intermediate 🟡 | Advanced 🔴
2. **Fitness Goals**: Build muscle, lose weight, improve endurance, etc.
3. **Days Per Week**: 1-7 training days
4. **Session Duration**: 15-180 minutes
5. **Available Equipment**: Dumbbells, resistance bands, gym, or none
6. **Limitations/Injuries**: Optional injury or limitation notes

**API Endpoint**:
- `POST /api/workouts/generate` - Generate personalized workout plan

**Generated Plan Includes**:
- Weekly schedule breakdown
- Exercise names and descriptions
- Sets, reps, and rest periods
- Progressive overload recommendations
- Form tips and safety notes

**Example Output**:
```markdown
**Monday - Upper Body**

| Exercise | Sets | Reps | Rest |
|----------|------|------|------|
| Push-ups | 3 | 10-12 | 60s |
| Dumbbell Rows | 3 | 10-12 | 60s |
```

---

### 3. **Exercise Library Page** (`/exercises`)
**File**: `frontend/src/pages/ExercisePage.js`

**Purpose**: Browse and search comprehensive exercise database

**Features**:
- 🔍 **Search Functionality** - Find exercises by name or description
- 📚 **Comprehensive Database** - Detailed exercise information
- 🏷️ **Category Filters** - Strength, cardio, flexibility, balance
- 📈 **Difficulty Levels** - Beginner, intermediate, advanced
- 🛠️ **Equipment Tags** - Filter by available equipment
- 💪 **Muscle Groups** - Target muscle visualization
- 📖 **Detailed Instructions** - Step-by-step exercise guidance
- 🎴 **Card Layout** - Modern grid display with hover effects

**Exercise Card Contains**:
- Exercise name
- Category badge (color-coded)
- Difficulty badge
- Equipment requirement
- Description
- Target muscle groups
- Detailed instructions

**API Endpoints**:
- `GET /api/exercises` - Get all exercises
- `GET /api/exercises/search?q=<query>` - Search exercises
- `GET /api/exercises/:id` - Get specific exercise details

**Search Examples**:
```
"push" → Push-ups, Push press, etc.
"leg" → Squats, Lunges, Leg press, etc.
"cardio" → Running, Jumping jacks, Burpees, etc.
```

---

## 🧩 Components

### **ChatInterface** (`frontend/src/components/ChatInterface.js`)

**Purpose**: Main chat UI component with message display and input

**Features**:
- Message bubbles with gradient backgrounds
- User and AI avatar icons
- Markdown rendering with tables
- Auto-scroll to new messages
- Typing indicator
- Error handling
- Empty state with welcome message

**State Management**:
- `messages[]` - Chat message history
- `inputMessage` - Current input text
- `conversationId` - Session identifier
- `loading` - AI response loading state
- `error` - Error message display

**Key Functions**:
- `handleSendMessage()` - Send user message
- `handleClearHistory()` - Delete conversation
- `handleKeyPress()` - Enter to send
- `scrollToBottom()` - Auto-scroll to latest

---

### **Navigation** (`frontend/src/components/Navigation.js`)

**Purpose**: Top navigation bar with frosted glass effect

**Features**:
- Sticky positioning
- Active page highlighting
- Smooth scroll effects
- Gradient logo
- Responsive menu
- CTA button

**Navigation Links**:
1. 💬 **Chat** → `/`
2. 🏋️ **Workouts** → `/workout`
3. 📚 **Exercises** → `/exercises`

---

## 🔧 Services

### **chatService.js** (`frontend/src/services/chatService.js`)

**Methods**:
```javascript
sendMessage(message, conversationId) // Send chat message
getHistory(conversationId)           // Retrieve conversation
clearHistory(conversationId)         // Delete conversation
```

---

### **workoutService.js** (`frontend/src/services/workoutService.js`)

**Methods**:
```javascript
generatePlan(userProfile) // Generate workout plan
// userProfile: { fitnessLevel, goals, daysPerWeek, sessionDuration, equipment, limitations }
```

---

### **api.js** (`frontend/src/services/api.js`)

**Purpose**: Axios instance with base configuration

**Features**:
- Base URL configuration
- Request/response interceptors
- Error handling
- Token management (if auth enabled)

---

## 🎯 Key Features

### ✨ **AI-Powered Conversations**
- Natural language understanding
- Context-aware responses
- Personalized recommendations
- Follow-up question support

### 📊 **Markdown Response Formatting**
- **Bold text** for emphasis
- Tables for structured data
- Bullet points and numbered lists
- Proper spacing and typography

### 🎨 **Modern UI/UX**
- Glassmorphism effects
- Smooth animations (0.3s cubic-bezier)
- Hover states and micro-interactions
- Responsive design (mobile-first)

### ♿ **Accessibility**
- Keyboard navigation
- Focus indicators
- Screen reader support
- Reduced motion support

---

## 🏗️ Tech Stack

### **Frontend**
- **Framework**: React 18
- **UI Library**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Markdown**: react-markdown + remark-gfm
- **Styling**: MUI styled components + CSS

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **AI Service**: Perplexity AI (OpenAI SDK compatible)
- **Database**: PostgreSQL / SQLite
- **Validation**: express-validator
- **Security**: Snyk code scanning

---

## 📁 Project Structure

```
AI Chatbot/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── ChatPage.js          # Main chat interface page
│   │   │   ├── WorkoutPage.js       # Workout plan generator page
│   │   │   └── ExercisePage.js      # Exercise library browser
│   │   ├── components/
│   │   │   ├── ChatInterface.js     # Chat UI component
│   │   │   └── Navigation.js        # Top navigation bar
│   │   ├── services/
│   │   │   ├── api.js               # Axios instance
│   │   │   ├── chatService.js       # Chat API methods
│   │   │   └── workoutService.js    # Workout API methods
│   │   ├── App.js                   # Main app component
│   │   ├── index.js                 # Entry point + theme
│   │   └── index.css                # Global styles
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── chatController.js    # Chat logic
│   │   │   ├── workoutController.js # Workout generation
│   │   │   └── exerciseController.js # Exercise CRUD
│   │   ├── services/
│   │   │   └── openaiService.js     # AI integration
│   │   ├── routes/
│   │   │   ├── chatRoutes.js        # Chat endpoints
│   │   │   ├── workoutRoutes.js     # Workout endpoints
│   │   │   └── exerciseRoutes.js    # Exercise endpoints
│   │   ├── middleware/
│   │   │   ├── auth.js              # Authentication
│   │   │   └── validation.js        # Request validation
│   │   ├── config/
│   │   │   └── database.js          # DB configuration
│   │   └── server.js                # Express server
│   └── package.json
├── DESIGN_GUIDE.md                  # Design system docs
├── README.md                        # This file
└── docker-compose.yml               # Docker setup
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- OpenAI API key

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in both backend and frontend
   - Add your OpenAI API key and database credentials

5. Run database migrations:
   ```bash
   cd backend
   npm run migrate
   ```

### Running the Application

**Backend:**
### **Prerequisites**
- Node.js 16+ and npm
- PostgreSQL or SQLite (database)
- Perplexity AI API key

### **Installation**

1. **Clone the repository**
```bash
git clone <repository-url>
cd "AI Chatbot"
```

2. **Install dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Environment Setup**

Create `.env` file in `backend/` directory:
```env
# API Configuration
OPENAI_API_KEY=your_perplexity_api_key
PORT=3001

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/fitness_db
# OR for SQLite
# DATABASE_URL=sqlite:./dev.db

# Security
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. **Database Setup**
```bash
cd backend
npm run migrate
```

5. **Run the application**

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

The backend runs on `http://localhost:3001` and frontend on `http://localhost:3000`.

### **Using Docker**
```bash
docker-compose up
```

---

## 🔌 API Documentation

### **Chat API**

#### Send Message
```http
POST /api/chat/message
Content-Type: application/json

{
  "message": "Create a workout plan for me",
  "conversationId": "optional-uuid"
}

Response:
{
  "conversationId": "uuid",
  "message": "AI response text...",
  "timestamp": "2026-01-09T12:00:00Z"
}
```

#### Get History
```http
GET /api/chat/history/:conversationId

Response:
{
  "conversationId": "uuid",
  "messages": [
    { "role": "user", "content": "...", "timestamp": "..." },
    { "role": "assistant", "content": "...", "timestamp": "..." }
  ]
}
```

#### Clear History
```http
DELETE /api/chat/history/:conversationId

Response:
{
  "message": "Conversation history cleared successfully"
}
```

---

### **Workout API**

#### Generate Workout Plan
```http
POST /api/workouts/generate
Content-Type: application/json

{
  "fitnessLevel": "beginner",
  "goals": "Build muscle and lose fat",
  "daysPerWeek": 4,
  "sessionDuration": 60,
  "equipment": "dumbbells, resistance bands",
  "limitations": "knee pain"
}

Response:
{
  "plan": "Markdown formatted workout plan..."
}
```

---

### **Exercise API**

#### Get All Exercises
```http
GET /api/exercises

Response:
{
  "exercises": [
    {
      "id": "uuid",
      "name": "Push-ups",
      "category": "strength",
      "difficulty": "beginner",
      "equipment": "none",
      "description": "...",
      "instructions": "...",
      "muscle_groups": ["chest", "triceps", "shoulders"]
    }
  ]
}
```

#### Search Exercises
```http
GET /api/exercises/search?q=squat

Response:
{
  "exercises": [...]
}
```

#### Get Exercise by ID
```http
GET /api/exercises/:id

Response:
{
  "exercise": { ... }
}
```

---

## 🎯 Usage Examples

### **Example 1: Get a Workout Plan**
1. Navigate to `/workout` page
2. Fill in your details:
   - Fitness Level: Intermediate
   - Goals: "Build muscle and improve strength"
   - Days: 5 days per week
   - Duration: 45 minutes
   - Equipment: "Dumbbells, barbell, bench"
3. Click "Generate Workout Plan"
4. View your personalized plan with tables and instructions

### **Example 2: Chat for Nutrition Advice**
1. Go to `/` (Chat page)
2. Ask: "What should I eat before a morning workout?"
3. Receive formatted response with recommendations
4. Follow up: "What about post-workout meals?"
5. Get context-aware advice

### **Example 3: Find Exercises**
1. Navigate to `/exercises`
2. Use search: "leg"
3. Browse cards showing:
   - Squats
   - Lunges
   - Leg press
   - etc.
4. View detailed instructions for each

---

## 🔒 Security

This project follows security best practices:
- ✅ **Snyk Code Scanning** - Automatic vulnerability detection
- ✅ **Input Validation** - express-validator for all endpoints
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **XSS Protection** - Content sanitization
- ✅ **Rate Limiting** - API throttling (if configured)
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **HTTPS Ready** - Production SSL support

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests (if configured)
cd frontend
npm test
```

---

## 📦 Deployment

### **Production Build**

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm run start
```

### **Environment Variables for Production**
```env
NODE_ENV=production
OPENAI_API_KEY=your_production_key
DATABASE_URL=your_production_database
JWT_SECRET=strong_random_secret
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 🙏 Acknowledgments

- **Perplexity AI** for AI capabilities
- **Material-UI** for component library
- **Apple** for design inspiration
- **React** & **Express** communities

---

## 📞 Support

For issues or questions:
- Create an issue in the repository
- Check existing documentation
- Review [DESIGN_GUIDE.md](DESIGN_GUIDE.md) for UI questions

---

**Built with ❤️ for fitness enthusiasts**
