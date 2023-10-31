import { Link } from 'react-router-dom';
import { useGetAllContentCreatorsQuery } from '../../user/UsersState';
import LoadingSkeletonList from '../../components/LoadingSkeletonList';
import { useAddToCartMutation } from '../../components/controller/features';
import React from 'react';

interface ContentCreatorsType  {
    email: string
    id: string | number
    username: string
    onClick?: (id:string|number)=>void
}
interface CreatorItemProp extends ContentCreatorsType{
    onClick: (id:string|number)=>void
}
const CreatorItem = ({username,id,onClick}:CreatorItemProp)=>(
    <div className="md:w-56 w-44 cursor-pointer border-gray-300 m-2  min-h-[100px] min-w-[90px] xl:min-w-[100px] md:min-w-[190px]  p-2 md:p-2 rounded-md">
        <Link to={`/creators/deejays/${id}`}>
            <img src="https://picsum.photos/200/300" alt="" className="w-full h-32 object-cover rounded-md"/>
        </Link>
        <div className="my-2">
            <h3 className="font-semibold z-10 text-xs md:text-sm">{username}</h3>
            <p className="text-text-secondary my-1 text-xs">Catch the latest and greatest funny videos from {username}</p>
        </div>
        <button onClick={()=>onClick(id)} className="uppercase p-1 hover:bg-gray-200 border cursor-pointer items-center font-bold text-lg md:text-sm">
            <span className='hidden   text-xs md:block'>Subscribe</span>
        </button>
        
    </div>
)
function CreatorsList() {
    const {data,isLoading} = useGetAllContentCreatorsQuery(1);
    const [openModal,setOpenModal] = React.useState(false);
    const [addToCart,{isSuccess}]=useAddToCartMutation();
    const toggleModal = ()=>{
        setOpenModal(!openModal);
    }
    async function handleSubscribe(id:string|number){
        console.log('Subscribed',id);
        try {
            const response =await addToCart({creatorID:id}).unwrap();
            console.log(response);
            setOpenModal(!openModal);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="mt-5">
            <h2 className="text-2xl text-text-primary font-bold">All Deejays</h2>
            {
                isLoading?(
                    <LoadingSkeletonList/>
                ):(

                    <div className="mt-1 grid  grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2">
                        {
                            data?.map((contentCreator:ContentCreatorsType,index)=>(
                                <CreatorItem id={contentCreator.id} onClick={handleSubscribe} username={contentCreator.username} email={contentCreator.email}  key={index}/>
                            ))
                        }
                    </div>
                )
            }
            {
                isSuccess && openModal &&(
                <div className='absolute top-0 right-0'>
                    <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            <span className="sr-only">Check icon</span>
                        </div>
                        <div className="ml-3 text-sm font-normal">Successfully Subscribed.</div>
                        <button onClick={toggleModal} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                </div>)
            }
        </div>
    );
}

export default CreatorsList;