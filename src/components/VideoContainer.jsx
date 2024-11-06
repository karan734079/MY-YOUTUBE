import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Videocard from './Videocard';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import conf from '../utils/conf';

const VideoContainer = () => { 
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);

  useEffect(() => {
      getVideos(); 
  }, []);

  const getVideos = async (pageToken = '') => {
    setLoading(true);
    const response = await axios.get(`${conf.youtubeVideoApi}${conf.googleApi}&pageToken=${pageToken}`);
    setVideos((prevVideos) => [...prevVideos, ...response.data.items]);
    setNextPageToken(response.data.nextPageToken);
    setLoading(false);
  };

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 100 && nextPageToken) {
      getVideos(nextPageToken);
    }
  }, [nextPageToken]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      {loading && videos.length === 0 ? <Shimmer /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-2">
          {videos.map((video , index) => (
            <Link key={index} to={`/watch?v=${video.id}`}>
              <Videocard videoData={video} />
            </Link>
          ))}
        </div>
      )}
      {loading && videos.length > 0 && <Shimmer />}
    </div>
  );
};

export default VideoContainer;
