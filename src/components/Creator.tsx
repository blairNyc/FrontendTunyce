import {  RxDotsVertical } from "react-icons/rx";
import { BsPlayCircle } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useGetCreatorContentAndInfoQuery } from "./controller/features";
import LoadingSpinner from "./LoadingSpinner";
// import { MusicItem } from "../user/ExplorePage";
interface MusicItemProp{
    title:string,
    views:string,
    duration:string,
    image?:string
    number: number
}
const VideoItem = ()=>(
    <a href="/creators/videos/3" className="md:w-56 w-44 hover:bg-gray-100 border-gray-300 m-2  min-h-[100px] min-w-[90px] xl:min-w-[100px] md:min-w-[190px] border p-2 md:p-2 rounded">
        <div className="w-full h-32 relative">
            <span className="absolute bottom-0 left-0 mx-2 flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orangered opacity-75"></span>
                <BsPlayCircle className="relative mb-9 inline-flex rounded-full h-6 w-6 bg-orangered"/>
            </span>
            <img src="https://picsum.photos/200/300" alt="" className="w-full h-full object-cover rounded"/>
            <p className="absolute bottom-0 right-0 mx-2 font-bold text-white">3.35</p>
        </div>
        <div className="my-2">
            <h3 className="text-text-primary font-semibold text-sm md:text-lg">Anyone</h3>
            <p className="text-text-secondary my-1 text-xs">10k Views . 10 days ago </p>
        </div>
    </a>
);
const MusicItem = ({number,views, title, duration}: MusicItemProp) => (
    <div className="w-full flex md:flex-row md:overflow-x-auto flex-col items-center justify-between">
        <div className="w-full flex flex-col md:flex-row my-2 items-center">
            <div className="">
                <span className="hidden md:inline mx-1">0{number}</span> 
                <img src="https://picsum.photos/200/300" alt="" className="w-20 md:w-14 h-14 rounded-xl inline-block object-cover"/>
            </div>
            <div className="inline-block px-1 ">
                <h4 className="font-bold">{title}</h4>
                <p className="text-sm">{views} views</p>
            </div>
        </div>
        <div className="flex items-center">
            <span className="block md:inline mx-1">{duration}</span> 
            <RxDotsVertical className="inline-block m-0 p-0 text-md text-graybasic font-bold"/>
        </div>
    </div>
)
function Creator() {
    const {id} = useParams<{id:string}>();
    console.log(id);
    const {data,isLoading}=useGetCreatorContentAndInfoQuery(id);
    console.log(data);
    return (
        <>
            {
                isLoading&&<LoadingSpinner/>
            }
            <div className="w-full mt-5">
                <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-3 md:col-span-2">
                        <div style={{backgroundImage: "url('https://picsum.photos/200/300')"}} className="w-full h-52 bg-cover bg-center rounded-lg relative">
                            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-gray-500 to-transparent rounded-lg"></div>
                            <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end px-4 pb-4">
                            <img src="https://picsum.photos/200/300" alt="" className="w-28 border-white absolute -bottom-11 border-4 h-28 rounded-full object-cover"/>
                                
                                {/* <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <FaPlay className="text-white text-2xl"/>
                                        <p className="text-white text-sm ml-1">Play All</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="flex items-center mt-14">
                            <div className="inline-block px-1 ">
                                <h2 className="font-bold text-2xl text-black">Justin Beiber</h2>
                                <span className="text-sm font-bold  text-black">30K Followers | </span>
                                <span className="text-sm font-bold  text-black">40 Videos | </span>
                                <span className="text-sm font-bold text-black">40 Livestreams</span>
                                <span></span>
                            </div>
                        </div>
                        <div className="mb-4  border-b border-gray-200 dark:border-red-600">
                            <ul className="flex overflow-x-auto -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                                <li className="mr-1" role="presentation">
                                    <button className="inline-block py-4 px-2 border-b-2 rounded-t-lg" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Videos</button>
                                </li>
                                <li className="mr-2" role="presentation">
                                    <button className="inline-block py-4 px-2 border-b-2 border-transparent rounded-t-lg hover:text-red-600 " id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Livestreams</button>
                                </li>
                                <li className="mr-2" role="presentation">
                                    <button className="inline-block py-4 px-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Settings</button>
                                </li>
                                <li role="presentation">
                                    <button className="inline-block py-4 px-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">About</button>
                                </li>
                                <li role="presentation">
                                    <button className="inline-block py-4 px-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">About</button>
                                </li>
                                <li role="presentation">
                                    <button className="inline-block py-4 px-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">About</button>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full h-full relative mt-3">
                            <div className="overflow-y-scroll no-scrollbar flex items-center">
                                <VideoItem/>
                                <VideoItem/>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-1 col-span-3">
                        <div className='flex justify-between items-center'>
                            <h3 className='font-bold'>Latest Songs</h3>
                            <p className="text-text-primary font-light text-sm">See all</p>
                        </div>
                        <div className="w-full h-full relative mt-3">
                            <div className="overflow-y-scroll no-scrollbar flex md:flex-col">
                                <MusicItem number={1} views='30K' title="Anyone"  duration='03.11'/>
                                <MusicItem number={2} views='10K' title="Champion"  duration='06.26'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Creator;