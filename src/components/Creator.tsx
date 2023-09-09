// import { FaPlay } from "react-icons/fa6";
import { RxDotFilled } from "react-icons/rx";

interface MusicItemProp{
    title:string,
    views:string,
    duration:string,
    image?:string
    number: number
}
const MusicItem = ({number,views, title, duration}: MusicItemProp) => (
    <div className="w-full flex items-center justify-between">
        <div className="flex my-2 items-center">
            <div>
                <span className=" mx-1">0{number}</span> 
                <img src="https://picsum.photos/200/300" alt="" className="w-14 h-14 rounded-xl inline-block object-cover"/>
            </div>
            <div className="inline-block px-1 ">
                <h4 className="font-bold">{title}</h4>
                <p className="text-sm">{views} views</p>
            </div>
        </div>
        <div>
            <span className=" mx-1">{duration}</span> 
            <RxDotFilled className="inline-block m-0 p-0 text-md text-graybasic font-bold"/>
            <RxDotFilled className="inline-block m-0  text-md text-graybasic font-bold"/>
        </div>
    </div>
)
function Creator() {
    return (
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
                    <div className="mb-4 border-b border-gray-200 dark:border-red-600">
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                            <li className="mr-2" role="presentation">
                                <button className="inline-block p-4 border-b-2 rounded-t-lg" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Videos</button>
                            </li>
                            <li className="mr-2" role="presentation">
                                <button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-red-600 " id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Livestreams</button>
                            </li>
                            <li className="mr-2" role="presentation">
                                <button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Settings</button>
                            </li>
                            <li role="presentation">
                                <button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">About</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="md:col-span-1">
                    <div className='flex justify-between items-center'>
                        <h3 className='font-bold'>Latest Songs</h3>
                        <p className="text-text-primary font-light text-sm">See all</p>
                    </div>
                    <div className="w-full h-full relative mt-3">
                        <div className="overflow-y-scroll ">
                            <MusicItem number={1} views='30K' title="Anyone"  duration='03.11'/>
                            <MusicItem number={2} views='10K' title="Champion"  duration='06.26'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Creator;