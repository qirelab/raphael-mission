import { chatKnowledgeService } from '../services/chat/knowledge.service.js';
import { buildSystemPrompt } from '../services/chat/systemPrompt.js';
import {
  streamChatCompletion,
  isChatConfigured,
  ChatUnavailableError,
} from '../services/chat/openai.service.js';
import { logger } from '../utils/logger.js';

// Only the most recent turns are sent to the model: keeps cost bounded and
// limits how much a long conversation can drift from the system prompt.
const MAX_HISTORY_MESSAGES = 12;

const sendEvent = (res, data) => {
  // The visitor may have closed the tab mid-answer
  if (res.writableEnded || res.destroyed) return;
  res.write(`data: ${JSON.stringify(data)}\n\n`);
};

export const chatController = {
  /**
   * POST /api/chat
   * Body: { messages: [{role, content}], language, page }
   * Response: text/event-stream with {delta} chunks, then {done: true} or {error}
   */
  async message(req, res) {
    const { messages, language, page } = req.body;

    if (!isChatConfigured()) {
      return res.status(503).json({
        success: false,
        error: { code: 'CHAT_UNAVAILABLE', message: 'Chat assistant is not configured' },
      });
    }

    let knowledge;
    try {
      knowledge = await chatKnowledgeService.get(language);
    } catch (error) {
      logger.error('Chat: failed to build knowledge base', { error: error.message });
      knowledge = '';
    }

    const history = messages.slice(-MAX_HISTORY_MESSAGES);
    const lastQuestion = history[history.length - 1]?.content || '';

    res.set({
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no', // disable nginx buffering so tokens stream immediately
    });
    res.flushHeaders();

    const abort = new AbortController();
    res.on('close', () => {
      if (!res.writableEnded) abort.abort();
    });

    const startedAt = Date.now();
    try {
      const answer = await streamChatCompletion({
        messages: [
          { role: 'system', content: buildSystemPrompt({ knowledge, language, page }) },
          ...history,
        ],
        onDelta: (delta) => sendEvent(res, { delta }),
        signal: abort.signal,
      });

      if (!answer.trim()) throw new Error('Empty completion');
      sendEvent(res, { done: true });
      logger.info('Chat answered', {
        language,
        page,
        question: lastQuestion.slice(0, 300),
        answerChars: answer.length,
        ms: Date.now() - startedAt,
      });
    } catch (error) {
      if (abort.signal.aborted) return; // client went away
      logger.error('Chat: completion failed', { error: error.message });
      sendEvent(res, {
        error: error instanceof ChatUnavailableError ? 'CHAT_UNAVAILABLE' : 'CHAT_ERROR',
      });
    } finally {
      res.end();
    }
  },
};
