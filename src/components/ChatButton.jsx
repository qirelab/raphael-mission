import React from 'react';
import { useChat } from '../context/ChatContext';

const ChatButton = () => {
  const { isOpen, toggleChat } = useChat();

  return (
    <button
      onClick={toggleChat}
      className={`chat-button fixed bottom-4 right-2 sm:right-4 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-[#2F7D6D] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#2F7D6D]/30 ${
        isOpen ? 'rotate-45' : 'rotate-0'
      }`}
      aria-label={isOpen ? 'Закрыть чат' : 'Открыть чат с Casper AI'}
    >
      <div className="flex items-center justify-center w-full h-full">
        {isOpen ? (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </div>

      {/* Notification dot */}
      {!isOpen && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">AI</span>
        </div>
      )}
    </button>
  );
};

export default ChatButton;
