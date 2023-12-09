import {useAddAdvertScheduleMutation} from "../app/api/GlobalApiSlice";
import * as yup from 'yup'

import { Label } from 'flowbite-react';

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
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Cart from "./components/Cart";


interface AdvertData {
    id: number;
    title: string;
    type: string;
    link: string;
    
}

interface RouteData {
    id: number;
    name: string;
    type: string;
    link: string;
    
}

interface scheduleInput {
    selectedAdvert:string,
    selectedRoute:string,
    selectedSlot:string,
}

export default function AdvertOrderPage() {

    const userToken: string | null = useAppSelector((state: RootState) => state.persistAuth.auth.access);
    const [adverts, setAdverts] = useState<AdvertData[]>();
    const [routes, setRoutes] = useState<RouteData[]>();
    const [slots, setSlots] = useState<RouteData[]>();
    // const [selectedAdvert, setSelectedAdvert] = useState('');
    // const [selectedSlot, setSelectedSlot] = useState('');
    // const [selectedRoute, setSelectedRoute] = useState('');
    const [numberOfMatatus, setNumberOfMatatus] = useState<number | ''>(''); // Use 'number | ""' to allow for empty string as initial state
    const [numberOfPlays, setNumberOfPlays] = useState<number | ''>(''); // Use 'number | ""' to allow for empty string as initial state
    const [effectiveStartDate, setEffectiveStartDate] = useState<string>('');
    const [effectiveEndDate, setEffectiveEndDate] = useState<string>('');
    const [AddSchedule, { error }] = useAddAdvertScheduleMutation();
    
    
   
 
    // const [switchContent, { isLoading: isLoadingSwitch, isSuccess, isError, error }] = useSwitchContentMutation()

    let d : number = useAppSelector((state: RootState) => state.persistController.controller.matatu.id);
    if (!d) {
        d = 1;
    }
    useEffect(()=>{


        const fetchAdvert = async () => {
            try {
        
              const responseRoute = await axios.get('https://warm-journey-18609535df73.herokuapp.com/api/v1/adverts/schedules/create/', {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              });
        
              const data = responseRoute.data;
              console.log(data)
        
              setAdverts(data.adverts)
              setRoutes(data.routes)
              setSlots(data.slots)
        
            } catch (error) {
              console.error('Error fetching data:', error);
            } finally {
              // Do nothing
            }
      
            
        };

        // Get the current URL
        const currentUrl = window.location.href;

        // Parse the URL and get the search parameters
        const urlSearchParams = new URLSearchParams(currentUrl);
    
        // Get the value of the 'TransactionToken' parameter
        const transactionToken = urlSearchParams.get('TransactionToken');
    
        const confirmPaid = async () => 
        {
        const responseRoute = await axios.post(`https://warm-journey-18609535df73.herokuapp.com/api/v1/wallet/verifyadvertpayment/${transactionToken}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
            });
    
            const data = responseRoute.data;
            console.log(data)

            // if(data.success){
            //     setPaid(true)
            // }else{
            //     setPaid(false)
            // }
        };

        confirmPaid()
        
        
        fetchAdvert();
        // fetchRoutes();

    },[])




    // const handleAdvertChange = (event: ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedAdvert(event.target.value);
    //     // You can perform additional actions based on the selected value if needed
    // };

    // const handleSlotChange = (event: ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedSlot(event.target.value);
    //     // You can perform additional actions based on the selected value if needed
    // };

    
    // const handleRouteChange = (event: ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedRoute(event.target.value);
    //     // You can perform additional actions based on the selected value if needed
    // };

    const handleNumberOfMatatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const parsedValue = inputValue === '' ? '' : parseInt(inputValue, 10);

        setNumberOfMatatus(parsedValue);
        // You can perform additional actions based on the input value if needed
    };

    const handleNumberOfPlaysChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const parsedValue = inputValue === '' ? '' : parseInt(inputValue, 10);

        setNumberOfPlays(parsedValue);
        // You can perform additional actions based on the input value if needed
    };

    const handleEffectiveStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEffectiveStartDate(event.target.value);
        // You can perform additional actions based on the selected value if needed
    };

    const handleEffectiveEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEffectiveEndDate(event.target.value);
        // You can perform additional actions based on the selected value if needed
    };



    // const calculateSchedulePrice = ()=>{
    //     return(numberOfMatatus * numberOfPlays * 45)
    // }


        
    const schema = yup.object({
        
        selectedAdvert: yup.string().required(),
        selectedRoute: yup.string().required(),
        selectedSlot: yup.string().required(),

    }).required()

    const { handleSubmit, register, formState: { errors } } = useForm<scheduleInput>({
        resolver: yupResolver(schema),

    })

    console.log(errors)
    const onSubmit: SubmitHandler<scheduleInput> = async(data:scheduleInput) =>{

        const advertData =  {
            slot: data.selectedSlot,
            route:data.selectedRoute,
            pricing_plan :1,
            advert:data.selectedAdvert,
            numberofplayers:Number(numberOfMatatus) * Number(numberOfPlays),
            counter:0

        }
        console.log(advertData)

        try{
            const schedule = await AddSchedule(advertData).unwrap();
            console.log(schedule)
        
        }catch{
            console.log('Error encountered: ', error)
        }

    }

    return (
        <>
            <div className="overflow-x-hidden relative p-50 overflow-y-scroll flex ">
                <div className="bg-white rounded-lg min-h-screen p-8 ml-4 mt-4 w-2/3">
                    <div className="text-red-600">
                        {/* <h5 className=" sm:text-base md:text-xl lg:2xl">Advert Scheduling Form</h5> */}
                    </div>
                        <form className="flex flex-col gap-4" 
                        onSubmit={handleSubmit(onSubmit)}
                        >

                            <div>
                            <div className="mb-2 block">
                                    <Label
                                        htmlFor="Select Advert"
                                        value="Select Advert"
                                    />
                                </div>
                                
                                <select 
                                    // value={selectedAdvert}
                                    // onChange={handleAdvertChange}
                                    className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
                            
                                    {...register('selectedAdvert')}
                                >
                                    {adverts?.map((advert) => (
                                    <option key={advert.id} value={advert.id}>
                                        {advert.title}
                                    </option>
                                    ))}
                                </select>
                                {/* <p>{errors.genreId?.message}</p> */}
                            </div>



                            <div>

                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="Number of Matatus"
                                        value="Number of Matatus"
                                    />
                                </div>
                                <input  
                                
                                    onChange={handleNumberOfMatatusChange} type="number" value={numberOfMatatus} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Number of Matatus">
                    
                                </input>
                                <p className='text-red-900'></p>
                            </div>

                            {/* <div>

                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="Number of Slots Per Matatu"
                                        value="Number of Slots Per Matatu"
                                    />
                                </div>
                                <input  

                                    onChange={handleNumberOfPlaysChange} type="number" value={numberOfPlays} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Number of Matatus">

                                </input>
                                <p className='text-red-900'></p>
                            </div>
                            */}

                            <div>
                                 <Label
                                        htmlFor="Slot"
                                        value="Slot"
                                    />
                                <select 
                                // value={selectedSlot}
                                // onChange={handleSlotChange}
                                className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
                                {...register('selectedSlot')}
                                >
                                    {slots?.map((slot) => (
                                    <option key={slot.id} value={slot.id}>
                                        {slot.name}
                                    </option>
                                    ))}
                                </select>
                                {/* <p>{errors.genreId?.message}</p> */}
                            </div>

                            <div>
                                
                            <Label
                                        htmlFor="Route of Choice"
                                        value="Route of Choice"
                                    />
                                
                                <select 
                                
                                    // value={selectedRoute}
                                    // onChange={handleRouteChange}
                                    {...register('selectedRoute')}
                                    className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
                                >
                                    {routes?.map((route) => (
                                    <option key={route.id} value={route.id}>
                                        {route.name}
                                    </option>
                                    ))}
                                </select>
                                {/* <p>{errors.genreId?.message}</p> */}
                            </div>

                            



                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="effectiveStartDate"
                                        value="Effective Start Date"
                                    />
                                </div>
                                <input
                                    value={effectiveStartDate}
                                    onChange={handleEffectiveStartDateChange}
                                    type="date"
                                    id="effectiveStartDate"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Effective Start Date"
                                />
                                <p className='text-red-900'></p>
                            </div>

                            
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="effectiveEndDate"
                                        value="Effective End Date"
                                    />
                                </div>
                                <input
                                    
                                    value={effectiveEndDate}
                                    onChange={handleEffectiveEndDateChange}
                                    type="date"
                                    id="effectiveEndDate"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Effective End Date"
                                />
                                <p className='text-red-900'></p>
                            </div>


                            <button type="submit" className="focus:outline-none text-white  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Add To Cart</button>

                        </form>
                </div>
                <div className="ml-4 mt-4 w-1/3">
                    <Cart />
                </div>
            
            </div>
        </>
    );
}