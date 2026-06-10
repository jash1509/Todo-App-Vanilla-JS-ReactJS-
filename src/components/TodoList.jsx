import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({
  filteredTodos,
  searchQuery,
  currentFilter,
  onToggle,
  onDeleteClick,
  onSaveEdit,
  editingId,
  setEditingId
}) {
  if (filteredTodos.length === 0) {
    let emptyTitle = "No tasks found";
    let emptyDesc = "Get started by adding a task in the console above.";

    if (searchQuery.trim().length > 0) {
      emptyTitle = "No matching tasks found";
      emptyDesc = "Try adjusting your search query terms.";
    } else if (currentFilter !== 'all') {
      emptyTitle = `No ${currentFilter} tasks`;
      emptyDesc = `There are no items currently marked as ${currentFilter}.`;
    }

    return (
      <div className="empty-state-container">
        <div className="empty-state-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-.621-.504-1.125-1.125-1.125H9.75M8.25 21h8.25a2.25 2.25 0 0 0 2.25-2.25V5.75A2.25 2.25 0 0 0 16.5 3.5h-8.25A2.25 2.25 0 0 0 6 5.75v13a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <h3 className="empty-state-title">{emptyTitle}</h3>
        <p className="empty-state-desc">{emptyDesc}</p>
      </div>
    );
  }

  return (
    <ul id="todo-list" className="todo-list-container">
      {filteredTodos.map((todo) => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDeleteClick={onDeleteClick}
          onSaveEdit={onSaveEdit}
          isEditing={editingId === todo.id}
          setEditingId={setEditingId}
          searchQuery={searchQuery}
        />
      ))}
    </ul>
  );
}
