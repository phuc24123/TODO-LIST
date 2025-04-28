/**
 * ỨNG DỤNG TODO LIST SỬ DỤNG REACT VÀ JSON SERVER
 * Tích hợp React Router cho đa trang
 * Chức năng: Thêm, sửa, xóa, đánh dấu hoàn thành công việc với dữ liệu lưu trên JSON Server
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';
import AboutPage from './components/AboutPage';
import Navigation from './components/Navigation';

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