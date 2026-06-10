import React, { useEffect } from 'react';

export default function ToastManager({ toasts, removeToast }) {
  return (
    <div className="toast-container" aria-live="assertive">
      {toasts.map((toast) => (
        <ToastItem 
          key={toast.id} 
          toast={toast} 
          onClose={() => removeToast(toast.id)} 
        />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }) {
  const [isRemoving, setIsRemoving] = React.useState(false);

  useEffect(() => {
    // Auto remove after 3s
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsRemoving(true);
  };

  const handleAnimationEnd = (e) => {
    // Only remove from parent after exit animation finishes
    if (isRemoving && e.animationName === 'slideOutRight') {
      onClose();
    }
  };

  let iconMarkup = null;
  if (toast.type === 'success') {
    iconMarkup = (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    );
  } else if (toast.type === 'danger') {
    iconMarkup = (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    );
  } else {
    iconMarkup = (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 1 1 1.063 1.063L12 13.5h-.75V12h.75v-.02a.75.75 0 0 0-.75-.75h-.008v-.008H12v.008Zm0-3h.008v.008H12V8.25Zm0 2.25h.008v.008H12v-.008ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    );
  }

  return (
    <div 
      className={`toast toast-${toast.type} ${isRemoving ? 'removing' : ''}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <span className="toast-icon">{iconMarkup}</span>
      <span className="toast-message">{toast.message}</span>
      <button 
        type="button" 
        className="toast-close-btn" 
        onClick={handleClose} 
        aria-label="Dismiss notification"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
