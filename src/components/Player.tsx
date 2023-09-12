import {RxDotFilled} from "react-icons/rx";
// import {PiShuffleLight} from "react-icons/pi";
// import {FaBackward, FaStepForward} from "react-icons/fa";
// import {RxLoop} from "react-icons/rx";
// import {BsPauseCircleFill as BsPause} from "react-icons/bs";
interface MusicItemProp{
    title:string,
    artist:string,
    duration:string,
    image?:string
    number: number
}
const MusicItem = ({number,artist, title, duration}: MusicItemProp) => (
    <div className="w-full flex items-center justify-between">
        <div className="flex my-2 items-center">
            <div>
                <span className=" mx-1">0{number}</span> 
                <img src="https://picsum.photos/200/300" alt="" className="w-14 h-14 rounded-xl inline-block object-cover"/>
            </div>
            <div className="inline-block px-1 ">
                <h4 className="font-bold">{title}</h4>
                <p>{artist}</p>
            </div>
        </div>
        <div>
            <span className=" mx-1">{duration}</span> 
            <RxDotFilled className="inline-block m-0 p-0 text-md text-graybasic font-bold"/>
            <RxDotFilled className="inline-block m-0  text-md text-graybasic font-bold"/>
        </div>
    </div>
)
function Player() {
    return (
        <div className='w-1/4 h-full  rounded-t-2xl p-6 bg-white fixed right-0 top-3'>
            <div className='flex justify-between items-center'>
                <h3 className='font-bold'>Latest Songs</h3>
                <p className="text-text-primary font-light text-sm">More List</p>
            </div>
            <div className="w-full h-full relative mt-3">
                <div className="h-2/4 overflow-y-scroll ">
                    <MusicItem number={1} artist='Justin Beiber' title="Anyone"  duration='03.11'/>
                    <MusicItem number={2} artist='Bethel Music' title="Champion"  duration='06.26'/>
                </div>
                {/* <div className="border-t-2 py-1 h-2/4 border-textbasicgray flex flex-col items-center">
                    <h4>NOW PLAYING</h4>
                    <img src="https://picsum.photos/200/300" alt="" className="w-4/5 rounded-xl h-32 object-cover"/>
                    <h4 className="font-bold ">Dynamite</h4>
                    <p>BTS</p>
                    <div className="relative w-full mb-0 pt-1">
                        <div className="mb-3 h-1 flex overflow-hidden rounded bg-gray-100 text-xs">
                            <div style={{width: "80%"}} className="bg-text-primary"></div>
                        </div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                            <div className="text-text-primary font-semibold">2.18</div>
                            <div className="text-black font-semibold">3.00</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-evenly w-full">
                        <PiShuffleLight className="text-graybasic text-2xl"/>
                        <FaBackward className="text-text-primary text-2xl"/>
                        <BsPause className="text-text-primary text-4xl"/>
                        <FaStepForward className="text-text-primary text-2xl"/>
                        <RxLoop className="text-graybasic text-2xl"/>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Player;