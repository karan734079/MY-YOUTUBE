import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import conf from '../utils/conf';
import { formatDistanceToNow } from 'date-fns';

const Videocard1 = ({ videoData }) => {
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
    const { channelTitle, thumbnails, title ,publishedAt} = snippet;

    const relativeTime = formatDistanceToNow(new Date(publishedAt), { addSuffix: true });

    return (
        <div className="bg-white shadow-md cursor-pointer overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
            <img
                src={thumbnails.medium.url}
                alt={title}
                className="w-full h-48 object-cover"
            />
            <div className="p-3">
                <h3 className="text-base font-semibold mb-1 line-clamp-2">{title}</h3>
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

const RelatedVideosContainer = ({ videoId }) => {
    const [videos, setVideos] = useState([]);

    const getVideos = async () => {
        try {
            const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${conf.googleApi}`);
            setVideos(data.items);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    useEffect(() => {
        if (videoId) {
            getVideos();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="max-w-7xl mx-auto mt-2">
            <h1 className="text-2xl font-bold mb-1">Related Videos :</h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 p-1 max-h-[2100px] overflow-y-scroll overflow-x-hidden scrollbar-hidden">
                {videos.map((video, index) => (
                    <Link key={index} to={`/watch?v=${video.id}`}>
                        <Videocard1 videoData={video} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedVideosContainer;
