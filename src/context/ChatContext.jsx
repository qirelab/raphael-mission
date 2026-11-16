import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { streamChatReply, ChatError } from '../services/chatService';
import { useLanguage } from './LanguageContext';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

const STORAGE_KEY = 'chat-v2';
const HISTORY_TTL_MS = 24 * 60 * 60 * 1000; // forget conversations after a day
const MAX_CONTEXT_MESSAGES = 12;
// Keys from the previous OpenRouter-based chat
const LEGACY_KEYS = ['chat-isOpen', 'chat-messages', 'chat-customRules'];

/**
 * Message shape: { id, sender: 'user'|'bot', text, timestamp, kind? }
 * kind: 'welcome' | 'error' | 'rate-limited' — rendered from translations at
 * display time (so they follow the site language) and never sent to the model.
 */
const welcomeMessage = () => ({
  id: 'welcome',
  sender: 'bot',
  kind: 'welcome',
  text: '',
  timestamp: new Date(),
});

const loadMessages = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Date.now() - saved.savedAt < HISTORY_TTL_MS && saved.messages?.length) {
      return saved.messages.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }));
    }
  } catch {
    // corrupted storage → start fresh
  }
  return [welcomeMessage()];
};

let idCounter = 0;
const nextId = () => `${Date.now()}-${idCounter++}`;

export const ChatProvider = ({ children }) => {
  const { language } = useLanguage();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('chat'); // 'chat' | 'handoff'
  const [messages, setMessages] = useState(loadMessages);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef(null);

  useEffect(() => {
    LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
  }, []);

  useEffect(() => {
    // Don't persist a half-streamed answer
    if (isStreaming) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ savedAt: Date.now(), messages }));
  }, [messages, isStreaming]);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((open) => !open), []);

  const sendMessage = useCallback(
    async (rawText) => {
      const text = rawText.trim();
      if (!text || isStreaming) return;

      const userMessage = { id: nextId(), sender: 'user', text, timestamp: new Date() };
      const botId = nextId();

      // Only real dialogue turns go to the model
      const history = [...messages, userMessage]
        .filter((m) => !m.kind && m.text)
        .slice(-MAX_CONTEXT_MESSAGES)
        // Backend rejects turns over 4000 chars; never let one long answer break the chat
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text.slice(0, 4000),
        }));

      setMessages((prev) => [
        ...prev,
        userMessage,
        { id: botId, sender: 'bot', text: '', timestamp: new Date() },
      ]);
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      const updateBot = (patch) =>
        setMessages((prev) => prev.map((m) => (m.id === botId ? { ...m, ...patch } : m)));

      try {
        let answer = '';
        await streamChatReply({
          messages: history,
          language,
          page: location.pathname,
          signal: controller.signal,
          onDelta: (delta) => {
            answer += delta;
            updateBot({ text: answer });
          },
        });
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error('Chat error:', error);
        updateBot({
          text: '',
          kind: error instanceof ChatError && error.code === 'RATE_LIMITED' ? 'rate-limited' : 'error',
        });
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
        setIsStreaming(false);
      }
    },
    [isStreaming, messages, language, location.pathname]
  );

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
    setView('chat');
    setMessages([welcomeMessage()]);
  }, []);

  const value = {
    isOpen,
    view,
    setView,
    messages,
    isStreaming,
    openChat,
    closeChat,
    toggleChat,
    sendMessage,
    clearChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
