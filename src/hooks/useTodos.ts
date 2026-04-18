// import { useState, useEffect } from 'react';

// export interface Todo {
//   id: string;
//   text: string;
//   completed: boolean;
//   createdAt: number;
// }

// const STORAGE_KEY = 'todos';

// export function useTodos() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [isLoaded, setIsLoaded] = useState(false);

//   // Load todos from localStorage on mount
//   useEffect(() => {
//     const stored = localStorage.getItem(STORAGE_KEY);
//     if (stored) {
//       try {
//         setTodos(JSON.parse(stored));
//       } catch (error) {
//         console.error('Failed to parse todos from localStorage:', error);
//       }
//     }
//     setIsLoaded(true);
//   }, []);

//   // Save todos to localStorage whenever they change
//   useEffect(() => {
//     if (isLoaded) {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
//     }
//   }, [todos, isLoaded]);

//   const addTodo = (text: string) => {
//     const newTodo: Todo = {
//       id: Date.now().toString(),
//       text,
//       completed: false,
//       createdAt: Date.now(),
//     };
//     setTodos([newTodo, ...todos]);
//   };

//   const deleteTodo = (id: string) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   const toggleTodo = (id: string) => {
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ));
//   };

//   const updateTodo = (id: string, text: string) => {
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, text } : todo
//     ));
//   };

//   const clearCompleted = () => {
//     setTodos(todos.filter(todo => !todo.completed));
//   };

//   return {
//     todos,
//     addTodo,
//     deleteTodo,
//     toggleTodo,
//     updateTodo,
//     clearCompleted,
//     isLoaded,
//   };
// }


import { useState, useEffect } from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = 'todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return [];

    try {
      return JSON.parse(stored) as Todo[];
    } catch (error) {
      console.error('Failed to parse todos from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id: string, text: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
    clearCompleted,
  };
}