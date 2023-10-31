import { BsPlayCircle } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useGetCreatorContentAndInfoQuery, useSwitchContentMutation } from "./features";
import LoadingSpinner from "../LoadingSpinner";
import { MusicItemProp } from "../../types";
import { RootState } from "../../app/store";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { SnackBar } from "../auth/userLogin";
import { SuccessPopUp } from "./ControllerMusicPage";
interface MusicItPrp extends MusicItemProp{
    onClick: (mediaUrl:string| number)=>void
}
const dateDiff = (date1:Date,date2:Date)=>{
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
}
export const VideoItem = ({name,views,created_at, onClick,id, video_thumbnail}:MusicItPrp)=>{
    const date = new Date(created_at);
    return(
        <div onClick={()=>{onClick(id)}} className="md:w-56 w-44 hover:bg-gray-100 border-gray-300 m-2  min-h-[100px] min-w-[90px] xl:min-w-[100px] md:min-w-[190px] border p-2 md:p-2 rounded">
            <div className="w-full h-32 relative">
                <span className="absolute bottom-0 left-0 mx-2 flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orangered opacity-75"></span>
                    <BsPlayCircle className="relative mb-9 inline-flex rounded-full h-6 w-6 bg-orangered"/>
                </span>
                <img src={video_thumbnail} alt="" className="w-full h-full object-cover rounded"/>
                <p className="absolute bottom-0 right-0 mx-2 font-bold text-white">3.35</p>
            </div>
            <div className="my-2">
                <h3 className="text-text-primary font-semibold text-sm md:text-lg">{name?name.slice(0,20)+'...':'Name'}</h3>
                <p className="text-text-secondary my-1 text-xs">{views} Views . {dateDiff(date,new Date())} days ago </p>
            </div>
        </div>
    )
};
function ControllerCreator() {
    const {id} = useParams<{id:string}>();
    console.log(id);
    const {data,isLoading}=useGetCreatorContentAndInfoQuery(id);
    console.log(data);
    const [switchContent,{isLoading:isLoadingSwitch, isSuccess, isError,}] = useSwitchContentMutation()
    const d = useAppSelector((state:RootState)=>state.persistController.controller.matatu.id);
    const [openModal,setOpenModal] = React.useState(false);
    const handleSwitchContent = async (mediaUrl:string|number)=>{
        console.log('Attempting to swtich music')
        const data = {
            mediaID:mediaUrl,
            matatuID:d
        }
        console.log(data);
        try {
            const response = await switchContent(data).unwrap();
            console.log(response);
            setOpenModal(!openModal);
        } catch (error) {
            console.log(error)
            return;
        }
    }
    return (
        <>
            {isLoading&&<LoadingSpinner/>}
            {isLoadingSwitch&&<LoadingSpinner/>}
            {isError&&<SnackBar text={'Error encountered'}/>}
            {isSuccess &&openModal &&<SuccessPopUp closeModal={()=>{setOpenModal(!openModal)}} text={'Music switched successfully'}/>}
            
            {
                !data ||data?.length===0&&<div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-text-primary">No Content</h1>
                </div>
            }
            <div className="w-full mt-5">
                <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-3 md:col-span-2">
                        <div style={{backgroundImage: "url('https://picsum.photos/200/300')"}} className="w-full h-52 bg-cover bg-center rounded-lg relative">
                            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-gray-500 to-transparent rounded-lg"></div>
                            <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end px-4 pb-4">
                            <img src="https://picsum.photos/200/300" alt="" className="w-28 border-white absolute -bottom-11 border-4 h-28 rounded-full object-cover"/>
                                
                            </div>
                        </div>
                        <div className="flex items-center mt-14">
                            <div className="inline-block px-1 ">
                                <h2 className="font-bold text-2xl text-black">{data?data[0]?.owner.username:''}</h2>
                                <span className="text-sm font-bold  text-black">{data?.length} Videos </span>
                                <span></span>
                            </div>
                        </div>
                        <div className="mb-4  border-b border-gray-200 dark:border-red-600">
                            <ul className="flex overflow-x-auto -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                                <li className="mr-1" role="presentation">
                                    <button className="inline-block py-4 px-2 border-b-2 rounded-t-lg" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Content</button>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full h-full relative mt-3">
                            <div className="overflow-y-scroll grid grid-cols-2 md:grid-cols-3 no-scrollbar ">
                                {
                                    data?.map((item)=>(
                                        <VideoItem
                                            genres={item.genres}
                                            name={item.name}
                                            key={item.id}
                                            views={item.views??10}
                                            description=""
                                            media={item.media}
                                            owner={item.owner}
                                            id={item.id}
                                            onClick={handleSwitchContent}
                                            video_thumbnail={item.video_thumbnail}
                                            created_at={item.created_at}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default ControllerCreator;