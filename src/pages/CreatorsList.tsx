// import LoadingSkeletonList from "../components/LoadingSkeletonList";
import {FaShoppingBag} from  'react-icons/fa' 
import {BsFillInfoCircleFill} from  'react-icons/bs';
const CreatorItem = ()=>(
    <div className="md:w-56 w-44 hover:bg-gray-100 border-gray-300 m-2  min-h-[100px] min-w-[90px] xl:min-w-[100px] md:min-w-[190px] border p-2 md:p-2 rounded">
        <img src="https://picsum.photos/200/300" alt="" className="w-full h-32 object-cover rounded"/>
        <div className="my-2">
            <h3 className="text-text-primary font-extrabold uppercase text-sm md:text-lg">Deejay Name</h3>
            <p className="text-text-secondary md:font-semibold my-1 text-xs">Catch the latest and greatest funny videos from deejay kena</p>
        </div>
        <div className="flex items-center my-2 justify-evenly md:justify-between">
            <span className="uppercase flex cursor-pointer items-center font-bold text-lg md:text-sm">
                <FaShoppingBag className="text-text-primary  mx-1 inline-block"/>
                <span className='hidden md:block'>Subscribe</span>
            </span>
            <a className='uppercase p-1 flex items-center no-underline dark:text-white text-lg md:text-sm md:bg-text-primary font-bold' href="/creators/deejays/2">
                <BsFillInfoCircleFill className="font-bold md:text-white text-text-primary inline-block mx-1"/>
                <span className='hidden md:block'>View Info</span>
            </a>
        </div>
    </div>
)
function CreatorsList() {
    return (
        <div className="mt-5">
            <h2 className="text-2xl text-text-primary font-bold">All Deejays</h2>
                {/* <LoadingSkeletonList/> */}
            <div className="mt-1 grid  grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2">
                {
                    [1,2,3,4,5,6,7,8,9,10,11,12].map((index)=>(
                        <CreatorItem key={index}/>
                    ))
                }
            </div>
        </div>
    );
}

export default CreatorsList;