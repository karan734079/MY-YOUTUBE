import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import conf from '../utils/conf';
import ShimmerForSerachResults from './ShimmerForSerachResults';

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
        <ShimmerForSerachResults />
    ) : (<>
        <div className="flex flex-col gap-4 p-4">
            {videos.map((video, index) => {
                const { snippet } = video;
                const { channelTitle, thumbnails, title, description } = snippet;

                return (
                    <Link key={index} to={`/watch?v=${video.id.videoId}`} className="flex gap-4 items-start">
                        {/* Thumbnail */}
                        <img
                            src={thumbnails?.medium?.url}
                            alt={title}
                            className="w-[491px] h-[265] object-cover rounded-lg flex-shrink-0"
                        />

                        {/* Video Info */}
                        <div className="flex-1">
                            <h3 className="text-2xl font-semibold text-gray-800 line-clamp-2 hover:text-blue-500">
                                {title}
                            </h3>
                            <p className="text-base text-gray-600 mt-1 hover:text-gray-800">{channelTitle}</p>
                            <p className="text-sm text-gray-500 mt-2 line-clamp-3 text-wrap">{description}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
        </>
    );
};

export default SearchResults;
