import React from 'react';

const VideoCardShimmer = () => {
    return (
        <div className="max-w-xs bg-white rounded-lg shadow-md cursor-pointer overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
            <div className="h-32 bg-gray-300 animate-pulse" />
            <div className="p-2">
                <div className="h-6 bg-gray-300 animate-pulse rounded mb-1 line-clamp-2" />
                <div className="h-4 bg-gray-300 animate-pulse rounded mb-1 w-3/4" />
                <div className="h-3 bg-gray-300 animate-pulse rounded w-1/2" />
            </div>
        </div>
    );
};

const Shimmer = () => {
    const shimmerCards = Array.from({ length: 20 }, (index) => <VideoCardShimmer key={index} />);

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {shimmerCards}
            </div>
        </div>
    );
};

export default Shimmer;
