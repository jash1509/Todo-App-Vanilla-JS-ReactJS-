import React, { useState, useEffect } from 'react';

export default function TodoForm({ onAddTodo, todos }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanText = inputValue.trim();

    if (cleanText.length === 0) {
      setError("Task content cannot be empty.");
      return;
    }

    const isDuplicate = todos.some(
      (t) => t.text.toLowerCase() === cleanText.toLowerCase()
    );

    if (isDuplicate) {
      setError("A task with this exact name already exists.");
      return;
    }

    onAddTodo(cleanText);
    setInputValue('');
    setError(null);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (error) {
      setError(null); // Clear error on typing
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form-wrapper" novalidate="novalidate">
      <div className="input-group">
        <input 
          type="text" 
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new task..." 
          maxLength="120"
          autoComplete="off"
          aria-label="New Task Input"
          required
        />
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={inputValue.trim().length === 0}
          aria-label="Add Task"
        >
          <span className="btn-text">Add Task</span>
          <span className="btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </span>
        </button>
      </div>
      
      {error && (
        <div className="error-banner" role="alert" aria-live="polite">
          <span className="error-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </span>
          <span className="error-text">{error}</span>
          <button 
            type="button" 
            className="error-close-btn" 
            onClick={() => setError(null)} 
            aria-label="Dismiss error"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </form>
  );
}
