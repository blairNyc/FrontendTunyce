import { BiShuffle, BiDotsVerticalRounded } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import { useGetGenresQuery, useGetLatestMusicQuery } from "../../app/api/GlobalApiSlice";
import { LoadingSkeleton } from "../LoadingSkeletonList";
import {  usePayBundlesMutation, useSwitchContentMutation } from "./features";
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
const MusicItem = ({ name, onClick, media, video_thumbnail, owner }: MusicItPrp) => (
    <div onClick={() => { onClick(media.id) }} className="container bg-white cursor-pointer hover:bg-slate-200 shadow-md w-full rounded-lg p-1 mt-2 flex items-center justify-between">
    <div className="flex">
        <img src={video_thumbnail} alt="" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-sm" />
        <div className="ml-4">
            <h4 className="text-md font-semibold sm:text-lg md:text-xl lg:text-2xl">
                {name.slice(0, 20) ?? 'Music Name'}
            </h4>
            <h6 className="text-sm text-gray-600 sm:text-md md:text-lg lg:text-xl">
                {owner.username ?? 'Artist Name'}
            </h6>
        </div>
    </div>
    <div className="flex items-center">
        <button className="text-sm sm:text-md md:text-lg lg:text-xl mr-8">
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
import LoadingSpinner from "../LoadingSpinner";
import { SnackBar } from "../auth/userLogin";
// import { ErrorType } from "../../types";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { AiOutlineClose } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import Backdrop from "../Backdrop";
import axios from "axios";
export default function ControllerMusicPage() {
    const { data, isError: isErrorMusicFetch, isLoading } = useGetLatestMusicQuery(1);
    const [latestMusic,setLatestMusic] = useState(data)
    // const {data:genres,isLoading:isLoadingGenres} = useGetGenresQuery(1);    
    const [payForBundles,{isLoading:isLoadingPay}]  = usePayBundlesMutation();
    const [phoneNo,setPhoneNo]=useState(''); 
   
    
    // console.log(data,isLoadingGenres)
    // const [switchContent, { isLoading: isLoadingSwitch, isSuccess, isError, error }] = useSwitchContentMutation()

    const [switchContent, { isLoading: isLoadingSwitch, isSuccess, isError }] = useSwitchContentMutation()
    let d : number = useAppSelector((state: RootState) => state.persistController.controller.matatu.id);
    if (!d) {
        d = 1;
    }

   
    const [openModal, setOpenModal] = React.useState(false);
    
    const [openBundleModal, setOpenBundleModal] = React.useState(false);
   
 
    
    async function handlePay(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const phoneData = {
            phone: `+254${phoneNo}`,
            amount:150,
            matId:d
        }
        console.log(phoneData);
        try {
            const response = await payForBundles(phoneData).unwrap();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    

    
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


    const checkBundlesPaid = async () => {
        console.log(d)
        try {
    
          const responseRoute = await axios.get(`https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/bundles/checkpayment/${d}/`, {
         
          });
    
          const data = responseRoute.data;
          if(data.advertPaid == false){
            setOpenBundleModal(false)
          }else{
            setOpenBundleModal(false)
          }
        //   console.log("Testins")
          console.log(data)
    
    
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          // Do nothing
        }
  
        
      };

    useEffect(()=>{
        setLatestMusic(data)

        
          
        checkBundlesPaid();




    },[data])
    const handleSelect = async(e: React.ChangeEvent<HTMLSelectElement>)=>{
        setLatestMusic(data?.filter((mus)=>mus?.genres?.id===parseInt(e.target.value)))
    }
    console.log(latestMusic);
    return (
        <>

            {

                openBundleModal && (
                    <Backdrop >
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="modal-container bg-white rounded-md mx-auto">
                            {/* Add your modal content here */}
                            <div id="staticModal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center">
                                <div className="relative w-full mx-2 max-w-2xl max-h-full">

                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Pay ksh 150 For Mat Bundles
                                    </h3>
                                    <h6>Click "Confirm" once once paid</h6>
                                    {/* <button type="button" onClick={toggleModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal"
                                        >
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button> */}
                                    </div>

                                    <div className="p-6 space-y-6">
                                    <form onSubmit={handlePay}  className="flex flex-col mr-5 ml-5" action="">
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="text-sm font-bold text-gray-600 dark:text-gray-400">Phone Number</label>
                                            <div className="flex border-black rounded-lg items-center border mt-2">
                                                <span className="text-sm p-2.5  font-bold text-gray-600 dark:text-gray-400">+254</span>
                                                <input
                                                    type="number"
                                                    id="phone"
                                                    name="phone"
                                                    min={9}
                                                    onChange={(e)=>setPhoneNo(e.target.value)}
                                                    // max={9}
                                                    value={phoneNo}
                                                    className=" text-gray-900 border-r-2 rounded-tr-lg rounded-br-lg text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="712345678"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center p-2 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        {isLoadingPay ? (
                                            <button disabled data-modal-hide="staticModal" type="button" className="text-white bg-disabled-button-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                            Submitting...</button>
                                        ): (
                                            <button data-modal-hide="staticModal" type="submit" className="text-white bg-universal-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                        )}
                                        
                                        <button data-modal-hide="staticModal" type="button" onClick={checkBundlesPaid} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Confirm</button>
                                        </div>
                                    </form>
                                    </div>                
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </Backdrop>
                )
                
            }


            {isLoadingSwitch && <LoadingSpinner />}
            {isError &&
                <SnackBar text={'Error encountered'} />
            }
            {isSuccess && openModal && <SuccessPopUp closeModal={() => { setOpenModal(!openModal) }} text={'Music switched successfully'} />}
            <div className="overflow-x-hidden relative overflow-y-scroll">
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
                {/* <div className="m-2"> */}
                    {/* <label htmlFor="countries" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Filter Songs by genres</label> */}
                    {/* <select id="countries" onChange={handleSelect} className="bg-gray-50 border-2 border-gray-700 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-4/5 md:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option className="" selected>Select Genre</option>
                        {
                            genres && genres.map((genreInfo)=>(
                                <option value={genreInfo.id}>{genreInfo.name}</option>
                            ))
                        }
                    </select> */}
                {/* </div> */}
                {
                    isLoading ? (
                        [1, 2, 3].map((id) => (
                            <div className="ml-10 mr-10 mx-auto mt-5 flex flex-col">
                                <LoadingSkeleton key={id} />
                            </div>
                        ))
                    ) : (<div className="ml-10 mr-10 mx-auto mt-5 flex flex-col">
                        {latestMusic && latestMusic?.map((music: MusicItemProp | undefined, id: number) => (
                            <MusicItem
                                genres={music?.genres?music.genres:{description:'',id:0,name:'',genreId:0,image:''}}
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
                        {
                            !data && isErrorMusicFetch&&(
                                <div>
                                    <h1>Reload the screen, poor connectivity</h1>
                                </div>
                            )
                        }
                    </div>)
                }
            </div>
        </>
    );
}