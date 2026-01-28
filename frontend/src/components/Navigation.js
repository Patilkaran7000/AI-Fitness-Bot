import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';

const Navigation = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: scrolled 
          ? 'rgba(255, 255, 255, 0.8)'
          : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.04)' : 'none',
      }}
    >
      <Toolbar 
        sx={{ 
          maxWidth: '1200px', 
          width: '100%', 
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          py: 1,
        }}
      >
        {/* Logo */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mr: 4,
            cursor: 'pointer',
          }}
          component={RouterLink}
          to="/"
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1.5,
              boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
            }}
          >
            <FitnessCenterIcon sx={{ color: '#fff', fontSize: '1.3rem' }} />
          </Box>
          <Typography 
            variant="h6" 
            component="div"
            sx={{
              fontWeight: 700,
              fontSize: '1.25rem',
              background: 'linear-gradient(135deg, #1D1D1F 0%, #86868B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            FitCoach AI
          </Typography>
        </Box>

        {/* Nav Links */}
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 0.5, justifyContent: 'center' }}>
          <Button
            component={RouterLink}
            to="/"
            startIcon={<ChatIcon />}
            sx={{
              color: location.pathname === '/' ? '#007AFF' : '#1D1D1F',
              fontWeight: location.pathname === '/' ? 600 : 400,
              px: 2.5,
              py: 1,
              borderRadius: '12px',
              fontSize: '0.9375rem',
              backgroundColor: location.pathname === '/' 
                ? 'rgba(0, 122, 255, 0.08)' 
                : 'transparent',
              '&:hover': {
                backgroundColor: location.pathname === '/'
                  ? 'rgba(0, 122, 255, 0.12)'
                  : 'rgba(0, 0, 0, 0.04)',
                transform: 'none',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Chat
          </Button>
          <Button
            component={RouterLink}
            to="/workout"
            startIcon={<SportsGymnasticsIcon />}
            sx={{
              color: location.pathname === '/workout' ? '#007AFF' : '#1D1D1F',
              fontWeight: location.pathname === '/workout' ? 600 : 400,
              px: 2.5,
              py: 1,
              borderRadius: '12px',
              fontSize: '0.9375rem',
              backgroundColor: location.pathname === '/workout' 
                ? 'rgba(0, 122, 255, 0.08)' 
                : 'transparent',
              '&:hover': {
                backgroundColor: location.pathname === '/workout'
                  ? 'rgba(0, 122, 255, 0.12)'
                  : 'rgba(0, 0, 0, 0.04)',
                transform: 'none',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Workouts
          </Button>
          <Button
            component={RouterLink}
            to="/exercises"
            startIcon={<FitnessCenterIcon />}
            sx={{
              color: location.pathname === '/exercises' ? '#007AFF' : '#1D1D1F',
              fontWeight: location.pathname === '/exercises' ? 600 : 400,
              px: 2.5,
              py: 1,
              borderRadius: '12px',
              fontSize: '0.9375rem',
              backgroundColor: location.pathname === '/exercises' 
                ? 'rgba(0, 122, 255, 0.08)' 
                : 'transparent',
              '&:hover': {
                backgroundColor: location.pathname === '/exercises'
                  ? 'rgba(0, 122, 255, 0.12)'
                  : 'rgba(0, 0, 0, 0.04)',
                transform: 'none',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Exercises
          </Button>
        </Box>

        {/* CTA Button */}
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
            borderRadius: '980px',
            px: 3,
            py: 1,
            fontWeight: 600,
            fontSize: '0.9375rem',
            boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(0, 122, 255, 0.4)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Get Started
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
