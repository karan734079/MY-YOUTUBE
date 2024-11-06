import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import conf from '../utils/conf';
import Shimmer from '../components/Shimmer';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextPageToken, setNextPageToken] = useState(null);
    const query = searchParams.get('q');

    useEffect(() => {
        fetchResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]); 

    const fetchResults = async (pageToken = '') => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${"https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q="}${encodeURIComponent(query)}&key=${conf.googleApi}&pageToken=${pageToken}`
            );
            setVideos((prevVideos) => [...prevVideos, ...response.data.items]);
            setNextPageToken(response.data.nextPageToken);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setError("Failed to fetch results. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollY + windowHeight >= documentHeight - 100 && nextPageToken) {
            fetchResults(nextPageToken);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nextPageToken]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    if (error) return <div>{error}</div>;

    return loading && videos.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-2">
            {videos.map((video) => {
                const { snippet } = video;
                const { channelTitle, thumbnails, title } = snippet;

                return (
                    <Link key={video.id.videoId} to={`/watch?v=${video.id.videoId}`}>
                        <div className="max-w-xs bg-white rounded-lg shadow-md cursor-pointer overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
                            <img
                                src={thumbnails?.medium?.url || '/path/to/default-image.jpg'}
                                alt={title}
                                className="w-full h-32 object-fill"
                            />
                            <div className="p-2">
                                <h3 className="text-md font-semibold mb-1 line-clamp-2">{title}</h3>
                                <p className="text-gray-700 mb-1 text-sm">{channelTitle}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
            {loading && <Shimmer />}
        </div>
    );
};

export default SearchResults;
