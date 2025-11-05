import React, { useState, useEffect, useRef } from 'react';
import { Message, MessageAuthor, ChatMode } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { runGemini } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      author: MessageAuthor.AI,
      text: "Hello! I'm QueryX, your personal AI assistant. How can I help you today? You can ask me questions, upload an image for analysis, or use the modes below for specific tasks.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (prompt: string, mode: ChatMode, image?: File) => {
    setIsLoading(true);
    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      author: MessageAuthor.USER,
      text: prompt,
      imagePreviewUrl: image ? URL.createObjectURL(image) : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);

    let location: GeolocationPosition | undefined;
    if (mode === ChatMode.MAPS) {
        try {
            location = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
            });
        } catch (geoError) {
             const systemMessage: Message = {
                id: `${Date.now()}-geo-error`,
                author: MessageAuthor.SYSTEM,
                text: "Could not get your location. For best results with Local Search, please enable location services.",
            };
            setMessages(prev => [...prev, systemMessage]);
        }
    }

    const response = await runGemini(prompt, mode, image, location);

    const aiMessage: Message = {
      id: `${Date.now()}-ai`,
      author: MessageAuthor.AI,
      text: response.text,
      sources: response.sources,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-screen bg-brand-gray-900 text-white flex flex-col font-sans">
      <header className="p-4 text-center border-b border-brand-gray-700">
        <h1 className="text-2xl font-bold text-brand-gray-100">QueryX</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
             <div className="flex items-start gap-3 my-4 justify-start">
              <div className="max-w-xl p-4 rounded-2xl bg-brand-gray-800 text-brand-gray-100 rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="border-t border-brand-gray-700">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default App;