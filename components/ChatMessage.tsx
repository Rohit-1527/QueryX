
import React from 'react';
import { Message, MessageAuthor, GroundingSource } from '../types';

interface ChatMessageProps {
  message: Message;
}

const GroundingSources: React.FC<{ sources: GroundingSource[] }> = ({ sources }) => {
  if (sources.length === 0) return null;

  return (
    <div className="mt-2 pt-2 border-t border-brand-gray-700">
      <h4 className="text-xs font-semibold text-brand-gray-400 mb-1">Sources:</h4>
      <ul className="list-disc list-inside text-sm space-y-1">
        {sources.map((source, index) => (
          <li key={index}>
            <a
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue hover:underline"
            >
              {source.title || new URL(source.uri).hostname}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};


export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.author === MessageAuthor.USER;

  const containerClasses = `flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`;
  const bubbleClasses = `max-w-xl p-4 rounded-2xl ${
    isUser
      ? 'bg-brand-blue text-white rounded-br-none'
      : 'bg-brand-gray-800 text-brand-gray-100 rounded-bl-none'
  }`;

  return (
    <div className={containerClasses}>
      <div className={bubbleClasses}>
        {message.imagePreviewUrl && (
          <img src={message.imagePreviewUrl} alt="upload preview" className="rounded-lg mb-2 max-h-64" />
        )}
        <p className="whitespace-pre-wrap">{message.text}</p>
        {message.sources && <GroundingSources sources={message.sources} />}
      </div>
    </div>
  );
};
