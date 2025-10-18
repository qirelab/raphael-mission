import React, { createContext, useContext, useState } from 'react';
import openRouterService from '../services/openRouterService';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Привет! Я Casper AI, ваш помощник по миссии Raphael. Чем могу помочь?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isApiError, setIsApiError] = useState(false);

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
      const botResponse = await openRouterService.sendMessage(recentMessages);

      addMessage(botResponse, 'bot');
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      setIsApiError(true);

      // Fallback to simple responses
      const fallbackResponse = openRouterService.getFallbackResponse(userMessage);
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
    setMessages([
      {
        id: 1,
        text: 'Привет! Я Casper AI, ваш помощник по миссии Raphael. Чем могу помочь?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  };

  const value = {
    isOpen,
    messages,
    isTyping,
    isApiError,
    toggleChat,
    sendMessage,
    clearChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
