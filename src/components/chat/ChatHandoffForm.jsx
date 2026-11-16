import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useChat } from '../../context/ChatContext';
import { useLanguage } from '../../context/LanguageContext';

// Same EmailJS template as the contact form on the home page
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const buildTranscript = (messages) =>
  messages
    .filter((m) => !m.kind && m.text)
    .map((m) => `${m.sender === 'user' ? 'Visitor' : 'Casper'}: ${m.text}`)
    .join('\n\n');

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2F7D6D] focus:border-transparent';

const ChatHandoffForm = () => {
  const { messages, setView } = useChat();
  const { t } = useLanguage();

  const lastUserQuestion = [...messages].reverse().find((m) => m.sender === 'user')?.text || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(lastUserQuestion);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | invalid

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !EMAIL_RE.test(email.trim()) || !message.trim()) {
      setStatus('invalid');
      return;
    }
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('EmailJS is not configured (VITE_EMAILJS_*)');
      setStatus('error');
      return;
    }

    setStatus('sending');
    const transcript = buildTranscript(messages);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          firstName: name.trim(),
          lastName: '',
          email: email.trim(),
          subject: t('chatHandoffSubject'),
          message: transcript
            ? `${message.trim()}\n\n---\nChat history:\n\n${transcript}`
            : message.trim(),
          reply_to: email.trim(),
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus('sent');
    } catch (error) {
      console.error('Chat handoff EmailJS error:', error);
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center bg-gray-50">
        <div className="w-12 h-12 rounded-full bg-[#2F7D6D]/10 text-[#2F7D6D] flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm text-gray-700">{t('chatHandoffSuccess')}</p>
        <button
          type="button"
          onClick={() => setView('chat')}
          className="text-sm font-medium text-[#2F7D6D] hover:underline"
        >
          {t('chatHandoffCancel')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
      <div>
        <h4 className="font-semibold text-sm text-gray-900">{t('chatHandoffTitle')}</h4>
        <p className="text-xs text-gray-500 mt-1">{t('chatHandoffHint')}</p>
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t('chatHandoffName')}
        aria-label={t('chatHandoffName')}
        className={inputClass}
        autoComplete="name"
        maxLength={100}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('chatHandoffEmail')}
        aria-label={t('chatHandoffEmail')}
        className={inputClass}
        autoComplete="email"
        maxLength={150}
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t('chatHandoffMessage')}
        aria-label={t('chatHandoffMessage')}
        rows={4}
        className={`${inputClass} resize-none`}
        maxLength={3000}
      />

      {(status === 'invalid' || status === 'error') && (
        <p className="text-xs text-red-600" role="alert">
          {status === 'invalid' ? t('chatHandoffInvalid') : t('chatHandoffError')}
        </p>
      )}

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="flex-1 px-4 py-2 bg-[#2F7D6D] text-white text-sm font-medium rounded-lg hover:bg-[#266b5a] transition-colors disabled:opacity-50"
        >
          {status === 'sending' ? t('chatHandoffSending') : t('chatHandoffSend')}
        </button>
        <button
          type="button"
          onClick={() => setView('chat')}
          className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          {t('chatHandoffCancel')}
        </button>
      </div>
    </form>
  );
};

export default ChatHandoffForm;
