
import React, { useState, useRef } from 'react';
import { ChatMode } from '../types';
import { SendIcon, UploadIcon, BrainIcon, SearchIcon, MapIcon } from './Icons';

interface ChatInputProps {
  onSendMessage: (prompt: string, mode: ChatMode, image?: File) => void;
  isLoading: boolean;
}

interface ModeButtonProps {
  mode: ChatMode;
  currentMode: ChatMode;
  onClick: (mode: ChatMode) => void;
  icon: React.ReactNode;
  label: string;
}

const ModeButton: React.FC<ModeButtonProps> = ({ mode, currentMode, onClick, icon, label }) => {
  const isActive = mode === currentMode;
  return (
    <button
      onClick={() => onClick(mode)}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
        isActive ? 'bg-brand-blue text-white' : 'bg-brand-gray-700 text-brand-gray-300 hover:bg-brand-gray-600'
      }`}
      aria-label={`Switch to ${label} mode`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<{ file: File; previewUrl: string } | null>(null);
  const [mode, setMode] = useState<ChatMode>(ChatMode.CHAT);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if ((!prompt.trim() && !image) || isLoading) return;
    onSendMessage(prompt.trim(), mode, image?.file);
    setPrompt('');
    setImage(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage({ file, previewUrl: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="bg-brand-gray-900 px-4 py-3">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center gap-2 mb-3 flex-wrap">
          <ModeButton mode={ChatMode.CHAT} currentMode={mode} onClick={setMode} icon={<SendIcon className="w-4 h-4" />} label="Chat" />
          <ModeButton mode={ChatMode.THINKING} currentMode={mode} onClick={setMode} icon={<BrainIcon className="w-4 h-4" />} label="Thinking" />
          <ModeButton mode={ChatMode.SEARCH} currentMode={mode} onClick={setMode} icon={<SearchIcon className="w-4 h-4" />} label="Web Search" />
          <ModeButton mode={ChatMode.MAPS} currentMode={mode} onClick={setMode} icon={<MapIcon className="w-4 h-4" />} label="Local Search" />
        </div>
        <div className="bg-brand-gray-800 rounded-2xl p-2 flex items-end gap-2">
           {image && (
            <div className="relative p-2">
              <img src={image.previewUrl} alt="upload preview" className="w-16 h-16 rounded-lg object-cover"/>
              <button 
                onClick={() => {
                  setImage(null);
                  if(fileInputRef.current) fileInputRef.current.value = "";
                }} 
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold"
              >
                X
              </button>
            </div>
          )}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full bg-transparent text-brand-gray-100 placeholder-brand-gray-500 focus:outline-none resize-none px-2 py-3"
            rows={1}
            disabled={isLoading}
          />
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-full text-brand-gray-400 hover:bg-brand-gray-700 transition-colors disabled:opacity-50"
            disabled={isLoading}
            aria-label="Upload image"
          >
            <UploadIcon className="w-6 h-6" />
          </button>
          <button
            onClick={handleSend}
            className="p-3 rounded-full bg-brand-blue text-white disabled:bg-brand-gray-600 transition-colors"
            disabled={isLoading || (!prompt.trim() && !image)}
            aria-label="Send message"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
