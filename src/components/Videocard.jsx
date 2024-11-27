import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const Videocard = ({ videoData }) => {
  //Early return
  if (!videoData) return null;

  const formatViews = (views) => {
    if (views >= 1e9) {
      return (views / 1e9).toFixed(1) + 'B';
    } else if (views >= 1e6) {
      return (views / 1e6).toFixed(1) + 'M';
    } else if (views >= 1e4) {
      return (views / 1e4).toFixed(1) + 'K';
    }
    return views;
  };

  const { snippet, statistics } = videoData;
  const { channelTitle, thumbnails, title, publishedAt } = snippet;


  const relativeTime = formatDistanceToNow(new Date(publishedAt), { addSuffix: true });


  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md cursor-pointer overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
      <img
        src={thumbnails.medium.url}
        alt={title}
        className="w-full h-32 object-fill"
      />
      <div className="p-2">
        <h3 className="text-md font-semibold mb-1 line-clamp-2">{title}</h3>
        <div className='flex space-x-1 font-semibold'>
          <img src={thumbnails.medium.url} className='h-6 w-6 rounded-full' alt="" />
          <p className="text-gray-700 mb-1 text-xs mt-1">{channelTitle}</p>
        </div>
        <p className="text-gray-500 text-xs mt-1">
          {formatViews(statistics?.viewCount)} views | {relativeTime}
        </p>
      </div>
    </div>
  );
};

export default Videocard;
