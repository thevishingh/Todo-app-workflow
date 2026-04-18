import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      onAdd(trimmed);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo..."
        className="todo-input"
      />
      <button type="submit" className="add-btn">
        <IoMdAdd size={20} /> Add
      </button>
    </form>
  );
}
