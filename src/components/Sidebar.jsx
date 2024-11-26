/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import conf from '../utils/conf';

const Sidebar = ({ isWatchPage, isMenuOpen }) => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // Fetch channels when the component mounts
    const fetchChannels = async () => {
      try {
        const response = await axios.get(`${conf.youtubeVideoApi}${conf.googleApi}`);
        setChannels(response?.data?.items);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    fetchChannels();
  }, []);

  // Early return if the menu is closed
  if (!isMenuOpen) return null;

  return (
    <div
      className={`p-5 w-48 shadow-lg bg-white cursor-pointer ${isWatchPage ? 'absolute' : 'relative'
        }`}
    >
      <ul className='border-b-2'>
        <Link to="/">
          <li className='text-base text-gray-600 font-semibold hover:text-gray-800'>Home</li>
        </Link>
        <li className='text-base text-gray-600 font-semibold hover:text-gray-800'>Shorts</li>
        <li className='text-base text-gray-600 font-semibold hover:text-gray-800'>Videos</li>
        <li className='text-base text-gray-600 font-semibold hover:text-gray-800 mb-2'>Live</li>
      </ul>

      <h1 className="font-bold pt-2 text-xl">Subscriptions</h1>
      <ul className='border-b-2'>
        <li className='text-base text-gray-600 font-semibold hover:text-gray-800'>Music</li>
        <li className='text-base text-gray-600 font-semibold hover:text-gray-800'>Sports</li>
        <li className='text-base text-gray-600 font-semibold hover:text-gray-800'>Gaming</li>
        <li className='text-base text-gray-600 font-semibold hover:text-gray-800 mb-2'>Movies</li>
      </ul>

      <h1 className="font-bold pt-2 text-lg">Popular Channels</h1>
      <ul className="space-y-2">
        {channels.map((channel, index) => {
          const { snippet } = channel;
          const { channelTitle, thumbnails } = snippet;

          return (
            <div className="flex mt-2 items-center space-x-2 cursor-pointer" key={index}>
              <img
                src={thumbnails?.default?.url}
                alt=""
                className="h-6 w-6 rounded-full"
              />
              <p className="text-base text-gray-600 font-semibold hover:text-gray-800">
                {channelTitle}
              </p>
            </div>
          );
        })
        }
      </ul>
    </div>
  );
};

export default Sidebar;
