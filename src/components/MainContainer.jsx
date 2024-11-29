import React, { useState } from 'react';
import ButtonList from './ButtonList';
import VideoContainer from './VideoContainer';
import { useSelector } from 'react-redux';

const MainContainer = () => {
  const [selectedFilter,setFilter] = useState("All");
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);
  
  return (
    <div className={`${isMenuOpen ? 'max-w-screen-xl' : 'w-full p-2'} `}>
      <ButtonList setFilter={setFilter}/>
      <VideoContainer selectedFilter={selectedFilter}/>
    </div>
  );
};

export default MainContainer;
