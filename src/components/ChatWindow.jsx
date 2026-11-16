import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import { useLanguage } from '../context/LanguageContext';
import ChatMarkdown from './chat/ChatMarkdown';
import ChatHandoffForm from './chat/ChatHandoffForm';

const TIME_LOCALES = { en: 'en-GB', ru: 'ru-RU', pl: 'pl-PL' };
const QUICK_REPLY_KEYS = ['chatBotQuick1', 'chatBotQuick2', 'chatBotQuick3', 'chatBotQuick4'];
const BRAND = '#2F7D6D';

const TypingDots = () => (
  <div className="flex space-x-1 py-1" aria-hidden="true">
    {[0, 0.15, 0.3].map((delay) => (
      <span
        key={delay}
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: `${delay}s` }}
      />
    ))}
  </div>
);

const ChatWindow = () => {
  const { isOpen, view, setView, messages, isStreaming, sendMessage, closeChat, clearChat } =
    useChat();
  const { t, language } = useLanguage();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isOpen, view]);

  useEffect(() => {
    if (isOpen && view === 'chat') inputRef.current?.focus();
  }, [isOpen, view]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeChat();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeChat]);

  if (!isOpen) return null;

  const hasUserMessages = messages.some((m) => m.sender === 'user');

  const submit = (text) => {
    if (!text.trim() || isStreaming) return;
    sendMessage(text);
    setInputValue('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(inputValue);
  };

  // On phones the chat covers the page: close it when the visitor follows an internal link
  const handleNavigate = () => {
    if (window.matchMedia('(max-width: 639px)').matches) closeChat();
  };

  // Readable labels for bare internal paths the model sometimes prints
  const labelForPath = (path) => {
    const rest = path.replace(/^\/(en|ru|pl)/, '').split('?')[0];
    if (rest === '#contact' || rest === '/contact') return t('contact');
    if (rest.startsWith('/donat')) return t('donate');
    if (rest.startsWith('/projects')) return t('projects');
    const map = {
      '/about-mission': 'about',
      '/testimonies': 'testimonies',
      '/shop': 'shop',
      '/privacy-policy': 'privacyPolicy',
      '/terms-of-service': 'termsOfService',
      '/cookie-policy': 'cookiePolicy',
    };
    return map[rest] ? t(map[rest]) : null;
  };

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString(TIME_LOCALES[language] || 'en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const renderBotContent = (message) => {
    if (message.kind === 'welcome') return <ChatMarkdown text={t('chatBotWelcome')} />;
    if (message.kind === 'rate-limited') {
      return <p className="text-sm">{t('chatBotRateLimited')}</p>;
    }
    if (message.kind === 'error') {
      return (
        <p className="text-sm">
          {t('chatBotErrorReply')}{' '}
          <Link
            to={`/${language}/contact`}
            onClick={handleNavigate}
            className="underline font-medium text-[#2F7D6D]"
          >
            {t('chatBotContactsLink')}
          </Link>
          .
        </p>
      );
    }
    if (!message.text) return <TypingDots />;
    return <ChatMarkdown text={message.text} onNavigate={handleNavigate} labelFor={labelForPath} />;
  };

  return (
    <div
      className="chat-window fixed z-40 bottom-20 right-2 sm:right-4 w-[calc(100vw-1rem)] sm:w-96 h-[min(600px,calc(100dvh-10.5rem))] min-h-[280px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
      role="dialog"
      aria-label={t('chatBotTitle')}
    >
      {/* Header */}
      <div className="text-white px-4 py-3 flex items-center justify-between" style={{ backgroundColor: BRAND }}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#2F7D6D]" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm">{t('chatBotTitle')}</h3>
            <p className="text-xs text-white/80 truncate">{t('chatBotSubtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {hasUserMessages && (
            <button
              type="button"
              onClick={clearChat}
              className="p-1.5 hover:bg-white/20 rounded transition-colors"
              title={t('chatBotNewConversation')}
              aria-label={t('chatBotNewConversation')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={closeChat}
            className="p-1.5 hover:bg-white/20 rounded transition-colors"
            title={t('chatBotClose')}
            aria-label={t('chatBotClose')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {view === 'handoff' ? (
        <ChatHandoffForm />
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                    message.sender === 'user'
                      ? 'bg-[#2F7D6D] text-white rounded-br-sm'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                  ) : (
                    renderBotContent(message)
                  )}
                  <p
                    className={`text-[11px] mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Quick replies for a fresh conversation */}
            {!hasUserMessages && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLY_KEYS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => submit(t(key))}
                    className="px-3 py-1.5 text-xs font-medium text-[#2F7D6D] bg-white border border-[#2F7D6D]/40 rounded-full hover:bg-[#2F7D6D] hover:text-white transition-colors"
                  >
                    {t(key)}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 pt-2 pb-3 bg-white border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={() => setView('handoff')}
                className="inline-flex items-center gap-1 shrink-0 whitespace-nowrap text-xs font-medium text-[#2F7D6D] hover:underline"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {t('chatHandoffButton')}
              </button>
              <span className="text-[10px] text-gray-400 text-right ml-2">{t('chatBotDisclaimer')}</span>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t('chatBotPlaceholder')}
                aria-label={t('chatBotPlaceholder')}
                maxLength={2000}
                className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isStreaming}
                aria-label={t('chatBotSend')}
                title={t('chatBotSend')}
                className="px-4 py-2 bg-[#2F7D6D] text-white rounded-lg hover:bg-[#266b5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
