/**
 * ỨNG DỤNG TODO LIST SỬ DỤNG REACT VÀ JSON SERVER
 * Chức năng chính: Thêm, sửa, xóa công việc với dữ liệu được lưu trữ trên JSON Server
 */

import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // STATE MANAGEMENT
  const [tasks, setTasks] = useState([]); // Danh sách công việc
  const [newTask, setNewTask] = useState(''); // Nội dung task mới
  const [editingTask, setEditingTask] = useState(null); // Task đang được chỉnh sửa

  // ========================
  // API HANDLERS
  // ========================

  /**
   * Lấy danh sách tasks từ server
   * Gọi tự động khi component được mount (useEffect)
   */
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3001/todos');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Lỗi khi tải tasks:', error);
    }
  };

  /**
   * Thêm task mới
   * - Kiểm tra nội dung không rỗng
   * - Gửi POST request đến server
   * - Cập nhật UI sau khi thành công
   */
  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTask,
          completed: false
        }),
      });
      
      await response.json();
      fetchTasks(); // Refresh danh sách
      setNewTask(''); // Reset input
    } catch (error) {
      console.error('Lỗi khi thêm task:', error);
    }
  };

  /**
   * Xóa task
   * @param {number} id - ID của task cần xóa
   */
  const handleDeleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });
      fetchTasks(); // Refresh danh sách
    } catch (error) {
      console.error('Lỗi khi xóa task:', error);
    }
  };

  /**
   * Bắt đầu chỉnh sửa task
   * @param {object} task - Task object cần chỉnh sửa
   */
  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask(task.title); // Hiển thị nội dung cũ trong input
  };

  /**
   * Cập nhật task sau khi chỉnh sửa
   */
  const handleUpdateTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await fetch(`http://localhost:3001/todos/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingTask,
          title: newTask
        }),
      });

      await response.json();
      fetchTasks(); // Refresh danh sách
      setNewTask(''); // Reset input
      setEditingTask(null); // Thoát chế độ chỉnh sửa
    } catch (error) {
      console.error('Lỗi khi cập nhật task:', error);
    }
  };

  // ========================
  // SIDE EFFECTS
  // ========================
  useEffect(() => {
    fetchTasks(); // Load dữ liệu khi component mount
  }, []);

  // ========================
  // EVENT HANDLERS
  // ========================
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      editingTask ? handleUpdateTask() : handleAddTask();
    }
  };

  // ========================
  // RENDER
  // ========================
  return (
    <div className="app">
      <div className="todo-container">
        <h1>Những Việc Cần Làm!</h1>

        {/* Form thêm/cập nhật task */}
        <div className="form-add-task">
          <input
            type="text"
            placeholder="Nhiệm vụ hôm nay là gì?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown} // Hỗ trợ nhấn Enter
          />
          <button onClick={editingTask ? handleUpdateTask : handleAddTask}>
            {editingTask ? 'Update Task' : 'Thêm Task'}
          </button>
        </div>

        {/* Danh sách tasks */}
        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-item" key={task.id}>
              <span>{task.title}</span>
              <div className="task-actions">
                <button 
                  className="edit-btn" 
                  onClick={() => handleEditTask(task)}
                  aria-label="Edit task"
                >
                  ✏️
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTask(task.id)}
                  aria-label="Delete task"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;