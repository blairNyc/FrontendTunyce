import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSwitchVideoMutation } from '../../app/api/GlobalApiSlice';


interface CommonProps{
    title?: string
    id?:bigint
    owner?: string
    srcUrl?:string
    vidUrl?:string
    additionalStyles?: React.HTMLAttributes<HTMLDivElement>['className'] | undefined| string
    children?: React.ReactNode
    seeAllPath?: string
    path?:string
    date?:string
    views?:string
}

const VideoItem = ({ title, owner, id ,vidUrl, date,srcUrl,views }: CommonProps) => {
    const [isHovered, setIsHovered] = useState(false);
  
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setIsHovered(true);
    }, 2000); 
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setIsHovered(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  const [switchVideoMutation] = useSwitchVideoMutation();

  const handleItemClick = async () => {
    try {
      const result = await switchVideoMutation({ variables: { id } });

      if ('data' in result) {
        console.log('Video switched successfully:', result.data);
      } else if ('error' in result) {
        console.error('Video switch error:', result.error);
      }
    } catch (error) {
      console.error('Video switch error:', error);
    }
  };
  
    return (
      <a
        className=""
      >
        <div 
           className="w-full h-60 relative"
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}
           onClick={handleItemClick}
        >
          {isHovered ? (
            <ReactPlayer
              url={vidUrl}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <img src={srcUrl} alt="" className="w-full h-full object-cover rounded-md" />
          )}
          <p className="absolute bottom-0 right-0 mx-2 font-bold text-white">3.35</p>
        </div>
        <div className="my-2 flex align-center">
          <img className="w-10 h-10 rounded-full" src={srcUrl} alt={title}/>
          <div className="pl-4">
              <h3 className="text-black font-bold text-sm md:text-lg">
              {`${title?.slice(0, 80)}...`}

              </h3>
            <p className="text-text-secondary my-1 text-sm">
              <span className='font-bold'>{owner}</span>.  {views} . {date} </p>
          </div>
        </div>
      </a>
    );
  };

  export default VideoItem;