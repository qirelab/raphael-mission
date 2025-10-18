const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Get API key from environment variables (works with both Vite and Create React App)
const getApiKey = () => {
  // For Vite
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_OPENROUTER_API_KEY;
  }
  // For Create React App (fallback)
  if (typeof process !== 'undefined' && process.env) {
    return process.env.REACT_APP_OPENROUTER_API_KEY;
  }
  return null;
};

const OPENROUTER_API_KEY = getApiKey();

const openRouterService = {
  async sendMessage(messages, customRules = [], language = 'ru') {
    if (!OPENROUTER_API_KEY) {
      throw new Error(
        'OpenRouter API key not found. Please set VITE_OPENROUTER_API_KEY (for Vite) or REACT_APP_OPENROUTER_API_KEY (for Create React App) in your environment variables.'
      );
    }

    // Build system prompt with custom rules based on language
    let systemPrompt = '';

    if (language === 'en') {
      systemPrompt = `You are Casper AI - assistant for Raphael Mission Christian mission.

Your role:
- Help website visitors get information about the mission
- Answer questions about projects, programs and mission activities
- Be friendly, professional and helpful
- Speak in English
- If you don't know the answer, suggest contacting the mission directly

Information about Raphael Mission:
- Christian mission engaged in evangelism
- Projects: clean water, healing ministry, personal evangelism, social projects, tent evangelism
- Training and development programs
- Helping those in need

Answer briefly, to the point and friendly.`;
    } else if (language === 'pl') {
      systemPrompt = `Jesteś Casper AI - asystentem chrześcijańskiej misji Raphael Mission.

Twoja rola:
- Pomagać odwiedzającym stronę uzyskać informacje o misji
- Odpowiadać na pytania o projekty, programy i działalność misji
- Być przyjaznym, profesjonalnym i pomocnym
- Mówić po polsku
- Jeśli nie znasz odpowiedzi, sugeruj bezpośredni kontakt z misją

Informacje o misji Raphael:
- Chrześcijańska misja zajmująca się ewangelizacją
- Projekty: czysta woda, służba uzdrawiająca, osobista ewangelizacja, projekty społeczne, ewangelizacja namiotowa
- Programy szkoleniowe i rozwojowe
- Pomoc potrzebującym

Odpowiadaj krótko, na temat i przyjaźnie.`;
    } else {
      // Russian (default)
      systemPrompt = `Ты Casper AI - помощник христианской миссии Raphael Mission. 

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
    }

    // Add custom rules if any
    if (customRules && customRules.length > 0) {
      systemPrompt += `\n\nДополнительные правила, которые ты должен соблюдать:\n${customRules.map((rule) => `- ${rule}`).join('\n')}`;
    }

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
  getFallbackResponse(userMessage, language = 'ru') {
    const message = userMessage.toLowerCase();

    if (language === 'en') {
      if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return 'Hello! Great to see you! How are you?';
      } else if (message.includes('help') || message.includes('assist')) {
        return 'Of course! I can help you with:\n• Mission information\n• Projects and programs\n• Contact information\n• General questions\n\nWhat specifically interests you?';
      } else if (message.includes('mission') || message.includes('about mission')) {
        return 'Raphael Mission is a Christian mission engaged in:\n• Evangelism\n• Social projects\n• Training and development\n• Helping those in need\n\nWould you like to know more about a specific area?';
      } else if (message.includes('project') || message.includes('projects')) {
        return 'We have several projects:\n• Clean water\n• Healing ministry\n• Personal evangelism\n• Social projects\n• Tent evangelism\n\nWhich project interests you?';
      } else if (message.includes('contact') || message.includes('reach')) {
        return 'You can contact us:\n• By phone: +1 (555) 123-4567\n• By email: info@raphaelmission.org\n• Through the contact form on the website\n\nDo you have a specific question?';
      } else if (message.includes('thank') || message.includes('thanks')) {
        return "You're welcome! Always happy to help. Any other questions?";
      } else if (message.includes('bye') || message.includes('goodbye')) {
        return 'Goodbye! Blessings to you! If you need help - just ask!';
      } else {
        const responses = [
          'Interesting question! Can I help you with something specific?',
          'Hmm, let me think... Maybe you could tell me more?',
          'Good question! Try asking about our projects or mission.',
          "I'm here to help! Ask a question about Raphael Mission.",
          "I'm not quite sure, but I'm ready to help! What interests you?",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    } else if (language === 'pl') {
      if (message.includes('cześć') || message.includes('witaj') || message.includes('hej')) {
        return 'Cześć! Miło cię widzieć! Jak się masz?';
      } else if (message.includes('pomoc') || message.includes('pomóż')) {
        return 'Oczywiście! Mogę pomóc ci z:\n• Informacjami o misji\n• Projektami i programami\n• Informacjami kontaktowymi\n• Ogólnymi pytaniami\n\nCo konkretnie cię interesuje?';
      } else if (message.includes('misja') || message.includes('o misji')) {
        return 'Raphael Mission to chrześcijańska misja zajmująca się:\n• Ewangelizacją\n• Projektami społecznymi\n• Szkoleniami i rozwojem\n• Pomocą potrzebującym\n\nChcesz dowiedzieć się więcej o konkretnym obszarze?';
      } else if (message.includes('projekt') || message.includes('projekty')) {
        return 'Mamy kilka projektów:\n• Czysta woda\n• Służba uzdrawiająca\n• Osobista ewangelizacja\n• Projekty społeczne\n• Ewangelizacja namiotowa\n\nKtóry projekt cię interesuje?';
      } else if (message.includes('kontakt') || message.includes('skontaktować')) {
        return 'Możesz się z nami skontaktować:\n• Telefonicznie: +1 (555) 123-4567\n• Emailem: info@raphaelmission.org\n• Przez formularz kontaktowy na stronie\n\nMasz konkretne pytanie?';
      } else if (message.includes('dziękuję') || message.includes('dzięki')) {
        return 'Proszę! Zawsze chętnie pomogę. Masz jeszcze pytania?';
      } else if (message.includes('pa') || message.includes('do widzenia')) {
        return 'Do widzenia! Błogosławieństw! Jeśli będziesz potrzebować pomocy - pytaj!';
      } else {
        const responses = [
          'Interesujące pytanie! Mogę ci pomóc z czymś konkretnym?',
          'Hmm, daj mi pomyśleć... Może opowiesz więcej?',
          'Dobre pytanie! Spróbuj zapytać o nasze projekty lub misję.',
          'Jestem tu, żeby pomóc! Zadaj pytanie o misję Raphael.',
          'Nie jestem pewien, ale jestem gotowy pomóc! Co cię interesuje?',
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    } else {
      // Russian (default)
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
    }
  },
};

export default openRouterService;
