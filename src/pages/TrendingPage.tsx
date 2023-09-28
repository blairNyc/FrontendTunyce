import { BsPlayCircle } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useGetAllTrendingMixesQuery } from "../app/api/GlobalApiSlice";
import SignModal from './SignModal';
import { useState } from "react";

const VideoItem = ({ mix, onClick }: { mix: any, onClick: () => void }) => (
    <div onClick={onClick} className="cursor-pointer md:w-52 w-40 my-1 hover:bg-gray-100 border-gray-320 md:m-2 min-h-[100px] min-w-[90px] xl:min-w-[320px] md:min-w-[190px]  rounded-lg">
        <div className="w-full h-32 relative">
            <span className="absolute bottom-0 left-0 mx-2 flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orangered opacity-75"></span>
                <BsPlayCircle className="relative mb-9 inline-flex rounded-full h-6 w-6 bg-orangered" />
            </span>
            <img src={mix.video_thumbnail} alt="" className="w-full h-full object-cover rounded-lg" />
            <p className="absolute bottom-0 right-0 mx-2 font-bold text-white">{mix.views} Views</p>
        </div>
        <div className="my-2">
            <h3 className="text-text-primary font-semibold text-sm md:text-lg overflow-hidden line-clamp-2">{mix.name}</h3>
            <p className="text-text-secondary my-1 text-sm font-bold">{mix.owner?.username}</p>
            <p className="text-text-secondary my-1 text-xs">10k Views . 10 days ago</p>
        </div>
    </div>
);
function TrendingPage() {

    const { data: trendingMixes } = useGetAllTrendingMixesQuery([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (trendingMixes === undefined) {
        return (
            <div className="w-full h-full py-8">
                {/* Render loading indicator or placeholder */}
                <p>Loading...</p>
            </div>
        );
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='w-full mt-4 h-full'>
            <header className="w-full mt-3 flex items-center justify-between">
                <div className="flex items-center justify-between rounded-2xl px-2 w-4/5 md:w-1/3 bg-gray-200">
                    <input type="text" placeholder="Search for trending content..." className="w-full border-none focus:border-none bg-inherit h-full rounded-2xl px-2 py-1 outline-none" />
                    <FiSearch className="text-2xl text-black mx-2" />
                </div>
                <div className="hidden md:flex md:flex-row flex-col items-center">
                    <button className="border px-4 my-2 rounded-2xl border-black ">Sign Up</button>
                    <button className="px-4 py-1 my-2 mx-3 bg-text-primary rounded-2xl text-white font-semibold">Sign In</button>
                </div>
            </header>
            <h2 className="text-2xl text-text-primary font-bold">Trending Content</h2>
            <div className="mt-1 flex flex-wrap">
                {trendingMixes.slice(0,10).map((mix: any) => (
                    <VideoItem onClick={() => openModal()} key={mix.id} mix={mix} />
                ))}
            </div>
            <SignModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default TrendingPage;