import { AiOutlineHeart } from "react-icons/ai";
import { BiDotsVerticalRounded, BiShuffle } from "react-icons/bi";

import { BsFillPlayFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useGetPlaylistQuery } from "./UsersState";
const PlaylistMusic = ()=>(
    <div className=" container cursor-pointer hover:bg-slate-100 bg-white shadow-md w-full rounded-lg p-1 mt-2 flex  items-center justify-between">
        <div className="flex">
            <div className=" sm:w-10 md:w-14 lg:w-16 sm:h-10 md:h-14 lg:h-16 bg-gray-400  rounded-sm "></div>
            <div className="ml-4">
                <h4 className="sm:text-sm md:text-md lg:text-lg font-semibold">
                Anyone
                </h4>
                <h6 className="sm:text-xs md:text-sm lg:text-md text-gray-600">
                Justin Bieber
                </h6>
            </div>
        </div>
        <div className="flex ">
            <button className="sm:text-xs md:text-sm lg:text-base sm:mr-5 md:mr-5 lg:mr-10">
                3.22
            </button>
            <button className="sm:text-xs md:text-sm lg:text-base sm:mr-8 md:mr-8 lg:mr-10">
                <AiOutlineHeart />
            </button>
            <button className=" sm:text-xs md:text-sm lg:text-base sm:mr-8 md:mr-8 lg:mr-10">
                <BiDotsVerticalRounded />
            </button>
        </div>
    </div>
)
export default function PlayListPage(){
    const {id} = useParams<{id:string}>();
    console.log(id)
    const {data} = useGetPlaylistQuery(id);
    console.log(data,'playlist');
    return (
        <>
            <div className="container">
                    <div className="flex justify-between">
                        <div className="text-red-600">
                            <h5 className=" sm:text-base md:text-xl lg:2xl">Pop</h5>
                        </div>
                        <div className="flex gap-x-5 text-red-600">
                            <div className="flex">
                            <button className=" sm:text-sm md:text-md lg:text-md">
                                <BsFillPlayFill />
                            </button>
                            <button className=" sm:text-sm md:text-md lg:text-md ml-1">
                                Play
                            </button>
                            </div>
                            <div className="flex mr-2">
                            <button className="sm:text-sm md:text-md lg:text-md">
                                <BiShuffle />
                            </button>
                            <button className="sm:text-sm md:text-md lg:text-md ml-1">
                                Shuffle
                            </button>
                            </div>
                        </div>
                    </div>
                    <div className="ml-10 mr-10 mx-auto mt-5 flex flex-col  ">
                    {/*Card*/}
                        {
                            (!data || data.length <=0) ? (
                            <div className="flex flex-col mt-4 items-center">
                                <img src="/empty.jpg" className=" w-1/2 md:w-1/3"/>
                                <p className="text-center text-sm font-bold">
                                    Seems like you don't have any songs in your playlist
                                </p>
                                <button className="flex rounded-full items-center border bg-text-primary py-1 px-2" onClick={()=>{}}>
                                    <h4 className="ml-2 text-white font-bold mr-3">Add songs</h4>
                                </button>
                            </div>) :
                            <div className="mt-1 grid  grid-cols-2 lg:grid-cols-5 md:grid-cols-3 ">
                                {data.map(()=>(
                                    <PlaylistMusic />
                                ))}
                            </div>
                        }
                    </div>
            </div>
        </>
    );
}
