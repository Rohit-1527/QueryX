
export enum MessageAuthor {
  USER = 'user',
  AI = 'ai',
  SYSTEM = 'system',
}

export enum ChatMode {
  CHAT = 'chat',
  THINKING = 'thinking',
  SEARCH = 'search',
  MAPS = 'maps',
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface Message {
  id: string;
  author: MessageAuthor;
  text: string;
  imagePreviewUrl?: string;
  sources?: GroundingSource[];
}
