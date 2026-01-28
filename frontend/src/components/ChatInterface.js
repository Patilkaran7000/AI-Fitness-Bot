import React, { useState, useEffect, useRef } from 'react';
import {
  Paper,
  Box,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
  Fade,
  Zoom,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import chatService from '../services/chatService';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);
    setError(null);

    try {
      const response = await chatService.sendMessage(inputMessage, conversationId);
      
      if (!conversationId) {
        setConversationId(response.conversationId);
      }

      const aiMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: response.timestamp,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Send message error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    try {
      await chatService.clearHistory(conversationId);
      setMessages([]);
      setConversationId(null);
    } catch (err) {
      setError('Failed to clear history.');
      console.error('Clear history error:', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        height: '75vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Header */}
      <Box 
        sx={{ 
          p: 3,
          background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.05) 0%, rgba(90, 200, 250, 0.05) 100%)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
            }}
          >
            <SmartToyIcon sx={{ color: '#fff', fontSize: '1.3rem' }} />
          </Box>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                fontSize: '1.125rem',
                color: '#1D1D1F',
                letterSpacing: '-0.01em',
              }}
            >
              AI Fitness Coach
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#86868B',
                fontSize: '0.8125rem',
              }}
            >
              Your personal training assistant
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={handleClearHistory}
          sx={{
            color: '#FF375F',
            backgroundColor: 'rgba(255, 55, 95, 0.08)',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: 'rgba(255, 55, 95, 0.15)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* Messages Area */}
      <Box 
        sx={{ 
          flex: 1,
          overflowY: 'auto',
          p: 3,
          background: 'linear-gradient(to bottom, rgba(245, 245, 247, 0.3) 0%, rgba(255, 255, 255, 0.5) 100%)',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            '&:hover': {
              background: 'rgba(0, 0, 0, 0.2)',
            },
          },
        }}
      >
        {messages.length === 0 && (
          <Fade in timeout={800}>
            <Box 
              sx={{ 
                textAlign: 'center',
                mt: 8,
                px: 3,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  boxShadow: '0 8px 24px rgba(0, 122, 255, 0.3)',
                }}
              >
                <SmartToyIcon sx={{ color: '#fff', fontSize: '2.5rem' }} />
              </Box>
              <Typography 
                variant="h5"
                sx={{ 
                  fontWeight: 700,
                  color: '#1D1D1F',
                  mb: 2,
                  letterSpacing: '-0.01em',
                }}
              >
                Hello! Ready to transform?
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  color: '#86868B',
                  maxWidth: '500px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Ask me anything about workouts, nutrition, or fitness goals. I'm here to help you achieve your best self.
              </Typography>
            </Box>
          </Fade>
        )}

        {messages.map((message, index) => (
          <Zoom in key={index} timeout={300} style={{ transitionDelay: '50ms' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                mb: 2.5,
                gap: 1.5,
                alignItems: 'flex-start',
              }}
            >
              {message.role === 'assistant' && (
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    mt: 0.5,
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.25)',
                  }}
                >
                  <SmartToyIcon sx={{ color: '#fff', fontSize: '1rem' }} />
                </Box>
              )}
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  maxWidth: '75%',
                  borderRadius: message.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  background: message.role === 'user' 
                    ? 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)'
                    : 'rgba(255, 255, 255, 0.9)',
                  color: message.role === 'user' ? '#fff' : '#1D1D1F',
                  boxShadow: message.role === 'user'
                    ? '0 4px 16px rgba(0, 122, 255, 0.3)'
                    : '0 2px 12px rgba(0, 0, 0, 0.06)',
                  backdropFilter: 'blur(20px)',
                  border: message.role === 'user' 
                    ? 'none'
                    : '1px solid rgba(0, 0, 0, 0.05)',
                  '& table': {
                    borderCollapse: 'collapse',
                    width: '100%',
                    marginTop: '12px',
                    marginBottom: '12px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  },
                  '& th': {
                    backgroundColor: message.role === 'user' ? 'rgba(255,255,255,0.15)' : 'rgba(0, 122, 255, 0.08)',
                    padding: '10px 12px',
                    textAlign: 'left',
                    borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                  },
                  '& td': {
                    padding: '10px 12px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                    fontSize: '0.9375rem',
                  },
                  '& strong': {
                    fontWeight: 700,
                    color: message.role === 'user' ? '#fff' : '#007AFF',
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
                  '& code': {
                    backgroundColor: message.role === 'user' ? 'rgba(255,255,255,0.2)' : 'rgba(0, 122, 255, 0.08)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontFamily: 'SF Mono, Monaco, monospace',
                    fontSize: '0.875rem',
                  },
                }}
              >
                {message.role === 'user' ? (
                  <Typography 
                    variant="body1"
                    sx={{ 
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.6,
                      fontSize: '1rem',
                    }}
                  >
                    {message.content}
                  </Typography>
                ) : (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => (
                        <Typography 
                          variant="body1"
                          sx={{ 
                            mb: 1.5,
                            mt: 0.5,
                            lineHeight: 1.6,
                            fontSize: '1rem',
                            '&:last-child': { mb: 0 },
                          }}
                        >
                          {children}
                        </Typography>
                      ),
                      h1: ({ children }) => (
                        <Typography 
                          variant="h5"
                          sx={{ 
                            fontWeight: 700,
                            mb: 1.5,
                            mt: 2,
                            color: '#007AFF',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {children}
                        </Typography>
                      ),
                      h2: ({ children }) => (
                        <Typography 
                          variant="h6"
                          sx={{ 
                            fontWeight: 700,
                            mb: 1.5,
                            mt: 1.5,
                            color: '#007AFF',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {children}
                        </Typography>
                      ),
                      h3: ({ children }) => (
                        <Typography 
                          variant="subtitle1"
                          sx={{ 
                            fontWeight: 600,
                            mb: 1,
                            mt: 1,
                            color: '#1D1D1F',
                          }}
                        >
                          {children}
                        </Typography>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </Paper>
              {message.role === 'user' && (
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #86868B 0%, #1D1D1F 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    mt: 0.5,
                  }}
                >
                  <PersonIcon sx={{ color: '#fff', fontSize: '1rem' }} />
                </Box>
              )}
            </Box>
          </Zoom>
        ))}

        {loading && (
          <Fade in>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2, gap: 1.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 122, 255, 0.25)',
                }}
              >
                <SmartToyIcon sx={{ color: '#fff', fontSize: '1rem' }} />
              </Box>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2.5,
                  borderRadius: '20px 20px 20px 4px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
                }}
              >
                <CircularProgress size={20} sx={{ color: '#007AFF' }} />
              </Paper>
            </Box>
          </Fade>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Error Display */}
      {error && (
        <Box sx={{ px: 3, pb: 2 }}>
          <Alert 
            severity="error"
            onClose={() => setError(null)}
            sx={{
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 55, 95, 0.08)',
              border: '1px solid rgba(255, 55, 95, 0.2)',
              '& .MuiAlert-icon': {
                color: '#FF375F',
              },
            }}
          >
            {error}
          </Alert>
        </Box>
      )}

      {/* Input Area */}
      <Box 
        sx={{ 
          p: 3,
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Message FitCoach AI..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                fontSize: '1rem',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover': {
                  backgroundColor: '#fff',
                  border: '1px solid rgba(0, 122, 255, 0.3)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                },
                '&.Mui-focused': {
                  backgroundColor: '#fff',
                  border: '1px solid rgba(0, 122, 255, 0.5)',
                  boxShadow: '0 0 0 4px rgba(0, 122, 255, 0.1)',
                  transform: 'translateY(-2px)',
                },
              },
            }}
          />
          <IconButton
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || loading}
            sx={{
              width: 48,
              height: 48,
              borderRadius: '14px',
              background: inputMessage.trim() && !loading
                ? 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)'
                : 'rgba(0, 0, 0, 0.08)',
              color: '#fff',
              boxShadow: inputMessage.trim() && !loading
                ? '0 4px 16px rgba(0, 122, 255, 0.4)'
                : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: inputMessage.trim() && !loading ? 'scale(1.05)' : 'none',
                boxShadow: inputMessage.trim() && !loading
                  ? '0 6px 20px rgba(0, 122, 255, 0.5)'
                  : 'none',
              },
              '&:active': {
                transform: inputMessage.trim() && !loading ? 'scale(0.98)' : 'none',
              },
              '&.Mui-disabled': {
                color: 'rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChatInterface;
