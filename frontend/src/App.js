import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import ChatPage from './pages/ChatPage';
import WorkoutPage from './pages/WorkoutPage';
import ExercisePage from './pages/ExercisePage';
import Navigation from './components/Navigation';

function App() {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #F5F5F7 0%, #FAFAFA 50%, #F5F5F7 100%)',
      }}
    >
      <Navigation />
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/exercises" element={<ExercisePage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
