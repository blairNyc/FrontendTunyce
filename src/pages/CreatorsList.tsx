// import LoadingSkeletonList from "../components/LoadingSkeletonList";
import {FaShoppingBag} from  'react-icons/fa';
import { useGetAllContentCreatorsQuery } from '../user/UsersState';
import LoadingSkeletonList from '../components/LoadingSkeletonList';
type ContentCreatorsType = {
    email: string
    id: string | number
    username: string
}
import { Link } from 'react-router-dom';
const CreatorItem = ({username,id}:ContentCreatorsType)=>(
    <div className="md:w-56 w-44 cursor-pointer hover:bg-gray-100 border-gray-300 m-2  min-h-[100px] min-w-[90px] xl:min-w-[100px] md:min-w-[190px]  p-2 md:p-2 rounded-md">
        <Link to={`/creators/deejays/${id}`}>
            <img src="https://picsum.photos/200/300" alt="" className="w-full h-32 object-cover rounded-md"/>
        </Link>
        <div className="my-2">
            <h3 className="font-semibold z-10 text-xs md:text-sm">{username}</h3>
            <p className="text-text-secondary my-1 text-xs">Catch the latest and greatest funny videos from {username}</p>
        </div>
        <div className="flex items-center  justify-evenly md:justify-between">
            <span className="uppercase flex cursor-pointer items-center font-bold text-lg md:text-sm">
                <FaShoppingBag className="text-text-primary  mx-1 inline-block"/>
                <span className='hidden border-b border-[#FB5857] md:block'>Subscribe</span>
            </span>
        </div>
    </div>
)
function CreatorsList() {
    const {data,isLoading} = useGetAllContentCreatorsQuery(1);
    return (
        <div className="mt-5">
            <h2 className="text-2xl text-text-primary font-bold">All Deejays</h2>
                {
                    isLoading?(
                        <LoadingSkeletonList/>
                    ):(

                        <div className="mt-1 grid  grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2">
                            {
                                data?.map((contentCreator,index)=>(
                                    <CreatorItem id={contentCreator.id} username={contentCreator.username} email={contentCreator.email}  key={index}/>
                                ))
                            }
                        </div>
                    )
                }
        </div>
    );
}

export default CreatorsList;