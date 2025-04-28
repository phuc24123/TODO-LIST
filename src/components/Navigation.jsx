import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="main-nav">
      <NavLink to="/" className="nav-link" activeClassName="active">🏠 Trang chủ</NavLink>
      <NavLink to="/about" className="nav-link" activeClassName="active">ℹ️ Giới thiệu</NavLink>
    </nav>
  );
}

export default Navigation; 