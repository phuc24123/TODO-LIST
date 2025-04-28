import { useState, useEffect, useCallback, useMemo } from 'react';
import { todoService } from '../services/todoService';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'

  // Validation
  const validateTask = (title) => {
    if (!title.trim()) return 'Vui lòng nhập công việc';
    if (title.length > 100) return 'Công việc không được quá 100 ký tự';
    return null;
  };

  // Lấy danh sách công việc
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await todoService.getTodos();
      setTasks(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Thêm công việc mới
  const handleAddTask = async () => {
    const validationError = validateTask(newTask);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const newTaskData = await todoService.addTodo(newTask);
      setTasks(prevTasks => [...prevTasks, newTaskData]);
      setNewTask('');
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Xóa công việc
  const handleDeleteTask = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa công việc này?')) return;

    try {
      setLoading(true);
      await todoService.deleteTodo(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật công việc
  const handleUpdateTask = async () => {
    const validationError = validateTask(newTask);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const updatedTask = await todoService.updateTodo({ ...editingTask, title: newTask });
      setTasks(prevTasks => prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
      setNewTask('');
      setEditingTask(null);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Đánh dấu hoàn thành/chưa hoàn thành
  const handleToggleComplete = async (task) => {
    try {
      setLoading(true);
      const updatedTask = await todoService.toggleTodo(task);
      setTasks(prevTasks => prevTasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      editingTask ? handleUpdateTask() : handleAddTask();
    }
  };

  // Lọc công việc theo trạng thái
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'active':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <div className="todo-container">
      <h1>Những Việc Cần Làm! 🚀</h1>
      
      {error && <p className="error-message">{error}</p>}
      
      <div className="filter-container">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Tất cả
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Chưa hoàn thành
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Đã hoàn thành
        </button>
      </div>

      <div className="form-add-task">
        <input
          type="text"
          placeholder="Nhiệm vụ hôm nay là gì?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button 
          onClick={editingTask ? handleUpdateTask : handleAddTask}
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : (editingTask ? 'Cập nhật' : 'Thêm mới')}
        </button>
        {editingTask && (
          <button 
            className="cancel-btn" 
            onClick={() => { setEditingTask(null); setNewTask(''); }}
            disabled={loading}
          >
            Hủy
          </button>
        )}
      </div>

      {loading && <div className="loading">Đang tải...</div>}

      <div className="task-list">
        {filteredTasks.map((task) => (
          <div 
            className={`task-item ${task.completed ? 'completed' : ''} ${loading ? 'loading' : ''}`} 
            key={task.id}
          >
            <span 
              onClick={() => handleToggleComplete(task)} 
              style={{ cursor: 'pointer' }}
            >
              {task.title}
            </span>
            <div className="task-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setEditingTask(task);
                  setNewTask(task.title);
                }}
                disabled={loading}
              >
                ✏️
              </button>
              <button 
                className="delete-btn" 
                onClick={() => handleDeleteTask(task.id)}
                disabled={loading}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList; 