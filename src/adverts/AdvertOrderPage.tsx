import {useGetAdvertReportsQuery} from "../app/api/GlobalApiSlice";
// import { LoadingSkeleton } from "./LoadingSkeletonList";
// import { useSwitchContentMutation } from "./features";
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
import { useEffect, useState } from "react";
export default function AdvertOrderPage() {
    const { data } = useGetAdvertReportsQuery(1);
    const [latestMusic,setLatestMusic] = useState(data)
 
    // const [switchContent, { isLoading: isLoadingSwitch, isSuccess, isError, error }] = useSwitchContentMutation()

    let d : number = useAppSelector((state: RootState) => state.persistController.controller.matatu.id);
    if (!d) {
        d = 1;
    }
    useEffect(()=>{
        setLatestMusic(data)
    },[data])
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
                       
                       You'll be able to schedule your adverts on a route by route basis! Stay Tuned! 
                       </h5>
                    </div>
                </div>
            
            
            </div>
        </>
    );
}