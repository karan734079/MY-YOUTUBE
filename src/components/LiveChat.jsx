import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { generateRandomName, getRandomAlphabet, getRandomEmoji, getRandomQuote } from '../utils/helper';

const LiveChat = () => {
  const dispatch = useDispatch();
  const chatMessages = useSelector((state) => state.chat.messages);
  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(addMessage({
        logo: getRandomAlphabet(),
        name: generateRandomName(),
        message: getRandomQuote(),
        emoji: getRandomEmoji(),
      }));
    }, 700);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (userMessage.trim()) {
      dispatch(addMessage({
        logo: 'K',
        name: 'Karan(me)',
        message: userMessage,
        emoji: "",  
      }));
      setUserMessage('');
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='w-full h-[650px] ml-2 p-2 overflow-y-auto flex flex-col-reverse'>
        {chatMessages.map((chat, index) => (
          <ChatMessage name={chat.name} message={chat.message} key={index} logo={chat.logo} emoji={chat.emoji} />
        ))}
      </div>
      <form className='flex items-center p-2 border-gray-300 bg-white' onSubmit={handleSendMessage}>
        <input
          type='text'
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder='Type your message...'
          className='flex-grow p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black'
        />
        <button
          className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
