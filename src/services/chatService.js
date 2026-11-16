// Support chat client: talks to our backend (/api/chat), which holds the
// OpenAI key and the knowledge base. The browser never sees any API key.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export class ChatError extends Error {
  constructor(code) {
    super(code);
    this.code = code; // 'RATE_LIMITED' | 'CHAT_UNAVAILABLE' | 'CHAT_ERROR'
  }
}

/**
 * Sends the conversation and streams the answer.
 * @param {Object} params
 * @param {{role: 'user'|'assistant', content: string}[]} params.messages
 * @param {string} params.language
 * @param {string} params.page - current pathname, gives the bot context
 * @param {(delta: string) => void} params.onDelta
 * @param {AbortSignal} [params.signal]
 */
export const streamChatReply = async ({ messages, language, page, onDelta, signal }) => {
  let response;
  try {
    response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, language, page }),
      signal,
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ChatError('CHAT_ERROR');
  }

  if (response.status === 429) throw new ChatError('RATE_LIMITED');
  if (!response.ok || !response.body) {
    throw new ChatError(response.status === 503 ? 'CHAT_UNAVAILABLE' : 'CHAT_ERROR');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let received = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE events are separated by a blank line
    const events = buffer.split('\n\n');
    buffer = events.pop();

    for (const event of events) {
      const line = event.trim();
      if (!line.startsWith('data:')) continue;

      let data;
      try {
        data = JSON.parse(line.slice(5).trim());
      } catch {
        continue;
      }

      if (data.error) throw new ChatError(data.error);
      if (data.delta) {
        received += data.delta;
        onDelta(data.delta);
      }
      if (data.done) {
        if (!received) throw new ChatError('CHAT_ERROR');
        return received;
      }
    }
  }

  if (!received) throw new ChatError('CHAT_ERROR');
  return received;
};
