import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  TextField,
  CircularProgress,
  Alert,
  Container,
  Fade,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import api from '../services/api';

const ExercisePage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const response = await api.get('/api/exercises');
      setExercises(response.data.exercises);
    } catch (err) {
      setError('Failed to load exercises');
      console.error('Load exercises error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      loadExercises();
      return;
    }

    try {
      const response = await api.get(`/api/exercises/search?q=${encodeURIComponent(query)}`);
      setExercises(response.data.exercises);
    } catch (err) {
      setError('Search failed');
      console.error('Search error:', err);
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 80px)',
          background: 'linear-gradient(180deg, rgba(90, 200, 250, 0.03) 0%, rgba(245, 245, 247, 0.5) 100%)',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ color: '#007AFF' }} />
          <Typography variant="h6" sx={{ mt: 3, color: '#86868B' }}>
            Loading exercises...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(180deg, rgba(90, 200, 250, 0.03) 0%, rgba(245, 245, 247, 0.5) 100%)',
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
              background: 'linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 8px 24px rgba(90, 200, 250, 0.3)',
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
            Exercise Library
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
            Browse our comprehensive exercise database with detailed instructions
          </Typography>
        </Box>

        {/* Search */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 2,
            mb: 4,
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          }}
        >
          <TextField
            fullWidth
            placeholder="Search exercises by name or description..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#86868B' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '14px',
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />
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

        {/* Exercise Cards */}
        <Grid container spacing={3}>
          {exercises.map((exercise, index) => (
            <Grid item xs={12} md={6} key={exercise.id}>
              <Fade in timeout={300 + index * 50}>
                <Card 
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(40px)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography 
                      variant="h6"
                      sx={{ 
                        fontWeight: 700,
                        color: '#1D1D1F',
                        mb: 2,
                        fontSize: '1.25rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {exercise.name}
                    </Typography>
                    
                    <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip 
                        label={exercise.category} 
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                          color: '#fff',
                          fontWeight: 600,
                          border: 'none',
                        }}
                      />
                      <Chip 
                        label={exercise.difficulty} 
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #FF375F 0%, #FF6482 100%)',
                          color: '#fff',
                          fontWeight: 600,
                          border: 'none',
                        }}
                      />
                      {exercise.equipment && (
                        <Chip 
                          label={exercise.equipment} 
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(0, 122, 255, 0.08)',
                            color: '#007AFF',
                            fontWeight: 600,
                            border: '1px solid rgba(0, 122, 255, 0.2)',
                          }}
                        />
                      )}
                    </Box>

                    <Typography 
                      variant="body2"
                      sx={{ 
                        color: '#86868B',
                        mb: 2,
                        lineHeight: 1.6,
                      }}
                    >
                      {exercise.description}
                    </Typography>

                    {exercise.muscle_groups && exercise.muscle_groups.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography 
                          variant="caption"
                          sx={{ 
                            color: '#1D1D1F',
                            fontWeight: 600,
                            fontSize: '0.8125rem',
                          }}
                        >
                          Target Muscles:
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {exercise.muscle_groups.map((muscle, idx) => (
                            <Chip 
                              key={idx} 
                              label={muscle} 
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(90, 200, 250, 0.1)',
                                color: '#007AFF',
                                fontWeight: 500,
                                border: '1px solid rgba(90, 200, 250, 0.3)',
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {exercise.instructions && (
                      <Box 
                        sx={{ 
                          mt: 2,
                          p: 2,
                          background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.03) 0%, rgba(90, 200, 250, 0.03) 100%)',
                          borderRadius: '12px',
                          border: '1px solid rgba(0, 122, 255, 0.1)',
                        }}
                      >
                        <Typography 
                          variant="caption"
                          sx={{ 
                            fontWeight: 700,
                            color: '#007AFF',
                            fontSize: '0.8125rem',
                          }}
                        >
                          Instructions:
                        </Typography>
                        <Typography 
                          variant="body2"
                          sx={{ 
                            mt: 1,
                            color: '#1D1D1F',
                            lineHeight: 1.6,
                          }}
                        >
                          {exercise.instructions}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {exercises.length === 0 && !loading && (
          <Fade in>
            <Box 
              sx={{ 
                textAlign: 'center',
                mt: 8,
                p: 6,
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography 
                variant="h5"
                sx={{ 
                  color: '#1D1D1F',
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                No exercises found
              </Typography>
              <Typography 
                variant="body1"
                sx={{ color: '#86868B' }}
              >
                Try a different search term or browse all exercises
              </Typography>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default ExercisePage;
