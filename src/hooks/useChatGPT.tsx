import { useState } from 'react';
import axios from 'axios';

interface Message {
  type: 'user' | 'ai';
  content: string;
}

interface ChatGPTProps {
  prompt: string;
  inputText: string;
}

const useChatGPT = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async ({ prompt, inputText }: ChatGPTProps) => {
    setMessages([...messages, { type: 'user', content: inputText }]);
    setIsLoading(true);
    try {
      const response = await axios.post<{ choices: { text: string }[] }>(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: prompt,
          max_tokens: 750,
          n: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
      const aiMessage = response.data.choices[0].text.trim();
      setMessages([...messages, { type: 'ai', content: aiMessage }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
    setIsLoading(false);
  };

  return { messages, handleSendMessage, isLoading };
};

export { useChatGPT };
