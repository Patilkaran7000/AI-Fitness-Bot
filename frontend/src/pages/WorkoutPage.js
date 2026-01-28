import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Container,
  Fade,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import workoutService from '../services/workoutService';

const WorkoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [formData, setFormData] = useState({
    fitnessLevel: 'beginner',
    goals: '',
    daysPerWeek: 3,
    sessionDuration: 60,
    equipment: 'none',
    limitations: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGeneratePlan = async () => {
    if (!formData.goals.trim()) {
      setError('Please enter your fitness goals');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await workoutService.generatePlan(formData);
      setWorkoutPlan(response.plan);
    } catch (err) {
      setError('Failed to generate workout plan. Please try again.');
      console.error('Generate plan error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(180deg, rgba(255, 55, 95, 0.03) 0%, rgba(245, 245, 247, 0.5) 100%)',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #FF375F 0%, #FF6482 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 8px 24px rgba(255, 55, 95, 0.3)',
            }}
          >
            <FitnessCenterIcon sx={{ color: '#fff', fontSize: '2.5rem' }} />
          </Box>
          <Typography 
            variant="h2"
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              color: '#1D1D1F',
              mb: 2,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Your Personalized
            <br />
            Workout Plan
          </Typography>
          <Typography 
            variant="h6"
            sx={{ 
              color: '#86868B',
              maxWidth: '700px',
              mx: 'auto',
              fontWeight: 400,
              fontSize: { xs: '1.125rem', sm: '1.25rem' },
              lineHeight: 1.6,
              px: 2,
            }}
          >
            Fill in your details and let AI create a customized workout plan tailored to your goals
          </Typography>
        </Box>

        {/* Form */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 4,
            mb: 4,
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Fitness Level</InputLabel>
              <Select
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleInputChange}
                label="Fitness Level"
                sx={{
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.08)',
                  },
                }}
              >
                <MenuItem value="beginner">🟢 Beginner</MenuItem>
                <MenuItem value="intermediate">🟡 Intermediate</MenuItem>
                <MenuItem value="advanced">🔴 Advanced</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Fitness Goals"
              name="goals"
              value={formData.goals}
              onChange={handleInputChange}
              placeholder="e.g., Build muscle, lose weight, improve endurance"
              multiline
              rows={2}
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Days Per Week</InputLabel>
                <Select
                  name="daysPerWeek"
                  value={formData.daysPerWeek}
                  onChange={handleInputChange}
                  label="Days Per Week"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <MenuItem key={day} value={day}>
                      {day} {day === 1 ? 'day' : 'days'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Session Duration (minutes)"
                name="sessionDuration"
                type="number"
                value={formData.sessionDuration}
                onChange={handleInputChange}
                inputProps={{ min: 15, max: 180 }}
              />
            </Box>

            <TextField
              fullWidth
              label="Available Equipment"
              name="equipment"
              value={formData.equipment}
              onChange={handleInputChange}
              placeholder="e.g., dumbbells, resistance bands, or none"
            />

            <TextField
              fullWidth
              label="Limitations or Injuries"
              name="limitations"
              value={formData.limitations}
              onChange={handleInputChange}
              placeholder="e.g., knee pain, back injury (optional)"
              multiline
              rows={2}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleGeneratePlan}
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: '1.0625rem',
                fontWeight: 600,
                borderRadius: '980px',
                background: 'linear-gradient(135deg, #FF375F 0%, #FF6482 100%)',
                boxShadow: '0 4px 16px rgba(255, 55, 95, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 24px rgba(255, 55, 95, 0.4)',
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  background: 'rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: '#fff' }} />
              ) : (
                '🎯 Generate Workout Plan'
              )}
            </Button>
          </Box>
        </Paper>

        {error && (
          <Fade in>
            <Alert 
              severity="error"
              sx={{ 
                mb: 4,
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 55, 95, 0.08)',
                border: '1px solid rgba(255, 55, 95, 0.2)',
              }} 
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          </Fade>
        )}

        {workoutPlan && (
          <Fade in timeout={800}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                '& table': {
                  borderCollapse: 'collapse',
                  width: '100%',
                  marginTop: '16px',
                  marginBottom: '16px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                },
                '& th': {
                  backgroundColor: 'rgba(255, 55, 95, 0.08)',
                  padding: '12px 16px',
                  textAlign: 'left',
                  borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                },
                '& td': {
                  padding: '12px 16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                  fontSize: '0.9375rem',
                },
                '& strong': {
                  fontWeight: 700,
                  color: '#FF375F',
                },
                '& ul, & ol': {
                  marginLeft: '20px',
                  marginTop: '12px',
                  marginBottom: '12px',
                },
                '& li': {
                  marginBottom: '8px',
                  lineHeight: 1.6,
                },
              }}
            >
              <Typography 
                variant="h4"
                sx={{ 
                  fontWeight: 700,
                  color: '#1D1D1F',
                  mb: 3,
                  letterSpacing: '-0.01em',
                }}
              >
                🎯 Your Personalized Workout Plan
              </Typography>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {workoutPlan}
              </ReactMarkdown>
            </Paper>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default WorkoutPage;
