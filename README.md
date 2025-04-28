# Todo List App - React Learning Project

## Mô tả dự án
Đây là một ứng dụng Todo List đơn giản được xây dựng bằng React, phục vụ mục đích học tập và thực hành các khái niệm cơ bản của React. Ứng dụng cho phép người dùng quản lý danh sách công việc với khả năng thêm, sửa, xóa, lọc và đánh dấu hoàn thành các công việc. Mọi thay đổi sẽ được lưu trữ và cập nhật trực tiếp vào file `db.json` thông qua JSON Server.

## Cấu trúc dự án
```
todo-list/
├── src/
│   ├── components/
│   │   ├── TodoList.jsx
│   │   ├── TodoList.css
│   │   └── AboutPage.jsx
│   ├── __tests__/
│   │   └── ... (các file test)
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── db.json
└── package.json
```

## Mục tiêu học tập
Dự án này được tạo ra để thực hành và hiểu sâu về các khái niệm sau:

### 1. Cài đặt và thiết lập môi trường
- Cài đặt Node.js và npm
- Sử dụng Vite hoặc Create React App để tạo dự án React
- Cấu hình môi trường phát triển

### 2. Component và JSX
- Hiểu về cấu trúc component trong React
- Thực hành sử dụng JSX để kết hợp JavaScript và HTML
- Tạo các component có thể tái sử dụng (TodoList, AboutPage, ...)

### 3. Props và State
- Phân biệt và sử dụng props và state
- Quản lý state trong function components
- Truyền dữ liệu giữa các components

### 4. React Hooks
- Sử dụng useState để quản lý state
- Sử dụng useEffect để xử lý side effects
- Tìm hiểu về useMemo, memo, useCallback
- Best practices khi sử dụng hooks

### 5. React Router
- Thiết lập routing trong ứng dụng (giữa trang chính và trang giới thiệu)
- Sử dụng Route, Link để chuyển trang

### 6. REST API và JSON Server
- Thiết lập và sử dụng JSON Server
- Làm việc với REST API
- Các phương thức HTTP (GET, POST, PUT, DELETE)
- Sử dụng fetch API để gọi API

## Các chức năng chính
- Thêm công việc mới: Người dùng có thể thêm công việc mới vào danh sách, dữ liệu sẽ được lưu vào file `db.json`
- Chỉnh sửa công việc hiện có: Có thể sửa nội dung của công việc đã có, thay đổi sẽ được cập nhật vào `db.json`
- Xóa công việc: Có thể xóa bất kỳ công việc nào khỏi danh sách, dữ liệu sẽ được xóa khỏi `db.json`
- Đánh dấu hoàn thành: Đánh dấu công việc đã hoàn thành hoặc chưa hoàn thành
- Lọc công việc: Hiển thị tất cả, công việc chưa hoàn thành, hoặc đã hoàn thành
- Hiển thị danh sách công việc: Hiển thị tất cả công việc được lưu trong `db.json`
- Đồng bộ dữ liệu thời gian thực: Mọi thay đổi (thêm/sửa/xóa) sẽ được phản ánh ngay lập tức trong file `db.json`
- Trang giới thiệu: Giới thiệu về ứng dụng và các tính năng

## Công nghệ sử dụng
- React (phiên bản mới nhất)
- Vite hoặc Create React App
- JSON Server
- React Hooks
- Fetch API
- React Router DOM
- CSS thuần (phối màu hiện đại, responsive)

## Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (phiên bản 14 trở lên)
- npm hoặc yarn

### Các bước cài đặt
1. Clone repository
```bash
git clone [repository-url]
cd todo-list
```

2. Cài đặt dependencies
```bash
npm install
```

3. Tạo file dữ liệu cho JSON Server
Tạo file `db.json` ở thư mục gốc với nội dung mẫu:
```json
{
  "todos": []
}
```

4. Chạy JSON Server
```bash
npx json-server --watch db.json --port 3001
```

5. Chạy ứng dụng React
```bash
npm run dev
```
hoặc nếu dùng Create React App:
```bash
npm start
```

## API Endpoints
- `GET /todos` - Lấy danh sách todos
- `POST /todos` - Thêm todo mới
- `PUT /todos/:id` - Cập nhật todo
- `DELETE /todos/:id` - Xóa todo

## Tài liệu tham khảo
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [JSON Server Documentation](https://github.com/typicode/json-server)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React Router Documentation](https://reactrouter.com/)

---

**Chúc bạn học tập và thực hành React hiệu quả!**  
Nếu có thắc mắc hoặc góp ý, hãy liên hệ hoặc tạo issue tại repo này. 