import React from 'react';
import Sidebar from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Body = () => {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);
  const location = useLocation();

  const isWatchPage = location.pathname.startsWith('/watch');

  return (
    <div className="flex">
      <Sidebar isWatchPage={isWatchPage} isMenuOpen={isMenuOpen} />
      <Outlet />
    </div>
  );
};

export default Body;
