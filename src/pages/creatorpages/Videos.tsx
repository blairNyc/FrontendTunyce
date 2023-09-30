import React from 'react';
import { BsPlayCircle } from 'react-icons/bs';
import { useGetSingleCreatorQuery } from '../../app/api/GlobalApiSlice';
import {SingleCreator } from '../../types';

const VideoItem: React.FC<{ value?: SingleCreator }> = ({ value }) => (
  <a href={`/creators/videos/${value?.id}`} className="md:w-56 w-44 hover:scale-105 m-2  min-h-[100px] min-w-[90px] xl:min-w-[100px] md:min-w-[190px] rounded-2xl">
    <div className="w-full h-32 relative">
      <span className="absolute mx-2 flex h-6 w-6" style={{ bottom: '50%', left: '50%', transform: 'translate(-50%, 50%)' }}>
        <BsPlayCircle className="mb-9 inline-flex rounded-full h-6 w-6 bg-orangered" />
      </span>
      <img src={value?.thumbnailUrl || 'https://picsum.photos/200/300'} alt="" className="w-full h-full object-cover rounded-2xl" />
    </div>
    <div className="my-2">
      <h3 className="text-text-primary font-semibold text-sm md:text-lg">{value?.title || 'Anyone'}</h3>
      <p className="text-text-secondary my-1 text-xs">10k Views . 10 days ago</p>
    </div>
  </a>
);

const Videos: React.FC = () => {

  const {data: creator} = useGetSingleCreatorQuery([])
  return (
    <div className="w-full mt-5">
      <h2 className="text-2xl font-semibold"> Videos</h2>
      <div className="w-full h-full relative mt-3">
        <div className="overflow-y-scroll no-scrollbar flex items-center">
          {
            creator && creator.map((value: SingleCreator) => {
              <VideoItem key={value.id} value={value} />
            })
          }
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
          <VideoItem />
        </div>
      </div>
    </div>
  );
};

export default Videos;
