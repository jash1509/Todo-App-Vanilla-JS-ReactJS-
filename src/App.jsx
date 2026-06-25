import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import TodoForm from './components/TodoForm';
import TodoToolbar from './components/TodoToolbar';
import TodoList from './components/TodoList';
import ConfirmModal from './components/ConfirmModal';
import ToastManager from './components/ToastManager';
import './App.css';

export default function App() {
  // ==========================================================================
  // APPLICATION STATE
  // ==========================================================================
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('taskflow_todos_react');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading react todos:", e);
      }
    }
    // Seed default welcoming data if empty
    return [
      {
        id: 1,
        text: "Welcome to TaskFlow! Try editing this task by double-clicking it.",
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        text: "You can filter tasks, search dynamically, and sort by date or text.",
        completed: true,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      }
    ];
  });

  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [todoToDeleteId, setTodoToDeleteId] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');

  // Set date once on mount
  useEffect(() => {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    setFormattedDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('taskflow_todos_react', JSON.stringify(todos));
  }, [todos]);

  // ==========================================================================
  // SYSTEM TOASTS SYSTEM
  // ==========================================================================
  const triggerToast = (message, type = 'info') => {
    const newToast = {
      id: Date.now() + Math.random(),
      message,
      type
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ==========================================================================
  // CRUD CONTROLLERS
  // ==========================================================================
  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now() + Math.random(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos((prev) => [newTodo, ...prev]);
    triggerToast("Task added successfully!", "success");
  };

  const handleToggleTodo = (id) => {
    setEditingId(null); // Cancel edit
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.completed;
          triggerToast(`Task marked as ${nextState ? 'completed' : 'pending'}.`, "info");
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const handleSaveEdit = (id, newText) => {
    const cleanText = newText.trim();
    if (cleanText.length === 0) {
      triggerToast("Edit cancelled. Task name cannot be empty.", "danger");
      setEditingId(null);
      return;
    }

    const isDuplicate = todos.some(
      (t) => t.id !== id && t.text.toLowerCase() === cleanText.toLowerCase()
    );
    if (isDuplicate) {
      triggerToast("Duplicate task name detected. Reverting changes.", "danger");
      setEditingId(null);
      return;
    }

    setTodos((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          if (t.text !== cleanText) {
            triggerToast("Task updated.", "success");
            return { ...t, text: cleanText };
          }
        }
        return t;
      })
    );
    setEditingId(null);
  };

  const handleDeleteTrigger = (id) => {
    setTodoToDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    if (todoToDeleteId !== null) {
      // Find element to add a deleting fade class or do standard delete
      // Since react renders lists immediately, we can delete it directly.
      setTodos((prev) => prev.filter((t) => t.id !== todoToDeleteId));
      triggerToast("Task deleted.", "info");
    }
    setTodoToDeleteId(null);
  };

  const handleClearCompleted = () => {
    const originalCount = todos.length;
    const activeTodos = todos.filter((t) => !t.completed);
    const cleared = originalCount - activeTodos.length;
    
    setTodos(activeTodos);
    triggerToast(`Cleared ${cleared} completed task(s).`, "success");
  };

  // ==========================================================================
  // DATA TRANSFORM PROCESSING
  // ==========================================================================
  // 1. Filter
  let processedTodos = todos;
  if (currentFilter === 'pending') {
    processedTodos = processedTodos.filter((t) => !t.completed);
  } else if (currentFilter === 'completed') {
    processedTodos = processedTodos.filter((t) => t.completed);
  }

  // 2. Search query filter
  const query = searchQuery.trim().toLowerCase();
  if (query.length > 0) {
    processedTodos = processedTodos.filter((t) =>
      t.text.toLowerCase().includes(query)
    );
  }

  // 3. Sort
  processedTodos = [...processedTodos].sort((a, b) => {
    if (currentSort === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (currentSort === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (currentSort === 'alpha-asc') {
      return a.text.localeCompare(b.text);
    }
    if (currentSort === 'alpha-desc') {
      return b.text.localeCompare(a.text);
    }
    return 0;
  });

  // Analytics counts
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className="app-container">
      {/* GLOW DECORATOR */}
      <div className="app-background-glow"></div>

      {/* HEADER */}
      <header className="app-header">
        <div className="header-logo">
          <div className="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <div>
            <h1 className="app-title">TaskFlow</h1>
            <p className="app-subtitle">Elevate your daily rhythm</p>
          </div>
        </div>
        <div className="header-date" aria-label="Current Date">
          <span className="calendar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
          </span>
          <span>{formattedDate}</span>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="app-main">
        {/* ANALYTICS DASHBOARD */}
        <Dashboard 
          total={totalCount} 
          pending={pendingCount} 
          completed={completedCount} 
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />

        {/* TASK MANAGEMENT CARD */}
        <section className="task-manager-card" aria-label="Task Management Console">
          {/* Form */}
          <TodoForm onAddTodo={handleAddTodo} todos={todos} />

          {/* Search/Sort/Filters Toolbar */}
          <TodoToolbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
            counts={{
              all: totalCount,
              pending: pendingCount,
              completed: completedCount
            }}
            onClearCompleted={handleClearCompleted}
          />

          {/* Lists */}
          <TodoList 
            filteredTodos={processedTodos}
            searchQuery={searchQuery}
            currentFilter={currentFilter}
            onToggle={handleToggleTodo}
            onDeleteClick={handleDeleteTrigger}
            onSaveEdit={handleSaveEdit}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>Double-click a task text or click edit icon to make inline updates.</p>
        <p>TaskFlow Dashboard &copy; 2026. Made with React.js &amp; Vanilla CSS.</p>
      </footer>

      {/* TOAST SYSTEM */}
      <ToastManager toasts={toasts} removeToast={removeToast} />

      {/* DELETION CONFIRMATION MODAL */}
      <ConfirmModal 
        isOpen={todoToDeleteId !== null} 
        onConfirm={handleDeleteConfirm} 
        onCancel={() => setTodoToDeleteId(null)} 
      />
    </div>
  );
}
