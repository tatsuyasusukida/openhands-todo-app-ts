import { render, fireEvent } from '@testing-library/react';
import { TodoList } from '../components/TodoList';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TodoListコンポーネント', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('新しいタスクを追加できる', () => {
    const { getByPlaceholderText, getByText } = render(<TodoList />);
    const input = getByPlaceholderText('新しいタスクを入力...');
    
    fireEvent.change(input, { target: { value: '新しいタスク' } });
    fireEvent.click(getByText('追加'));
    
    expect(getByText('新しいタスク')).toBeInTheDocument();
  });

  it('タスクを削除できる', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<TodoList />);
    const input = getByPlaceholderText('新しいタスクを入力...');
    
    fireEvent.change(input, { target: { value: '削除するタスク' } });
    fireEvent.click(getByText('追加'));
    
    const deleteButton = getByText('削除');
    fireEvent.click(deleteButton);
    
    expect(queryByText('削除するタスク')).not.toBeInTheDocument();
  });

  it('タスクの完了状態を切り替えられる', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<TodoList />);
    const input = getByPlaceholderText('新しいタスクを入力...');
    
    fireEvent.change(input, { target: { value: '完了するタスク' } });
    fireEvent.click(getByText('追加'));
    
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(checkbox).toBeChecked();
  });

  it('空のタスクは追加できない', () => {
    const { getByText, queryByRole } = render(<TodoList />);
    
    fireEvent.click(getByText('追加'));
    
    const checkboxes = queryByRole('checkbox');
    expect(checkboxes).not.toBeInTheDocument();
  });
});