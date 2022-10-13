import { Outlet } from 'react-router-dom';

import Menu from '../components/header';

const Layout = () => {
  return (
    <div className="app">
      <Menu />
      <Outlet />
    </div>
  );
};

export default Layout;
