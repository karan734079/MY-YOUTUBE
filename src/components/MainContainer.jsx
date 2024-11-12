import React from 'react';
import ButtonList from './ButtonList';
import VideoContainer from './VideoContainer';
import { useSelector } from 'react-redux';

const MainContainer = () => {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);
  
  return (
    <div className={`${isMenuOpen ? 'max-w-screen-xl' : 'w-full p-2'} `}>
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
