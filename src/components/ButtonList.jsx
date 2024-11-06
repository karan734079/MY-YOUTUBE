import React from 'react';
import Button from './Button';

const ButtonList = () => {
  return (
    <div className='flex overflow-x-auto py-2 space-x-1 scrollbar-hidden '>
      <div className='flex flex-nowrap'>
        <Button name='All' />
        <Button name='Games' />
        <Button name='Sports' />
        <Button name='Music' />
        <Button name='Movies' />
        <Button name='Kids' />
        <Button name='Cricket' />
        <Button name='Live' />
        <Button name='Bollywood' />
        <Button name='Gadgets' />
        <Button name='News' />
        <Button name='Motivation' />
        <Button name='Cricket' />
        <Button name='Live' />
        <Button name='Bollywood' />
        <Button name='Gadgets' />
        <Button name='News' />
        <Button name='Motivation' />
      </div>
    </div>
  );
};

export default ButtonList;
