import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';
import RealtedVideosContainer from './RealtedVideosContainer';

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const videoId = searchParams.get('v');
  const title = searchParams.get('title');
  const channelTitle = searchParams.get('channelTitle');
  const thumbnail = searchParams.get('thumbnails');
  const videoViews = searchParams.get('views');

  useEffect(() => {
    dispatch(closeMenu());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div>
      <div className="flex flex-col w-full m-2">
        <div className="px-5 flex w-full">
          <div className=''>
            <iframe
              className="rounded-md"
              width="1000"
              height="600"
              src={`https://www.youtube.com/embed/${videoId}?si=zO3KHeYelReHn1z1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <p className='text-4xl font-semibold mt-1'>{title}</p>
            <div className='flex mt-1 space-x-1'>
              <img src={thumbnail} alt="" className='rounded-full h-8 w-8' />
              <p className='text-lg'>{channelTitle}</p>
            </div>
            <div className='flex justify-between'>
              <p className="text-gray-500 text-sm mt-2 ml-1">
                {formatViews(videoViews)} views
              </p>
              <button className='flex mr-3 gap-2 p-2 text-white rounded-md bg-red-500'>Subscribe 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mt-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
              </button>
            </div>
          </div>
          <div className="w-full">
            <LiveChat />
          </div>
        </div>

        <div className="px-5 flex">
          <div className="w-[1020px]">
            <CommentsContainer videoId={videoId} />
          </div>
          <div className="">
            <RealtedVideosContainer videoId={videoId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
