const { run, db } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

/**
 * Database migration script for SQLite
 * Creates all necessary tables for the fitness chatbot
 */

const createTables = async () => {
  try {
    console.log('🔄 Starting database migration...');

    // Users table
    await run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');

    // Conversations table
    await run(`
      CREATE TABLE IF NOT EXISTS conversations (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Conversations table created');

    // Messages table
    await run(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        conversation_id TEXT REFERENCES conversations(id) ON DELETE CASCADE,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Messages table created');

    // Exercises table
    await run(`
      CREATE TABLE IF NOT EXISTS exercises (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT CHECK (category IN ('strength', 'cardio', 'flexibility', 'balance')),
        difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
        equipment TEXT,
        muscle_groups TEXT,
        instructions TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Exercises table created');

    // Workout plans table
    await run(`
      CREATE TABLE IF NOT EXISTS workout_plans (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        fitness_level TEXT,
        goals TEXT,
        plan_content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Workout plans table created');

    // Check if exercises already exist
    const checkExisting = await new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as count FROM exercises', (err, row) => {
        if (err) reject(err);
        else resolve(row.count);
      });
    });

    if (checkExisting === 0) {
      // Insert sample exercises
      const exercises = [
        {
          id: uuidv4(),
          name: 'Push-ups',
          description: 'Classic bodyweight exercise for upper body strength',
          category: 'strength',
          difficulty: 'beginner',
          equipment: 'none',
          muscle_groups: JSON.stringify(['chest', 'triceps', 'shoulders']),
          instructions: 'Start in plank position. Lower body until chest nearly touches floor. Push back up.'
        },
        {
          id: uuidv4(),
          name: 'Squats',
          description: 'Fundamental lower body exercise',
          category: 'strength',
          difficulty: 'beginner',
          equipment: 'none',
          muscle_groups: JSON.stringify(['quadriceps', 'glutes', 'hamstrings']),
          instructions: 'Stand with feet shoulder-width apart. Lower hips back and down. Return to standing.'
        },
        {
          id: uuidv4(),
          name: 'Plank',
          description: 'Core stability exercise',
          category: 'strength',
          difficulty: 'beginner',
          equipment: 'none',
          muscle_groups: JSON.stringify(['core', 'abs']),
          instructions: 'Hold push-up position on forearms. Keep body straight. Hold for time.'
        },
        {
          id: uuidv4(),
          name: 'Running',
          description: 'Cardiovascular endurance exercise',
          category: 'cardio',
          difficulty: 'intermediate',
          equipment: 'none',
          muscle_groups: JSON.stringify(['legs', 'cardiovascular']),
          instructions: 'Maintain steady pace. Focus on breathing rhythm.'
        },
        {
          id: uuidv4(),
          name: 'Deadlift',
          description: 'Compound strength exercise',
          category: 'strength',
          difficulty: 'advanced',
          equipment: 'barbell',
          muscle_groups: JSON.stringify(['back', 'glutes', 'hamstrings']),
          instructions: 'Lift barbell from ground to hip level. Keep back straight. Lower with control.'
        }
      ];

      for (const exercise of exercises) {
        await run(
          `INSERT INTO exercises (id, name, description, category, difficulty, equipment, muscle_groups, instructions) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [exercise.id, exercise.name, exercise.description, exercise.category, exercise.difficulty, exercise.equipment, exercise.muscle_groups, exercise.instructions]
        );
      }
      console.log('✅ Sample exercises inserted');
    } else {
      console.log('ℹ️  Sample exercises already exist, skipping...');
    }

    // Create indexes for better query performance
    await run('CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id)');
    await run('CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at)');
    await run('CREATE INDEX IF NOT EXISTS idx_exercises_category ON exercises(category)');
    await run('CREATE INDEX IF NOT EXISTS idx_exercises_difficulty ON exercises(difficulty)');
    console.log('✅ Indexes created');

    console.log('🎉 Database migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
};

// Run migration
createTables()
  .then(() => {
    db.close();
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    db.close();
    process.exit(1);
  });
