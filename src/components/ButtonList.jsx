import React from 'react';
import Button from './Button';

const ButtonList = ({ setFilter }) => {
  const buttons = [
  { id: "1", title: "Film" },
  { id: "2", title: "Autos" },
  { id: "10", title: "Music" },
  { id: "17", title: "Sports" },
  { id: "19", title: "Travel" },
  { id: "20", title: "Gaming" },
  { id: "22", title: "People" },
  { id: "23", title: "Comedy" },
  { id: "24", title: "Entertainment" },
  { id: "25", title: "News" },
  { id: "26", title: "Style" },
  { id: "27", title: "Education" },
  { id: "28", title: "Science" },
  { id: "29", title: "Nonprofits" },
  { id: "30", title: "Movies" },
  { id: "31", title: "Anime" },
  { id: "32", title: "Action" },
  { id: "33", title: "Classics" },
  { id: "34", title: "Comedy" }]
  return (
    <div className='flex overflow-x-auto py-2 space-x-1 scrollbar-hidden ml-1 '>
      {buttons.map((button, index) => (
        <div className='flex flex-nowrap' key={index}>
          <Button name={button.title} onClick={() => setFilter(button.id)} />
        </div>
      ))}
    </div>
  );
};

export default ButtonList;
