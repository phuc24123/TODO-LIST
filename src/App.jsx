/**
 * ỨNG DỤNG TODO LIST SỬ DỤNG REACT VÀ JSON SERVER
 * Tích hợp React Router cho đa trang
 * Chức năng: Thêm, sửa, xóa, đánh dấu hoàn thành công việc với dữ liệu lưu trên JSON Server
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

// Component TodoList: Trang chính hiển thị danh sách công việc
function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState(null);

  // Lấy danh sách công việc từ API
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3001/todos');
      if (!response.ok) throw new Error('Không thể kết nối tới JSON Server');
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (error) {
      setError('Không thể tải danh sách công việc. Vui lòng kiểm tra JSON Server.');
    }
  };

  // Thêm công việc mới
  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask, completed: false }),
      });
      if (!response.ok) throw new Error('Không thể thêm công việc');
      const newTaskData = await response.json();
      setTasks([...tasks, newTaskData]);
      setNewTask('');
      setError(null);
    } catch (error) {
      setError('Không thể thêm công việc. Vui lòng thử lại.');
    }
  };

  // Xóa công việc
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Không thể xóa công việc');
      setTasks(tasks.filter(task => task.id !== id));
      setError(null);
    } catch (error) {
      setError('Không thể xóa công việc. Vui lòng thử lại.');
    }
  };

  // Cập nhật công việc
  const handleUpdateTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await fetch(`http://localhost:3001/todos/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingTask, title: newTask }),
      });
      if (!response.ok) throw new Error('Không thể cập nhật công việc');
      const updatedTask = await response.json();
      setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
      setNewTask('');
      setEditingTask(null);
      setError(null);
    } catch (error) {
      setError('Không thể cập nhật công việc. Vui lòng thử lại.');
    }
  };

  // Đánh dấu công việc hoàn thành/chưa hoàn thành
  const handleToggleComplete = async (task) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });
      if (!response.ok) throw new Error('Không thể cập nhật trạng thái công việc');
      const updatedTask = await response.json();
      setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      setError(null);
    } catch (error) {
      setError('Không thể cập nhật trạng thái công việc. Vui lòng thử lại.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      editingTask ? handleUpdateTask() : handleAddTask();
    }
  };

  return (
    <div className="todo-container">
      <h1>Những Việc Cần Làm! 🚀</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="form-add-task">
        <input
          type="text"
          placeholder="Nhiệm vụ hôm nay là gì?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={editingTask ? handleUpdateTask : handleAddTask}>
          {editingTask ? 'Cập nhật' : 'Thêm mới'}
        </button>
        {editingTask && (
          <button className="cancel-btn" onClick={() => { setEditingTask(null); setNewTask(''); }}>
            Hủy
          </button>
        )}
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div className={`task-item ${task.completed ? 'completed' : ''}`} key={task.id}>
            <span onClick={() => handleToggleComplete(task)} style={{ cursor: 'pointer' }}>
              {task.title}
            </span>
            <div className="task-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setEditingTask(task);
                  setNewTask(task.title);
                }}
              >
                ✏️
              </button>
              <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Component AboutPage: Trang giới thiệu
function AboutPage() {
  return (
    <div className="about-container">
      <h1>Giới thiệu 📝</h1>
      <p>Ứng dụng quản lý công việc cá nhân với các tính năng cơ bản:</p>
      <ul>
        <li>Thêm công việc mới</li>
        <li>Chỉnh sửa công việc</li>
        <li>Xóa công việc</li>
        <li>Đánh dấu công việc đã hoàn thành</li>
        <li>Lưu trữ dữ liệu trên JSON Server</li>
      </ul>
    </div>
  );
}

// Component Navigation: Thanh điều hướng
function Navigation() {
  return (
    <nav className="main-nav">
      <NavLink to="/" className="nav-link" activeClassName="active">🏠 Trang chủ</NavLink>
      <NavLink to="/about" className="nav-link" activeClassName="active">ℹ️ Giới thiệu</NavLink>
    </nav>
  );
}

// Component App: Component chính của ứng dụng
function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;