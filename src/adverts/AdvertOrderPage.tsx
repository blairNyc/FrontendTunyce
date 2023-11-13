import { BiShuffle, BiDotsVerticalRounded } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import {useGetAdvertReportsQuery} from "../app/api/GlobalApiSlice";
// import { LoadingSkeleton } from "./LoadingSkeletonList";
// import { useSwitchContentMutation } from "./features";
interface MusicItPrp extends MusicItemProp {
    onClick: (mediaUrl: string | number) => void
}
export const SuccessPopUp = ({ text, closeModal }: { text: string, closeModal: (val: boolean) => void }) => (
    <div className="w-screen bg-black-rgba overflow-hidden absolute h-screen top-0 left-0 z-50">
        <div className="p-4 relative flex flex-col items-center top-1/2 left-1/3 mb-4 text-sm w-1/3 text-green-800 rounded-2xl bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <AiOutlineClose onClick={closeModal} className="text-black text-2xl absolute mb-2 right-0 cursor-pointer font-bold" />
            <div className="m-2">
                <FiCheckCircle className="text-green-500 text-9xl" />
                <h5 className="block font-bold ">{text}</h5>
            </div>
        </div>
    </div>
)

interface MusicItemProp {
    name: string;
    description: string;
    id: number;
    media: {
        id: number
        media_url: string
    }
    genres:{
        id: number;
        name: string;
        image: string;
        description: string;
        genreId: number;
    }
    owner: {
        id: number
        username: string
        email: string
    }
    video_thumbnail: string,
}
export interface Genre {
    id: number;
    name: string;
    image: string;
    description: string;
    genreId: number;
}
// import { ErrorType } from "../../types";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { AiOutlineClose } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { SnackBar } from "../components/auth/userLogin";
import { LoadingSkeleton } from "../components/LoadingSkeletonList";
import { useSwitchContentMutation } from "../components/controller/features";
export default function AdvertOrderPage() {
    const { data, isError: isErrorMusicFetch, isLoading } = useGetAdvertReportsQuery(1);
    const [latestMusic,setLatestMusic] = useState(data)
 
    // const [switchContent, { isLoading: isLoadingSwitch, isSuccess, isError, error }] = useSwitchContentMutation()

    const [switchContent, { isLoading: isLoadingSwitch, isSuccess, isError }] = useSwitchContentMutation()
    let d : number = useAppSelector((state: RootState) => state.persistController.controller.matatu.id);
    if (!d) {
        d = 1;
    }
    const [openModal, setOpenModal] = React.useState(false);
    const handleSwitchContent = async (mediaUrl: string | number) => {
        const data = {
            mediaID: mediaUrl,
            matatuID: d
        }
        try {
            await switchContent(data).unwrap();
            setOpenModal(!openModal);
        } catch (error) {
            return;
        }
    }
    useEffect(()=>{
        setLatestMusic(data)
    },[data])
    const handleSelect = async(e: React.ChangeEvent<HTMLSelectElement>)=>{
        setLatestMusic(data?.filter((mus)=>mus?.genres?.id===parseInt(e.target.value)))
    }
    console.log(latestMusic);
    return (
        <>
            <div className="overflow-x-hidden relative p-50 overflow-y-scroll">
                <div className="p-10 justify-between">
                    <div className="text-red-600">
                        <h5 className=" sm:text-base md:text-xl lg:2xl">Exciting News! Coming Soon!</h5>
                    </div>
                    <div className="flex gap-x-5 text-red-600">
                       <h5>
                       Very Soon You'll be able to schedule your adverts on a route by route basis! Stay Tuned! 
                       </h5>
                    </div>
                </div>
            
            
            </div>
        </>
    );
}