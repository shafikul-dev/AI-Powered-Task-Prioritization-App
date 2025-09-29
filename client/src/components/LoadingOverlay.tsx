import React from 'react';
import { createPortal } from 'react-dom';

export const LoadingOverlay: React.FC<{ text?: string }> = ({ text = 'AI is analyzing your tasks...' }) => {
  return createPortal(
    <div className="loading-overlay" role="status" aria-live="polite" aria-busy="true">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>,
    document.body
  );
};
