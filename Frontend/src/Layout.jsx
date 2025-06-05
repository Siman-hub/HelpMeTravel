import React from 'react';
import Header from './Components/Header/Header';
import { Outlet } from 'react-router-dom';
import pic3 from './Components/images/pic2.jpg';

function Layout() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url(${pic3})`,
      }}
    >
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
