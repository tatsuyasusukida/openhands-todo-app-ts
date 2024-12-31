import { useState } from 'react';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function TodoList() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [newTodoText, setNewTodoText] = useState('');

  const addTodo = (text: string) => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: text.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '1rem' }}>
      <h1>ToDo リスト</h1>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTodo(newTodoText);
            }
          }}
          placeholder="新しいタスクを入力..."
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button onClick={() => addTodo(newTodoText)}>追加</button>
      </div>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}