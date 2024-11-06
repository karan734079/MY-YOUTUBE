import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='flex flex-col w-full m-2'>
      <div className='px-5 flex w-full'>
       <div>
       <iframe className='rounded-2xl' width="1000" height="600" src={`https://www.youtube.com/embed/${searchParams.get('v')}?si=zO3KHeYelReHn1z1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
       </div>
       <div className='w-full'>
        <LiveChat />
       </div>
      </div>
      <div className='w-[1050px]'>
        <CommentsContainer />
      </div>
      </div>
    </>
  )
}

export default WatchPage
