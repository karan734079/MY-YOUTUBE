import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isWatchPage, isMenuOpen }) => {
  // Early return if the menu is closed
  if (!isMenuOpen) return null;

  return (
    <div
      className={`p-5 w-48 shadow-lg bg-white ${
        isWatchPage ? 'absolute mt-20' : 'relative'
      }`}
      style={{ top: isWatchPage ? '0' : 'auto' }}
    >
      <ul>
        <Link to="/"><li>Home</li></Link>
        <li>Shorts</li>
        <li>Videos</li>
        <li>Live</li>
      </ul>
      <h1 className="font-bold pt-4">Subscriptions</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
      <h1 className="font-bold pt-4">Watch Later</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
    </div>
  );
};

export default Sidebar;
