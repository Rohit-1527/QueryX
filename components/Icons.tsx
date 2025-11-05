
import React from 'react';

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
  </svg>
);

export const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15.5c-2.49 0-4.5-2.01-4.5-4.5S8.01 8.5 10.5 8.5c1.45 0 2.73.71 3.54 1.78.3.39.82.53 1.28.34.46-.19.78-.63.78-1.12 0-1.38-1.12-2.5-2.5-2.5-1.18 0-2.19.82-2.45 1.92-.15.63-.71 1.08-1.37 1.08-1.24 0-2.25-1.01-2.25-2.25s1.01-2.25 2.25-2.25c.67 0 1.25.29 1.67.75.14.15.35.25.56.25s.42-.1.56-.25c.42-.46 1-.75 1.67-.75 1.24 0 2.25 1.01 2.25 2.25 0 .63-.22 1.21-.6 1.67-.15.18-.23.41-.23.64 0 .34.17.65.44.83.56.36 1.25.13 1.58-.42C18.42 12.83 19 11.48 19 10c0-3.87-3.13-7-7-7S5 6.13 5 10c0 2.44 1.26 4.6 3.2 5.88.58.38 1.34.2 1.64-.38.3-.58.1-1.34-.38-1.64C8.25 13.13 7.5 11.64 7.5 10c0-2.49 2.01-4.5 4.5-4.5s4.5 2.01 4.5 4.5c0 1.15-.43 2.2-1.16 3.01-.4.44-.64 1.03-.64 1.66 0 1.38 1.12 2.5 2.5 2.5.46 0 .89-.13 1.26-.36.43-.26.96-.21 1.34.1.38.31.6.76.6 1.26 0 2.49-2.01 4.5-4.5 4.5z" />
  </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

export const MapIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
  </svg>
);
