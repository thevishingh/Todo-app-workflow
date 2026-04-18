import type { Todo } from '../hooks/useTodos';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export function TodoList({ todos, onToggle, onUpdate }: TodoListProps) {
  const completed = todos.filter(t => t.completed).length;
  const total = todos.length;

  if (total === 0) {
    return <div className="empty-state">No todos yet. Add one to get started! 🚀</div>;
  }

  return (
    <div className="todo-list-container">
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
      <div className="todo-stats">
        <span>{completed} of {total} completed</span>
      </div>
    </div>
  );
}
