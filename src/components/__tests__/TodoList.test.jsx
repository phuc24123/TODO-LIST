import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoList from '../TodoList';
import { todoService } from '../../services/todoService';

// Mock todoService
jest.mock('../../services/todoService');

describe('TodoList Component', () => {
  const mockTasks = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    todoService.getTodos.mockResolvedValue(mockTasks);
  });

  test('renders todo list with tasks', async () => {
    render(<TodoList />);
    
    // Wait for tasks to be loaded
    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
  });

  test('adds a new task', async () => {
    const newTask = { id: 3, title: 'New Task', completed: false };
    todoService.addTodo.mockResolvedValue(newTask);

    render(<TodoList />);
    
    // Add new task
    const input = screen.getByPlaceholderText('Nhiệm vụ hôm nay là gì?');
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('Thêm mới'));

    await waitFor(() => {
      expect(todoService.addTodo).toHaveBeenCalledWith('New Task');
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  test('deletes a task', async () => {
    todoService.deleteTodo.mockResolvedValue(1);

    render(<TodoList />);
    
    // Wait for tasks to be loaded
    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
    });

    // Delete task
    const deleteButtons = screen.getAllByText('🗑️');
    fireEvent.click(deleteButtons[0]);

    // Confirm deletion
    const confirmButton = screen.getByText('OK');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(todoService.deleteTodo).toHaveBeenCalledWith(1);
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    });
  });

  test('toggles task completion', async () => {
    const updatedTask = { id: 1, title: 'Task 1', completed: true };
    todoService.toggleTodo.mockResolvedValue(updatedTask);

    render(<TodoList />);
    
    // Wait for tasks to be loaded
    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
    });

    // Toggle task completion
    const taskText = screen.getByText('Task 1');
    fireEvent.click(taskText);

    await waitFor(() => {
      expect(todoService.toggleTodo).toHaveBeenCalledWith(mockTasks[0]);
      expect(taskText).toHaveStyle('text-decoration: line-through');
    });
  });

  test('filters tasks', async () => {
    render(<TodoList />);
    
    // Wait for tasks to be loaded
    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    // Filter completed tasks
    fireEvent.click(screen.getByText('Đã hoàn thành'));

    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();

    // Filter active tasks
    fireEvent.click(screen.getByText('Chưa hoàn thành'));

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });

  test('shows error message when API fails', async () => {
    const errorMessage = 'API Error';
    todoService.getTodos.mockRejectedValue(new Error(errorMessage));

    render(<TodoList />);
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
}); 