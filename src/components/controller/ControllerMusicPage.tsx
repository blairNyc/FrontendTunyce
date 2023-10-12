import { BiShuffle, BiDotsVerticalRounded } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import { useGetLatestMusicQuery } from "../../app/api/GlobalApiSlice";
import { LoadingSkeleton } from "../LoadingSkeletonList";
import { useSwitchContentMutation } from "./features";
interface MusicItPrp extends MusicItemProp {
    onClick: (mediaUrl: string | number) => void
}
export const SuccessPopUp = ({ text, closeModal }: { text: string, closeModal: (val: boolean) => void }) => (
    <div className="w-screen bg-black-rgba overflow-hidden absolute h-screen top-0 left-0">
        <div className="p-4 relative flex flex-col items-center top-1/2 left-1/3 mb-4 text-sm w-1/3 text-green-800 rounded-2xl bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <AiOutlineClose onClick={closeModal} className="text-black text-2xl absolute mb-2 right-0 cursor-pointer font-bold" />
            <div className="m-2">
                <FiCheckCircle className="text-green-500 text-9xl" />
                <h5 className="block font-bold ">{text}</h5>
            </div>
        </div>
    </div>
)
const MusicItem = ({ name, onClick, media, video_thumbnail, owner }: MusicItPrp) => (
    <div onClick={() => { onClick(media.id) }} className=" container bg-white cursor-pointer hover:bg-slate-200 shadow-md w-full rounded-lg p-1 mt-2 flex  items-center justify-between">
        <div className="flex">
            <img src={video_thumbnail} alt="" className=" sm:w-10 md:w-14 lg:w-16 sm:h-10 md:h-14 lg:h-16 rounded-sm " />
            <div className="ml-4">
                <h4 className="sm:text-sm md:text-md lg:text-lg font-semibold">
                    {name.slice(0, 20) ?? 'Music Name'}
                </h4>
                <h6 className="sm:text-xs md:text-sm lg:text-md text-gray-600">
                    {owner.username ?? 'Artist Name'}
                </h6>
            </div>
        </div>
        <div className="flex items-center ">
            <button className=" sm:text-xs md:text-sm lg:text-base sm:mr-8 md:mr-8 lg:mr-10">
                <BiDotsVerticalRounded />
            </button>
        </div>
    </div>
);
interface MusicItemProp {
    name: string;
    description: string;
    id: number;
    media: {
        id: number
        media_url: string
    }
    owner: {
        id: number
        username: string
        email: string
    }
    video_thumbnail: string,
}
import LoadingSpinner from "../LoadingSpinner";
import { SnackBar } from "../auth/userLogin";
// import { ErrorType } from "../../types";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { AiOutlineClose } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import React from "react";
export default function ControllerMusicPage() {
    const { data, isError: isErrorMusicFetch, isLoading } = useGetLatestMusicQuery(1);
    console.log(data)
    // const [switchContent, { isLoading: isLoadingSwitch, isSuccess, isError, error }] = useSwitchContentMutation()

    const [switchContent, { isLoading: isLoadingSwitch, isSuccess, isError, error }] = useSwitchContentMutation()
    let d = useAppSelector((state: RootState) => state.persistController.controller.matatu.id);
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
    return (
        <>
            {isLoadingSwitch && <LoadingSpinner />}
            {isError &&
                <SnackBar text={'Error encountered'} />
            }
            {
                isErrorMusicFetch && (
                    <SnackBar text={
                        // (error as ErrorType).data?.message ?? 
                        'Error encountered'} />
                )
            }
            {isSuccess && openModal && <SuccessPopUp closeModal={() => { setOpenModal(!openModal) }} text={'Music switched successfully'} />}
            <div className="overflow-x-hidden overflow-y-scroll">
                <div className="flex justify-between">
                    <div className="text-red-600">
                        <h5 className=" sm:text-base md:text-xl lg:2xl">My Music</h5>
                    </div>
                    <div className="flex gap-x-5 text-red-600">
                        <div className="flex">
                            <button className=" sm:text-sm md:text-md lg:text-md">
                                <BsFillPlayFill />
                            </button>
                            <button className=" sm:text-sm md:text-md lg:text-md ml-1">
                                Play
                            </button>
                        </div>
                        <div className="flex mr-2">
                            <button className="sm:text-sm md:text-md lg:text-md">
                                <BiShuffle />
                            </button>
                            <button className="sm:text-sm md:text-md lg:text-md ml-1">
                                Shuffle
                            </button>
                        </div>
                    </div>
                </div>
                {
                    isLoading ? (
                        [1, 2, 3].map((id) => (
                            <div className="ml-10 mr-10 mx-auto mt-5 flex flex-col">
                                <LoadingSkeleton key={id} />
                            </div>
                        ))
                    ) : (<div className="ml-10 mr-10 mx-auto mt-5 flex flex-col">
                        {data?.map((music: MusicItemProp | undefined, id: number) => (
                            <MusicItem
                                video_thumbnail={music?.video_thumbnail ? music?.video_thumbnail.includes('tunyce') ? 'https://images.unsplash.com/photo-1653361953232-cd154e54beff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fHRyZW5kaW5nJTIwbWl4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' : music?.video_thumbnail : ''}
                                name={music?.name ? music.name : ''}
                                description={music?.description ? music?.description : 'Music Description'}
                                id={music?.id ? music.id : 0}
                                media={music?.media ? music.media : {
                                    id: music?.media?.id ? music.media.id : 0,
                                    media_url: music?.media.media_url ? music.media.media_url : ''
                                }}
                                onClick={handleSwitchContent}
                                owner={music?.owner ? music.owner : { email: '', id: Math.floor((Math.random() * 100) + 1), username: '' }}
                                key={id ? id : Math.floor((Math.random() * 1000) + 1)}
                            />
                        ))}
                    </div>)
                }
            </div>
        </>
    );
}