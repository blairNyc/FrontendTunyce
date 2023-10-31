import { RxDotsVertical } from "react-icons/rx";
import { useState } from "react";
import Videos from "./Videos";
import Live from "./Livestreams";
import Playlist from "./Playlist";
import { useLocation } from "react-router-dom";
import { useGetCreatorContentAndInfoQuery } from "../../components/controller/features";
interface MusicItemProp {
    title: string,
    views: string,
    duration: string,
    image?: string
    number: number
}
import { VideoItem } from "../../components/controller/ControllerCreator";
import SignModal from "../SignModal";
export const MusicItem = ({ number, views, title, duration }: MusicItemProp) => (
    <div className="w-full flex md:flex-row md:overflow-x-scroll flex-col items-center justify-between">
        <div className="w-full flex flex-col md:flex-row my-2 items-center">
            <div className="">
                <span className="hidden md:inline mx-1">0{number}</span>
                <img src="https://picsum.photos/200/300" alt="" className="w-20 md:w-14 h-14 rounded-2xl inline-block object-cover" />
            </div>
            <div className="inline-block px-1 ">
                <h4 className="font-bold">{title}</h4>
                <p className="text-sm">{views} views</p>
            </div>
        </div>
        <div className="flex items-center">
            <span className="block md:inline mx-1">{duration}</span>
            <RxDotsVertical className="inline-block m-0 p-0 text-md text-graybasic font-bold" />
        </div>
    </div>
)

type ActiveNavItem = 'videos' | 'livestreams' | 'about' | 'settings';

function Creator() {

    const [activeNav, setActiveNav] = useState<ActiveNavItem>('videos');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const {state} = useLocation();
    const {data} = useGetCreatorContentAndInfoQuery(state.id);
    console.log(state,data,'dfddb');
    const handleTabChange = (navItem: ActiveNavItem) => {
        setActiveNav(navItem);
    };
    const toggleModal = () => {
        setOpenModal(!openModal);
    }
    return (
        <>
            <div className="w-full mt-5">
                <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-3 md:col-span-4 gap-6">
                        <div style={{ backgroundImage: "url('https://picsum.photos/200/300')" }} className="w-full h-52 bg-cover bg-center rounded-lg relative">
                            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-gray-500 to-transparent rounded-lg"></div>
                            <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end px-4 pb-4">
                                <img src="https://picsum.photos/200/300" alt="" className="w-28 border-white absolute -bottom-11 border-4 h-28 rounded-full object-cover" />
                            </div>
                        </div>
                        <div className="flex items-center mt-14">
                            <div className="inline-block px-1 ">
                                <h2 className="font-bold text-2xl text-black">{state.name}</h2>
                                <span className="text-sm font-bold text-black">30K Followers | </span>
                                <span className="text-sm font-bold  text-black">40 Videos | </span>
                                <span className="text-sm font-bold text-black">40 Livestreams</span>
                                <span></span>
                            </div>
                        </div>
                        <div className="mb-4  border-b border-gray-200 dark:border-red-600">
                            <ul className="flex overflow-x-auto -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                                <li className="mr-1" role="presentation">
                                    <button
                                        className={`inline-block py-4 px-2 rounded-t-lg ${activeNav === 'videos' ? 'text-orange-500 font-semibold border-b-2 border-orange-500' : ''
                                            }`}
                                        onClick={() => handleTabChange('videos')}
                                        role="tab"
                                        aria-controls="profile"
                                        aria-selected={activeNav === 'videos' ? 'true' : 'false'}
                                    >
                                        Videos
                                    </button>
                                </li>
                            </ul>
                            <div className="component-container">
                            <div className="w-full h-full relative mt-3">
                                <div className="overflow-y-scroll grid grid-cols-2 md:grid-cols-3 no-scrollbar ">
                                    {
                                        data?.map((item)=>(
                                            <VideoItem
                                                name={item.name}
                                                key={item.id}
                                                views={item.views ?? 10}
                                                description=""
                                                media={item.media}
                                                owner={item.owner}
                                                id={item.id}
                                                onClick={toggleModal}
                                                video_thumbnail={item.video_thumbnail}
                                                created_at={item.created_at} genres={{
                                                    id: 0,
                                                    name: "",
                                                    image: "",
                                                    description: "",
                                                    genreId: 0
                                                }}                                            />
                                        ))
                                    }
                                </div>
                            </div>
                                {activeNav === 'videos' && <Videos />}
                                {activeNav === 'livestreams' && <Live />}
                                {activeNav === 'settings' && <Playlist />}
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-1 col-span-3">
                        
                    </div>
                </div>
            </div>
            <SignModal isOpen={openModal} onClose={toggleModal} />
        </>
    );
}

export default Creator;