import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import ChatInterface from '../components/ChatInterface';

const ChatPage = () => {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(180deg, rgba(0, 122, 255, 0.03) 0%, rgba(245, 245, 247, 0.5) 100%)',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2"
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              color: '#1D1D1F',
              mb: 2,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #1D1D1F 0%, #007AFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}
          >
            Your Personal AI
            <br />
            Fitness Coach
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
            Get personalized fitness advice, workout recommendations, and nutrition guidance through intelligent conversation
          </Typography>
        </Box>

        {/* Chat Interface */}
        <ChatInterface />

        {/* Features */}
        <Box 
          sx={{ 
            mt: 6,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {[
            {
              title: '24/7 Availability',
              description: 'Get instant answers anytime, anywhere',
              icon: '⚡',
            },
            {
              title: 'Personalized Plans',
              description: 'Tailored to your goals and fitness level',
              icon: '🎯',
            },
            {
              title: 'Expert Knowledge',
              description: 'Science-backed fitness and nutrition advice',
              icon: '🧠',
            },
          ].map((feature, index) => (
            <Box
              key={index}
              sx={{
                textAlign: 'center',
                p: 3,
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  background: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              <Box 
                sx={{ 
                  fontSize: '2.5rem',
                  mb: 1.5,
                }}
              >
                {feature.icon}
              </Box>
              <Typography 
                variant="h6"
                sx={{ 
                  fontWeight: 600,
                  color: '#1D1D1F',
                  mb: 0.5,
                  fontSize: '1.125rem',
                }}
              >
                {feature.title}
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  color: '#86868B',
                  fontSize: '0.9375rem',
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ChatPage;
