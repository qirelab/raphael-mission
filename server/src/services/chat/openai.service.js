import { logger } from '../../utils/logger.js';

// OPENAI_BASE_URL is optional (proxy / local mock); defaults to the public API
const getOpenAiUrl = () =>
  `${(process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')}/chat/completions`;
const DEFAULT_MODEL = 'gpt-4.1-mini';
const REQUEST_TIMEOUT_MS = 45000;

export class ChatUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ChatUnavailableError';
  }
}

export const isChatConfigured = () => Boolean(process.env.OPENAI_API_KEY);

/**
 * Streams a chat completion from OpenAI.
 * Calls onDelta(text) for every content chunk; resolves with the full text.
 */
export const streamChatCompletion = async ({ messages, onDelta, signal }) => {
  if (!isChatConfigured()) {
    throw new ChatUnavailableError('OPENAI_API_KEY is not configured');
  }

  // Abort on client disconnect OR timeout (manual combine: AbortSignal.any needs Node 20+)
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error('OpenAI request timed out')), REQUEST_TIMEOUT_MS);
  const onClientAbort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  signal?.addEventListener('abort', onClientAbort, { once: true });

  try {
    return await streamResponse({ messages, onDelta, signal: controller.signal });
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onClientAbort);
  }
};

const streamResponse = async ({ messages, onDelta, signal }) => {
  const response = await fetch(getOpenAiUrl(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
      messages,
      temperature: 0.3,
      max_tokens: 700,
      stream: true,
    }),
    signal,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    logger.error(`OpenAI API error ${response.status}: ${body.slice(0, 500)}`);
    throw new ChatUnavailableError(`OpenAI API error ${response.status}`);
  }

  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';

  for await (const chunk of response.body) {
    buffer += decoder.decode(chunk, { stream: true });

    // SSE events are separated by newlines; keep the trailing partial line
    const lines = buffer.split('\n');
    buffer = lines.pop();

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const payload = trimmed.slice(5).trim();
      if (payload === '[DONE]') return fullText;

      try {
        const delta = JSON.parse(payload).choices?.[0]?.delta?.content;
        if (delta) {
          fullText += delta;
          onDelta(delta);
        }
      } catch {
        // Ignore keep-alive / malformed lines
      }
    }
  }

  return fullText;
};
