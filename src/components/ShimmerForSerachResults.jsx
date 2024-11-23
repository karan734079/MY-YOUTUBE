import React from 'react'

const ShimmerForSerachResults = () => {
    return (
        <div className="flex flex-col gap-4 p-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex gap-4 items-start animate-pulse">
                    <div className="w-[429.6px] h-[241.04px] bg-gray-300 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                        <div className=" h-6 w-96 bg-gray-300 animate-pulse rounded mb-1 line-clamp-2"></div>
                        <div className="h-4 bg-gray-300 animate-pulse rounded mb-1 w-3/4"></div>
                        <div className="h-3 bg-gray-300 animate-pulse rounded w-1/2"></div>
                        <div className="h-3 bg-gray-300 animate-pulse rounded w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShimmerForSerachResults
