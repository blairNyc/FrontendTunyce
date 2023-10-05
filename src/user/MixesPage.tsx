import { BiShuffle } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import { useGetAllMixesQuery, useSwitchVideoMutation } from "../app/api/GlobalApiSlice";
import { Mix } from "../types";
const MixesPage = () => {
  const { data: allMixes,isLoading:isLoadingMix } = useGetAllMixesQuery(1)
   const [switchVideoMutation] = useSwitchVideoMutation();

    const handleItemClick = async (id: string) => {
      try {
        const result = await switchVideoMutation({ variables: { id } });
    
        if ('data' in result) {
          console.log('Mutation response:', result.data);
        } else if ('error' in result) {
          console.error('Mutation error:', result.error);
        }
      } catch (error) {
        console.error('Mutation error:', error);
      }
  };
  return (
    <>
      <div className="container">
        {/*Subtitles*/}
        <div className="flex justify-between">
          <div className="text-red-600">
            <h5 className=" sm:text-base md:text-xl lg:2xl">Mixes</h5>
          </div>
          <div className="flex gap-x-5 text-red-600">
            <div className="flex">
              <button className=" sm:text-sm md:text-md lg:text-xl" >
                <BsFillPlayFill />
              </button>
              <button className=" sm:text-sm md:text-md lg:text-xl ml-1">
                Play
              </button>
            </div>
            <div className="flex mr-2">
              <button className="sm:text-sm md:text-md lg:text-xl">
                <BiShuffle />
              </button>
              <button className="sm:text-sm md:text-md lg:text-xl ml-1">
                Shuffle
              </button>
            </div>
          </div>
        </div>
        {/*End of Subtitle*/}
        {/*Main Card*/}
        <div className="md:ml-10 md:mr-10 mx-auto mt-4 rounded-md bg-white">
          <h4 className="font-semibold text-base mb-3 mt-2">11 Mixes</h4>
          {/*Grid*/}
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4 md:mr-2 md:ml-2">
            {/*Mix*/}
            {
              isLoadingMix ? (
                <div className="flex flex-wrap justify-center">
                  <div className="w-32 h-32 bg-gray-300 animate-pulse rounded-md shadow-md"></div>
                  <div className="w-32 h-32 bg-gray-300 animate-pulse rounded-md shadow-md"></div>
                  <div className="w-32 h-32 bg-gray-300 animate-pulse rounded-md shadow-md"></div>
                  <div className="w-32 h-32 bg-gray-300 animate-pulse rounded-md shadow-md"></div>
                  <div className="w-32 h-32 bg-gray-300 animate-pulse rounded-md shadow-md"></div>
                  <div className="w-32 h-32 bg-gray-300 animate-pulse rounded-md shadow-md"></div>
                  <div className="w-32 h-32 bg-gray-300 animate-pulse rounded-md shadow-md"></div>
                  <div className="w-32 h-32 bg-gray-300 animate-pulse rounded-md shadow-md"></div>
                  <div className="w-32 h-32 bg-gray-300 animate-pulse rounded-md shadow-md"></div>
                </div>
            ) : allMixes?.map((mix:Mix) => (
                <div className="px-2">
                    <img
                        src={mix.video_thumbnail}
                        alt=""
                        className="w-full h-32 rounded-md shadow-md"
                    />
                  {/* <div className="bg-gray-300 hover:bg-gray-500 w-32 h-32  rounded-md shadow-md"></div> */}
                  <div className="flex">
                    <button className=" sm:text-sm md:text-md lg:text-xl" onClick={() => handleItemClick(mix.id)}>
                      <BsFillPlayFill />
                    </button>
                    <button className=" sm:text-sm md:text-md lg:text-xl ml-1" onClick={() => handleItemClick(mix.id)}>
                      Play
                    </button>
                  </div>
                  <div className="">
                    <p className="text-base font-bold">{mix.name.slice(0,10)}...</p>
                    <p className="text-sm">{mix.owner.username}</p>
                  </div>
                </div>
              ))
            }
            
            {/*End of Mix*/}
          </div>
          {/*End Grid*/}
        </div>
        {/*End Main Card*/}
      </div>
    </>
  );
};
export default MixesPage;
