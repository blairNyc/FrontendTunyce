import {  BiPlay, BiShuffle } from "react-icons/bi";

import { BsFillPlayFill } from "react-icons/bs";
import { useLocation, useParams } from "react-router-dom";
import { useGetPlaylistQuery } from "./UsersState";
import { MediaInformation } from "../types";
import { Link } from "react-router-dom";
const PlaylistMusic = ({content}:Props)=>(
    <div className="container  p-2 cursor-pointer min-w-[130px] md:min-w-[180px] hover:bg-slate-100 bg-white shadow-md w-4/5 md:w-2/3 flex flex-col mt-2 ">
        <div className="px-auto">
            <img src={content.video_thumbnail} className="w-5/5 h-auto bg-gray-400  rounded-sm "/>
        </div>
        <div className=" py-2">
            <h4 className="text-xs md:text-sm font-semibold">
                {content.name?content.name.slice(0,15)+'...':''}
            </h4>
            <h6 className="text-xs font-semibold text-gray-600">
                {content.owner?content.owner.username.slice(0,10):''}
            </h6>
        </div>
        <div className="flex  justify-evenly">
            <button className="text-sm bg-text-primary text-white rounded-xl flex items-center px-4">
                <BiPlay /> <span>Play</span>
            </button>
        
        </div>
    </div>
);
interface Props{
    content: MediaInformation
    content_type: string
}
export default function PlayListPage(){
    const {id} = useParams<{id:string}>();
    console.log(id);
    const {state} = useLocation();
    const {data} = useGetPlaylistQuery(id);
    console.log(data,'playlist',state);
    return (
        <>
            <div className="container">
                    <div className="flex justify-between">
                        <div className="text-red-600">
                            <h5 className=" sm:text-base md:text-xl lg:2xl">{state.playlist_name}</h5>
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
                    <div className="mx-auto mt-5 flex flex-col  ">
                    {/*Card*/}
                        {
                            (!data || data.length <=0) ? (
                            <div className="flex flex-col mt-4 items-center">
                                <img src="/empty.jpg" className=" w-1/2 md:w-1/3"/>
                                <p className="text-center text-sm font-bold">
                                    Seems like you don't have any songs in your playlist
                                </p>
                                <Link to={'/mixes'} className="flex rounded-full items-center border bg-text-primary py-1 px-2" >
                                    <h4 className="ml-2 text-white font-bold mr-3">Add Content</h4>
                                </Link>
                            </div>) :
                            <div className="mt-1 grid  grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
                                {data.map((info:Props)=>(
                                    <PlaylistMusic 
                                        content={info.content}
                                        content_type={info.content_type}
                                    />
                                ))}
                            </div>
                        }
                    </div>
            </div>
        </>
    );
}
