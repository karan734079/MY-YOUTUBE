import React, { useEffect } from 'react'
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

  useEffect(() => {
    dispatch(closeMenu());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="">
      <div className='flex flex-col w-full m-2'>
        <div className='px-5 flex w-full'>
          <div>
            <iframe className='rounded-2xl' width="1000" height="600" src={`https://www.youtube.com/embed/${videoId}?si=zO3KHeYelReHn1z1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
          <div className='w-full'>
            <LiveChat />
          </div>
        </div>
        <div className='px-5 flex '>
          <div className='w-[1020px]'>
            <CommentsContainer videoId={videoId} />
          </div>
          <div className=''>
            <RealtedVideosContainer videoId={videoId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatchPage
