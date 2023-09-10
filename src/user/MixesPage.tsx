import { BiShuffle } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
const MixesPage = () => {
  return (
    <>
      <div className="container">
        {/*Subtitles*/}
        <div className="flex justify-between">
          <div className="text-red-600">
            <h5 className=" sm:text-base md:text-xl lg:2xl">My Music</h5>
          </div>
          <div className="flex gap-x-5 text-red-600">
            <div className="flex">
              <button className=" sm:text-sm md:text-md lg:text-xl">
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
        <div className="ml-4 mr-4 mx-auto mt-4 rounded-md bg-white">
          <h4 className="font-semibold text-base mb-3 mt-2">11 Mixes</h4>
          {/*Grid*/}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 ml-2">
            {/*Mix*/}
            <div className="">
              <div className="bg-gray-300 hover:bg-gray-500 w-32 h-32  rounded-md shadow-md"></div>
              <div className="">
                <p className="text-base font-bold">Afterglow</p>
                <p className="text-sm">DJ Lyta</p>
              </div>
            </div>
            {/*End of Mix*/}
            {/*Mix*/}
            <div className="">
              <div className="bg-gray-300  hover:bg-gray-500 w-32 h-32  rounded-md shadow-md"></div>
              <div className="">
                <p className="text-base font-bold">Afterglow</p>
                <p className="text-sm">DJ Lyta</p>
              </div>
            </div>
            {/*End of Mix*/}
            {/*Mix*/}
            <div className="">
              <div className="bg-gray-300  hover:bg-gray-500 w-32 h-32  rounded-md shadow-md"></div>
              <div className="">
                <p className="text-base font-bold">Afterglow</p>
                <p className="text-sm">DJ Lyta</p>
              </div>
            </div>
            {/*End of Mix*/}
            {/*Mix*/}
            <div className="">
              <div className="bg-gray-300  hover:bg-gray-500 w-32 h-32  rounded-md shadow-md"></div>
              <div className="">
                <p className="text-base font-bold">Afterglow</p>
                <p className="text-sm">DJ Lyta</p>
              </div>
            </div>
            {/*End of Mix*/}
            {/*Mix*/}
            <div className="">
              <div className="bg-gray-300  hover:bg-gray-500 w-32 h-32  rounded-md shadow-md"></div>
              <div className="">
                <p className="text-base font-bold">Afterglow</p>
                <p className="text-sm">DJ Lyta</p>
              </div>
            </div>
            {/*End of Mix*/}
            {/*Mix*/}
            <div className="">
              <div className="bg-gray-300  hover:bg-gray-500 w-32 h-32  rounded-md shadow-md"></div>
              <div className="">
                <p className="text-base font-bold">Afterglow</p>
                <p className="text-sm">DJ Lyta</p>
              </div>
            </div>
            {/*End of Mix*/}
            {/*Mix*/}
            <div className="">
              <div className="bg-gray-300  hover:bg-gray-500 w-32 h-32  rounded-md shadow-md"></div>
              <div className="">
                <p className="text-base font-bold">Afterglow</p>
                <p className="text-sm">DJ Lyta</p>
              </div>
            </div>
            {/*End of Mix*/}
            {/*Mix*/}
            <div className="">
              <div className="bg-gray-300  hover:bg-gray-500 w-32 h-32  rounded-md shadow-md"></div>
              <div className="">
                <p className="text-base font-bold">Afterglow</p>
                <p className="text-sm">DJ Lyta</p>
              </div>
            </div>
            {/*End of Mix*/}
            {/*Mix*/}
            <div className="">
              <div className="bg-gray-300   hover:bg-gray-500 w-32 h-32  rounded-md shadow-md"></div>
              <div className="">
                <p className="text-base font-bold">Afterglow</p>
                <p className="text-sm">DJ Lyta</p>
              </div>
            </div>
            {/*End of Mix*/}
            {/*Mix*/}
            <div className="">
              <div className="bg-gray-300  hover:bg-gray-500 w-32 h-32  rounded-md shadow-md"></div>
              <div className="">
                <p className="text-base font-bold">Afterglow</p>
                <p className="text-sm">DJ Lyta</p>
              </div>
            </div>
            {/*End of Mix*/}
            {/*Mix*/}
            <div className="">
              <div className="bg-gray-300  hover:bg-gray-500 w-32 h-32  rounded-md shadow-md"></div>
              <div className="">
                <p className="text-base font-bold">Afterglow</p>
                <p className="text-sm">DJ Lyta</p>
              </div>
            </div>
            {/*End of Mix*/}
            {/*Mix*/}
            <div className="">
              <div className="bg-gray-300  hover:bg-gray-500 w-32 h-32  rounded-md shadow-md"></div>
              <div className="">
                <p className="text-base font-bold">Afterglow</p>
                <p className="text-sm">DJ Lyta</p>
              </div>
            </div>
            {/*End of Mix*/}
            {/*Mix*/}
            <div className="">
              <div className="bg-gray-300  hover:bg-gray-500 w-32 h-32  rounded-md shadow-md"></div>
              <div className="">
                <p className="text-base font-bold">Afterglow</p>
                <p className="text-sm">DJ Lyta</p>
              </div>
            </div>
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
