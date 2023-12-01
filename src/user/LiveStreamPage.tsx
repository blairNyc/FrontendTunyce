import { BiPlusCircle, BiShuffle } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import { useGetAllMixesQuery, useGetAllStreamsQuery} from "../app/api/GlobalApiSlice";
import { LiveStream, Mix } from "../types";
import AddToPlaylist from "./components/AddToPlaylist";
import React from "react";
import {  useGetAllPlayListsQuery } from "./UsersState";
import { Stream } from "stream";
const LiveStreamPage = () => {
	const {data} = useGetAllPlayListsQuery(1);
    const playLists = data?data.map((playlist:{id:number,playlist_name:string})=>({id:playlist.id, name:playlist.playlist_name})):[];
	const { data: allMixes,isLoading:isLoadingMix } = useGetAllStreamsQuery(1);
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const [content,setContent] = React.useState<number>(0);
	const toggleModal = () => {setIsOpen(!isOpen)}
	console.log(playLists,"Live Stream");
	return (
		<>
			<div className="container">

			

				{/*Subtitles*/}
				<div className="flex justify-between">
					<div className="text-red-600">
						<h5 className=" sm:text-base md:text-xl lg:2xl">Live Streams</h5>
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
				<div className="w-4/4   p-6 bg-white">
					<iframe
						className="w-4/4 h-full"
						src="https://customer-dlfgw97wf2jxho9p.cloudflarestream.com/ea9e056c360c2e8faf11eff9a0815f0b/iframe"
						// style={"border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"}
						allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
						// allowfullscreen="true"
					></iframe>
				</div>

				<div className="md:ml-10 md:mr-10 mx-auto mt-4 rounded-md bg-white">
				<h4 className="font-semibold text-base mb-3 mt-2"> </h4>
				{/*Grid*/}
				<div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4 md:mr-2 md:ml-2">
			
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
					) : 
					allMixes?.map((stream:LiveStream) => (
						<div className="px-2">
							<img
								src={stream.thumbnail}
								alt=""
								className="w-full h-32 rounded-md shadow-md"
							/>
							<div className="">
								<p className="text-base font-bold">{stream.name.slice(0,10)}...</p>
								
							</div>
						<div className="flex justify-evenly">
								<button className="flex border items-center sm:text-sm md:text-md lg:text-sm">
									<BsFillPlayFill />
									Play
								</button>
								<button onClick={()=>{setContent(stream.playing_url as unknown as number); toggleModal()}} className="flex border font-bold p-1 items-center sm:text-sm md:text-md lg:text-sm ml-1">
									<BiPlusCircle/>Playlist
								</button>
							</div>
						</div>
					))
					}
				</div>
				{/*End Grid*/}
				</div>
				{/*End Main Card*/}
			</div>
			{
				isOpen ? (
					<AddToPlaylist contentId={content} playLists={playLists} toggleModal={toggleModal} isOpen={isOpen} />
				) : null
			}
		</>
	);
};
export default LiveStreamPage;
