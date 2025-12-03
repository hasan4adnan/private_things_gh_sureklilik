import { useState, useCallback, useMemo } from 'react';
import './TodoList.css';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

export default function TodoList() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const addTodo = useCallback(() => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue('');
    }
  }, [inputValue, setTodos]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  }, [addTodo]);

  const toggleTodo = useCallback((id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  const deleteTodo = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  }, [setTodos]);

  const completedCount = useMemo(() => 
    todos.filter(t => t.completed).length, 
    [todos]
  );
  const totalCount = useMemo(() => todos.length, [todos]);

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>📝 Todo List</h2>
        <div className="todo-stats">
          {totalCount > 0 && (
            <span className="stat-badge">
              {completedCount}/{totalCount} tamamlandı
            </span>
          )}
        </div>
      </div>

      <div className="todo-input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="Yeni görev ekle..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="todo-add-btn" onClick={addTodo}>
          ➕ Ekle
        </button>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="todo-empty">
            <p>Henüz görev yok. Bir görev ekleyerek başla! 🚀</p>
          </div>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <button
                className="todo-delete-btn"
                onClick={() => deleteTodo(todo.id)}
                aria-label="Sil"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

