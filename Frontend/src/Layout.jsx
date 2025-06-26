import React from 'react';
import Header from './Components/Header/Header';
import { Outlet } from 'react-router-dom';
import pic3 from './Components/images/pic3.jpg';

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
