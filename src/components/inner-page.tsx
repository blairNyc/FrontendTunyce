import {useGetAllTrendingMixesQuery} from "../app/api/GlobalApiSlice";
import VideoItem from "./cards/videoItem";
import SkeletonItem from "./cards/skeletonItem";
import LazyLoad from 'react-lazyload';
import { useEffect, useState } from "react";


const ExplorePage = () => {
  const { data: allMixes, isLoading } = useGetAllTrendingMixesQuery(1);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update current date every second
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 relative w-full">
      <h2 className="text-2xl text-text-primary font-bold">allMixes</h2>
      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 10 }, (_, index) => (
              <SkeletonItem key={index} />
            ))
          ) : (
            allMixes?.map((mix: any) => {
              const dateAdded = new Date(mix.created_at);
              const timeDifference = Math.abs(currentDate.getTime() - dateAdded.getTime());
              const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
              
              return(

               <LazyLoad height={200} offset={100} key={mix.id}>
                 <VideoItem
                  title={`${mix?.name}`}
                  owner={`${mix?.owner?.username}`}
                  vidUrl={`${mix?.media?.media_url}`}
                  srcUrl={
                    mix && mix?.video_thumbnail
                      ? mix?.video_thumbnail
                      : 'https://images.unsplash.com/photo-1653361953232-cd154e54beff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fHRyZW5kaW5nJTIwbWl4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
                  }
                  id={`${mix?.id}`}   
                  date={`${daysDifference} days ago`}
                  views={`${mix?.views} views`}               
                />
              </LazyLoad>
            )}
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
