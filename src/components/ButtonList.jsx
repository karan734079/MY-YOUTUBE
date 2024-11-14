import React from 'react';
import Button from './Button';

const ButtonList = () => {
  const buttons = ['All', 'Games','Sports','Music','Movies','Kids','Cricket','Live','Bollywood','Gadgets','News','Motivation','Cricket','Live','Bollywood','Gadgets','News','Motivation',]
  return (
    <div className='flex overflow-x-auto py-2 space-x-1 scrollbar-hidden '>
      {buttons.map((name,index)=>(
        <div className='flex flex-nowrap' key={index}>
          <Button name={name} />
        </div>
      ))}
    </div>
  );
};

export default ButtonList;
