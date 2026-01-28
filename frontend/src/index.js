import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App';

// Apple-inspired theme with modern design
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007AFF', // Apple blue
      light: '#5AC8FA',
      dark: '#0051D5',
    },
    secondary: {
      main: '#FF375F', // Apple pink/red
      light: '#FF6482',
      dark: '#D6003F',
    },
    background: {
      default: '#F5F5F7', // Apple light gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1D1D1F', // Apple text black
      secondary: '#86868B', // Apple gray
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '4.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.005em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1.0625rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 18, // Apple's signature rounded corners
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0,0,0,0.04)',
    '0 4px 16px rgba(0,0,0,0.06)',
    '0 8px 24px rgba(0,0,0,0.08)',
    '0 12px 32px rgba(0,0,0,0.1)',
    '0 16px 48px rgba(0,0,0,0.12)',
    '0 20px 64px rgba(0,0,0,0.14)',
    '0 2px 8px rgba(0,0,0,0.04)',
    '0 4px 16px rgba(0,0,0,0.06)',
    '0 8px 24px rgba(0,0,0,0.08)',
    '0 12px 32px rgba(0,0,0,0.1)',
    '0 16px 48px rgba(0,0,0,0.12)',
    '0 20px 64px rgba(0,0,0,0.14)',
    '0 2px 8px rgba(0,0,0,0.04)',
    '0 4px 16px rgba(0,0,0,0.06)',
    '0 8px 24px rgba(0,0,0,0.08)',
    '0 12px 32px rgba(0,0,0,0.1)',
    '0 16px 48px rgba(0,0,0,0.12)',
    '0 20px 64px rgba(0,0,0,0.14)',
    '0 2px 8px rgba(0,0,0,0.04)',
    '0 4px 16px rgba(0,0,0,0.06)',
    '0 8px 24px rgba(0,0,0,0.08)',
    '0 12px 32px rgba(0,0,0,0.1)',
    '0 16px 48px rgba(0,0,0,0.12)',
    '0 20px 64px rgba(0,0,0,0.14)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 980, // Pill shape like Apple
          padding: '10px 22px',
          fontSize: '1.0625rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        },
        elevation2: {
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        },
        elevation3: {
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
            '&.Mui-focused': {
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
