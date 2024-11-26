import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import conf from '../utils/conf';
import ShimmerForSerachResults from './ShimmerForSerachResults';
import { formatDistanceToNow } from 'date-fns';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const query = searchParams.get('q');

    useEffect(() => {
        fetchResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const fetchResults = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${"https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=28&q="}${encodeURIComponent(query)}&key=${conf.googleApi}`
            );
            setVideos(response.data.items);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setError("Failed to fetch results. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (error) return <div>{error}</div>;

    return loading && videos.length === 0 ? (
        <ShimmerForSerachResults />
    ) : (
        <>
            <div className="flex flex-col gap-4 p-4 max-w-screen-xl">
                {videos.map((video, index) => {
                    const { snippet } = video;
                    const { channelTitle, thumbnails, title, description, publishedAt } = snippet;

                    const relativeTime = formatDistanceToNow(new Date(publishedAt), { addSuffix: true });

                    return (
                        <Link key={index} to={`/watch?v=${video.id.videoId}`} className="flex gap-4 items-start">
                            <img
                                src={thumbnails?.medium?.url}
                                alt={title}
                                className="w-[491px] h-[265] object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1">
                                <h3 className="text-2xl font-semibold text-gray-800 line-clamp-2 hover:text-blue-500">
                                    {title}
                                </h3>
                                <div className="flex mt-1 items-center space-x-1">
                                    <img src={thumbnails.medium.url} alt="" className="h-6 w-6 rounded-full mt-1" />
                                    <p className="text-base text-gray-600 font-semibold mt-1 hover:text-gray-800">
                                        {channelTitle}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-3 text-wrap">{description}</p>
                                <p className="text-sm text-gray-500">{relativeTime}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default SearchResults;
