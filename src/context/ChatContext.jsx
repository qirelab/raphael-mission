import React, { createContext, useContext, useState, useEffect } from 'react';
import openRouterService from '../services/openRouterService';
import { useLanguage } from './LanguageContext';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { t, language } = useLanguage();

  // Load initial state from localStorage
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem('chat-isOpen');
    return saved ? JSON.parse(saved) : false;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chat-messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert timestamp strings back to Date objects
        return parsed.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
    return [
      {
        id: 1,
        text: t('chatBotWelcome'),
        sender: 'bot',
        timestamp: new Date(),
      },
    ];
  });

  const [isTyping, setIsTyping] = useState(false);
  const [isApiError, setIsApiError] = useState(false);
  const [customRules, setCustomRules] = useState(() => {
    const saved = localStorage.getItem('chat-customRules');
    return saved ? JSON.parse(saved) : [];
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chat-isOpen', JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem('chat-messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chat-customRules', JSON.stringify(customRules));
  }, [customRules]);

  // Update welcome message when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'bot') {
      setMessages([
        {
          id: 1,
          text: t('chatBotWelcome'),
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [language, t]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const addMessage = (text, sender = 'user') => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const getBotResponse = async (userMessage) => {
    setIsTyping(true);
    setIsApiError(false);

    try {
      // Prepare messages for API (last 10 messages for context)
      const recentMessages = messages.slice(-10).map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

      // Add current user message
      recentMessages.push({
        role: 'user',
        content: userMessage,
      });

      // Call OpenRouter API
      const botResponse = await openRouterService.sendMessage(
        recentMessages,
        customRules,
        language
      );

      addMessage(botResponse, 'bot');
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      setIsApiError(true);

      // Fallback to simple responses
      const fallbackResponse = openRouterService.getFallbackResponse(userMessage, language);
      addMessage(fallbackResponse, 'bot');
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    addMessage(text, 'user');
    getBotResponse(text);
  };

  const clearChat = () => {
    const defaultMessages = [
      {
        id: 1,
        text: t('chatBotWelcome'),
        sender: 'bot',
        timestamp: new Date(),
      },
    ];
    setMessages(defaultMessages);
    // Clear from localStorage as well
    localStorage.setItem('chat-messages', JSON.stringify(defaultMessages));
  };

  const resetChat = () => {
    // Reset all chat data
    setIsOpen(false);
    setCustomRules([]);
    clearChat();
    // Clear all localStorage data
    localStorage.removeItem('chat-isOpen');
    localStorage.removeItem('chat-messages');
    localStorage.removeItem('chat-customRules');
  };

  const value = {
    isOpen,
    messages,
    isTyping,
    isApiError,
    customRules,
    setCustomRules,
    toggleChat,
    sendMessage,
    clearChat,
    resetChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
