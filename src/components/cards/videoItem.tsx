import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';


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
}

const VideoItem = ({ title, owner, vidUrl, srcUrl }: CommonProps) => {
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
  
    return (
      <a
        href="/creators/videos/3"
        className=""
      >
        <div 
           className="w-full h-60 relative"
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}
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
                {`${title?.slice(0, 20)}...`}
              </h3>
            <p className="text-text-secondary my-1 text-sm">{owner} . 10 days ago</p>
          </div>
        </div>
      </a>
    );
  };

  export default VideoItem;