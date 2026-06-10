import React, { useState, useEffect, useRef } from 'react';

export default function TodoItem({
  todo,
  onToggle,
  onDeleteClick,
  onSaveEdit,
  isEditing,
  setEditingId,
  searchQuery
}) {
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      setEditText(todo.text);
      // Auto focus and place cursor at end
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const val = inputRef.current.value;
          inputRef.current.value = '';
          inputRef.current.value = val;
        }
      }, 0);
    }
  }, [isEditing, todo.text]);

  const handleSave = () => {
    onSaveEdit(todo.id, editText);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleDoubleClick = () => {
    if (!todo.completed) {
      setEditingId(todo.id);
    }
  };

  const handleTextKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!todo.completed) {
        setEditingId(todo.id);
      }
    }
  };

  // Safe react highlight matching term replacer
  const highlightMatches = (text, query) => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return text;
    
    const escapedQuery = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === cleanQuery.toLowerCase() ? (
            <span key={index} className="highlight">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const createdDate = new Date(todo.createdAt);
  const formatOptions = { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' };
  const formattedTime = createdDate.toLocaleString('en-US', formatOptions);

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`} data-id={todo.id}>
      <div className="todo-item-left">
        <label className="custom-checkbox-wrapper" aria-label={`Mark task ${todo.completed ? 'pending' : 'completed'}`}>
          <input 
            type="checkbox" 
            className="todo-checkbox" 
            checked={todo.completed} 
            onChange={() => onToggle(todo.id)}
          />
          <span className="checkbox-display">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </span>
        </label>

        {isEditing ? (
          <div className="todo-details">
            <input 
              type="text" 
              className="todo-edit-input" 
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              maxLength="120" 
              aria-label="Edit task name"
            />
            <span className="edit-instructions">Press Enter to save • Esc to cancel</span>
          </div>
        ) : (
          <div className="todo-details">
            <span 
              className="todo-text" 
              tabIndex={todo.completed ? -1 : 0} 
              onDoubleClick={handleDoubleClick}
              onKeyDown={handleTextKeyDown}
            >
              {highlightMatches(todo.text, searchQuery)}
            </span>
            <span className="todo-meta">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Created {formattedTime}
            </span>
          </div>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button 
              className="action-btn save-btn" 
              onClick={handleSave} 
              aria-label="Save task changes" 
              title="Save"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </button>
            <button 
              className="action-btn cancel-btn" 
              onClick={handleCancel} 
              aria-label="Cancel task edit" 
              title="Cancel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <button 
              className="action-btn edit-btn" 
              onClick={() => setEditingId(todo.id)} 
              disabled={todo.completed}
              aria-label="Edit task" 
              title="Edit text"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
            </button>
            <button 
              className="action-btn delete-btn" 
              onClick={() => onDeleteClick(todo.id)} 
              aria-label="Delete task" 
              title="Remove task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </>
        )}
      </div>
    </li>
  );
}
