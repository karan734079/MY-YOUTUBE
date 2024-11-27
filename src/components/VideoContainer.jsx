import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Videocard from './Videocard';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import conf from '../utils/conf';
import { useSelector } from 'react-redux';

const VideoContainer = () => { 
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);

  const getVideos = useCallback(async (pageToken = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`${conf.youtubeVideoApi}${conf.googleApi}&pageToken=${pageToken}`);
      setVideos((prevVideos) => [...prevVideos, ...response.data.items]);
      setNextPageToken(response.data.nextPageToken);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    getVideos(); 
  }, [getVideos]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 100 && nextPageToken) {
      getVideos(nextPageToken);
    }
  }, [nextPageToken, getVideos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      {loading && videos.length === 0 ? (
        <Shimmer />
      ) : (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${isMenuOpen ? 'lg:grid-cols-4' : 'lg:grid-cols-5'} gap-4 p-2`}>
          {videos.map((video, index) => (
            // <Link key={index} to={`/watch?v=${video.id}&channelTitle=${}&title=${}&thumbnails=${}`}>
            <Link key={index} to={`/watch?v=${video.id}&channelTitle=${video?.snippet?.channelTitle}&title=${video?.snippet?.title}&thumbnails=${video?.snippet?.thumbnails?.default?.url}&views=${video?.statistics?.viewCount}`}>
              <Videocard videoData={video} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoContainer;
