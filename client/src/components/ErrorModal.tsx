import React, { useEffect } from 'react';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>
            <i className="fas fa-exclamation-triangle"></i> Error
          </h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
