import { BsPlayCircle } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

const VideoItem = ()=>(
    <a href="/trending/3" className="md:w-52 w-40 my-1 hover:bg-gray-100 border-gray-300 md:m-2  min-h-[100px] min-w-[90px] xl:min-w-[100px] md:min-w-[190px] border p-2 md:p-2 rounded">
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
            <p className="text-text-secondary my-1 text-sm font-bold"> Dj Lensy</p>
            <p className="text-text-secondary my-1 text-xs">10k Views . 10 days ago </p>
        </div>
    </a>
);
function TrendingPage() {
    return (
        <div className='w-full mt-4 h-full'>
            <header className="w-full mt-3 flex items-center justify-between">
                <div className="flex items-center justify-between rounded-2xl px-2 w-4/5 md:w-1/3 bg-gray-200">
                    <input type="text" placeholder="Search for trending content..." className="w-full border-none focus:border-none bg-inherit h-full rounded-2xl px-2 py-1 outline-none"/>
                    <FiSearch className="text-2xl text-black mx-2"/>
                </div>
                <div className="hidden md:flex md:flex-row flex-col items-center">
                    <button className="border px-4 my-2 rounded-2xl border-black ">Sign Up</button>
                    <button className="px-4 py-1 my-2 mx-3 bg-text-primary rounded-2xl text-white font-semibold">Sign In</button>
                </div>
            </header>
            <h2 className="text-2xl text-text-primary font-bold">Trending Content</h2>
            <div className="mt-1 grid  grid-cols-2 lg:grid-cols-5 md:grid-cols-3 md:gap-2">
                <VideoItem/>
                <VideoItem/>
                <VideoItem/>
                <VideoItem/>
                <VideoItem/>
                <VideoItem/>
            </div>
        </div>
    );
}

export default TrendingPage;