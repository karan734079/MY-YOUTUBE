import React from 'react';

const Button = ({ name }) => {
  return (
    <button className='py-1 px-5 m-1 bg-gray-300 rounded-lg hover:bg-gray-400 transition cursor-pointer'>
      {name}
    </button>
  );
};

export default Button;
