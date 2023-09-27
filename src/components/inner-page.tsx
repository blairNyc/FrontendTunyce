import { useGetAllMixesQuery } from "../app/api/GlobalApiSlice";
import VideoItem from "./cards/videoItem";
import SkeletonItem from "./cards/skeletonItem";
import LazyLoad from 'react-lazyload';


const ExplorePage = () => {
  const { data: allMixes, isLoading } = useGetAllMixesQuery(1);

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
            allMixes?.map((mix: any) => (
              <LazyLoad height={200} offset={100} key={mix.id}>
                <VideoItem
                  title={`${mix?.name}`}
                  owner={`${mix?.owner}`}
                  vidUrl={`${mix?.video}`}
                  srcUrl={
                    mix && mix?.thumbnail
                      ? mix?.thumbnail
                      : 'https://images.unsplash.com/photo-1653361953232-cd154e54beff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fHRyZW5kaW5nJTIwbWl4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
                  }
                />
              </LazyLoad>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
