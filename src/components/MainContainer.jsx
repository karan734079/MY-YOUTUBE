import React from 'react';
import ButtonList from './ButtonList';
import VideoContainer from './VideoContainer';

const MainContainer = () => {
  return (
    <div className='max-w-screen-xl ml-4 '>
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
