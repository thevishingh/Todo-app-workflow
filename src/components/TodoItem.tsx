import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import type { Todo } from '../hooks/useTodos';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed) {
      onUpdate(todo.id, trimmed);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="todo-item editing">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="edit-input"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
        />
        <div className="edit-actions">
          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={handleCancel} className="cancel-btn">Cancel</button>
        </div>
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      <span 
        className="todo-text"
        onDoubleClick={() => setIsEditing(true)}
      >
        {todo.text}
      </span>
      <div className="todo-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="edit-btn"
          title="Edit"
        >
          <FiEdit2 size={18} />
        </button>
      </div>
    </li>
  );
}
