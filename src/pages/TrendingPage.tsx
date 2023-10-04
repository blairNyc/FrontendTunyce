import { BsPlayCircle } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useGetAllTrendingMixesQuery } from "../app/api/GlobalApiSlice";
import SignModal from './SignModal';
import { useState } from "react";
import { Mix } from "../types";

const calculateDaysSinceCreation = (createdDateStr: string) => {
    const createdDate = new Date(createdDateStr);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdDate.getTime();
    return Math.floor(timeDifference / (24 * 60 * 60 * 1000)); // Calculate days
};

const VideoItem = ({ mix, onClick }: { mix: any; onClick: () => void }) => {
    const daysSinceCreation = calculateDaysSinceCreation(mix.created_at);

    return (
        <div onClick={onClick} className="cursor-pointer md:w-52 w-40 my-1 hover:bg-gray-100 border-gray-320 md:m-2 min-h-[100px] min-w-[90px] xl:min-w-[320px] md:min-w-[190px]  rounded-lg">
            <div className="w-full h-32 relative flex items-center justify-center">
                <span className="absolute mx-2 flex h-6 w-6" style={{ bottom: '50%', left: '50%', transform: 'translate(-50%, 50%)' }}>
                    <BsPlayCircle className="mb-9 inline-flex rounded-full h-6 w-6 bg-orangered" />
                </span>
                <img src={mix && mix.video_thumbnail ? mix.video_thumbnail :
                    'https://png.pngtree.com/png-vector/20190605/ourmid/pngtree-headphones-icon-png-image_1477434.jpg'} alt="" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="my-2">
                <h3 className="text-text-primary font-semibold text-sm md:text-lg overflow-hidden line-clamp-2">{mix.name}</h3>
                <p className="text-text-secondary my-1 text-sm font-bold">{mix.owner?.username}</p>
                {daysSinceCreation >= 30 ? (
                    <p className="text-text-secondary my-1 text-xs mx-2">{mix.views} Views . {Math.floor(daysSinceCreation / 30)} months ago</p>
                ) : (
                    <p className="text-text-secondary my-1 text-xs mx-2">{mix.views} Views . {daysSinceCreation} days ago</p>
                )}
            </div>
        </div>
    );
};

function TrendingPage() {
    const { data: trendingMixes } = useGetAllTrendingMixesQuery([]);
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
                {trendingMixes.slice(0, 9).map((mix: Mix) => (
                    <VideoItem onClick={() => openModal()} key={mix.id} mix={mix} />
                ))}
            </div>
            <SignModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default TrendingPage;