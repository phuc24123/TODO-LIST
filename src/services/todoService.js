const API_URL = 'http://localhost:3001/todos';

export const todoService = {
  // Lấy danh sách công việc
  async getTodos() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Không thể kết nối tới JSON Server');
    return response.json();
  },

  // Thêm công việc mới
  async addTodo(title) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false }),
    });
    if (!response.ok) throw new Error('Không thể thêm công việc');
    return response.json();
  },

  // Xóa công việc
  async deleteTodo(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Không thể xóa công việc');
    return id;
  },

  // Cập nhật công việc
  async updateTodo(todo) {
    const response = await fetch(`${API_URL}/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error('Không thể cập nhật công việc');
    return response.json();
  },

  // Đánh dấu hoàn thành/chưa hoàn thành
  async toggleTodo(todo) {
    return this.updateTodo({ ...todo, completed: !todo.completed });
  }
}; 