import { useState } from 'react';
import axios from 'axios';

interface Response {
  content: string;
}

interface ChatGPTProps {
  prompt: string;
}

const useChatGPT = () => {
  const [response, setResponse] = useState<Response>({ content: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async ({ prompt }: ChatGPTProps) => {
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
      setResponse({ content: aiMessage });
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
    setIsLoading(false);
  };

  return { response, handleSendMessage, isLoading };
};

export { useChatGPT };