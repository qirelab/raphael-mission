const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

const openRouterService = {
  async sendMessage(messages, onStream) {
    if (!OPENROUTER_API_KEY) {
      throw new Error(
        'OpenRouter API key not found. Please set REACT_APP_OPENROUTER_API_KEY in your environment variables.'
      );
    }

    const systemPrompt = `Ты Casper AI - помощник христианской миссии Raphael Mission. 

Твоя роль:
- Помогать посетителям сайта получить информацию о миссии
- Отвечать на вопросы о проектах, программах и деятельности миссии
- Быть дружелюбным, профессиональным и полезным
- Говорить на русском языке
- Если не знаешь ответа, предлагай связаться с миссией напрямую

Информация о миссии Raphael:
- Христианская миссия, занимающаяся евангелизацией
- Проекты: чистая вода, исцеляющее служение, личная евангелизация, социальные проекты, палаточная евангелизация
- Программы обучения и развития
- Помощь нуждающимся

Отвечай кратко, по делу и дружелюбно.`;

    const requestBody = {
      model: 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.7,
      stream: false,
    };

    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Raphael Mission Chat Bot',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `OpenRouter API error: ${response.status} - ${errorData.error?.message || response.statusText}`
        );
      }

      const data = await response.json();

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from OpenRouter API');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      throw error;
    }
  },

  // Fallback responses if API fails
  getFallbackResponse(userMessage) {
    const message = userMessage.toLowerCase();

    if (message.includes('привет') || message.includes('здравствуй')) {
      return 'Привет! Рад вас видеть! Как дела?';
    } else if (message.includes('помощь') || message.includes('помоги')) {
      return 'Конечно! Я могу помочь вам с:\n• Информацией о миссии\n• Проектами и программами\n• Контактной информацией\n• Общими вопросами\n\nЧто именно вас интересует?';
    } else if (message.includes('миссия') || message.includes('о миссии')) {
      return 'Raphael Mission - это христианская миссия, занимающаяся:\n• Евангелизацией\n• Социальными проектами\n• Обучением и развитием\n• Помощью нуждающимся\n\nХотите узнать больше о конкретном направлении?';
    } else if (message.includes('проект') || message.includes('проекты')) {
      return 'У нас есть несколько проектов:\n• Чистая вода\n• Исцеляющее служение\n• Личная евангелизация\n• Социальные проекты\n• Палаточная евангелизация\n\nКакой проект вас интересует?';
    } else if (message.includes('контакт') || message.includes('связаться')) {
      return 'С нами можно связаться:\n• По телефону: +1 (555) 123-4567\n• По email: info@raphaelmission.org\n• Через форму обратной связи на сайте\n\nЕсть конкретный вопрос?';
    } else if (message.includes('спасибо') || message.includes('благодарю')) {
      return 'Пожалуйста! Всегда рад помочь. Есть еще вопросы?';
    } else if (message.includes('пока') || message.includes('до свидания')) {
      return 'До свидания! Благословений вам! Если понадобится помощь - обращайтесь!';
    } else {
      const responses = [
        'Интересный вопрос! Могу ли я помочь вам с чем-то конкретным?',
        'Хм, дайте мне подумать... Может, расскажете подробнее?',
        'Хороший вопрос! Попробуйте спросить о наших проектах или миссии.',
        'Я здесь, чтобы помочь! Задайте вопрос о миссии Raphael.',
        'Не совсем понял, но я готов помочь! Что вас интересует?',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  },
};

export default openRouterService;
