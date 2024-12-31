import { render, fireEvent } from '@testing-library/react';
import { TodoItem } from '../components/TodoItem';
import { Todo } from '../types/todo';
import { describe, it, expect, vi } from 'vitest';

describe('TodoItemコンポーネント', () => {
  const mockTodo: Todo = {
    id: '1',
    text: 'テストタスク',
    completed: false,
  };

  it('タスクのテキストが正しく表示される', () => {
    const { getByText } = render(
      <TodoItem todo={mockTodo} onToggle={() => {}} onDelete={() => {}} />
    );
    expect(getByText('テストタスク')).toBeInTheDocument();
  });

  it('チェックボックスをクリックするとonToggleが呼ばれる', () => {
    const onToggle = vi.fn();
    const { getByRole } = render(
      <TodoItem todo={mockTodo} onToggle={onToggle} onDelete={() => {}} />
    );
    
    fireEvent.click(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('削除ボタンをクリックするとonDeleteが呼ばれる', () => {
    const onDelete = vi.fn();
    const { getByText } = render(
      <TodoItem todo={mockTodo} onToggle={() => {}} onDelete={onDelete} />
    );
    
    fireEvent.click(getByText('削除'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('完了状態のタスクは取り消し線が表示される', () => {
    const completedTodo: Todo = { ...mockTodo, completed: true };
    const { getByText } = render(
      <TodoItem todo={completedTodo} onToggle={() => {}} onDelete={() => {}} />
    );
    
    const textElement = getByText('テストタスク');
    expect(textElement).toHaveStyle({ textDecoration: 'line-through' });
  });
});