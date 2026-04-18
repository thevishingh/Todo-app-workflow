import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { MdClear } from 'react-icons/md';
import { MdChecklistRtl } from 'react-icons/md';
import '../styles/todos.css';

type FilterType = 'all' | 'active' | 'completed';

export function TodoApp() {
  const { todos, addTodo, toggleTodo, updateTodo, clearCompleted, isLoaded } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');

  if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  }

  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.filter(t => !t.completed).length;
  const hasCompleted = completedCount > 0;

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <header className="todo-header">
        <div className="header-icon">
          <MdChecklistRtl size={40} />
        </div>
        <h1>My Tasks</h1>
        <p className="subtitle">Stay organized and productive</p>
      </header>

      <main className="todo-main">
        <TodoForm onAdd={addTodo} />
        
        <div className="todo-tabs">
          <button 
            className={`tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button 
            className={`tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({activeCount})
          </button>
          <button 
            className={`tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>

        <TodoList 
          todos={filteredTodos}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
        />
        
        {hasCompleted && (
          <button onClick={clearCompleted} className="clear-btn">
            <MdClear size={18} /> Clear Completed ({completedCount})
          </button>
        )}
      </main>

      <footer className="todo-footer">
        <p>💾 All changes are saved automatically to local storage</p>
      </footer>
    </div>
  );
}
