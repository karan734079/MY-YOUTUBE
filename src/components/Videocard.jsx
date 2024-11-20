import React from 'react';

const Videocard = ({ videoData }) => {
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
  const { channelTitle, thumbnails, title } = snippet;

  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md cursor-pointer overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
      <img
        src={thumbnails.medium.url}
        alt={title}
        className="w-full h-32 object-fill"
      />
      <div className="p-2">
        <h3 className="text-md font-semibold mb-1 line-clamp-2">{title}</h3>
        <p className="text-gray-700 mb-1 text-sm">{channelTitle}</p>
        <p className="text-gray-500 text-xs">
          {formatViews(statistics?.viewCount)} views
        </p>
      </div>
    </div>
  );
};

export default Videocard;
