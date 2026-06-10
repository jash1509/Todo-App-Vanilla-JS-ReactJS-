import React, { useEffect, useRef } from 'react';

export default function ConfirmModal({ isOpen, onConfirm, onCancel }) {
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Auto focus on the primary delete confirm action
      confirmBtnRef.current?.focus();
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onCancel();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target.classList.contains('modal-overlay')) {
          onCancel();
        }
      }}
    >
      <div className="modal-card">
        <div className="modal-header">
          <h3 id="modal-title" className="modal-title">Delete Task?</h3>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onCancel} 
            aria-label="Cancel deletion"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <p id="modal-desc">Are you sure you want to permanently delete this task? This action cannot be undone.</p>
        </div>
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            type="button" 
            id="modal-btn-confirm" 
            className="btn btn-danger" 
            ref={confirmBtnRef}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
