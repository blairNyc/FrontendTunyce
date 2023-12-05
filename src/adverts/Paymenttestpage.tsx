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
}

export default function PaymentTest() {

    const userToken: string | null = useAppSelector((state: RootState) => state.persistAuth.auth.access);
    // const [selectedAdvert, setSelectedAdvert] = useState('');
    // const [selectedSlot, setSelectedSlot] = useState('');
    // const [selectedRoute, setSelectedRoute] = useState('');
    const [token, setToken] = useState<string>('');
    const [AddSchedule, { error }] = useAddAdvertScheduleMutation();
    
    
   
 
    // const [switchContent, { isLoading: isLoadingSwitch, isSuccess, isError, error }] = useSwitchContentMutation()

    let d : number = useAppSelector((state: RootState) => state.persistController.controller.matatu.id);
    if (!d) {
        d = 1;
    }
    useEffect(()=>{

       

        const fetchAdvert = async () => {
           

            // try {
        
            //   const responseRoute = await axios.post('https://warm-journey-18609535df73.herokuapp.com/api/v1/wallet/carttest', {
            //     headers: {
            //       Authorization: `Bearer ${userToken}`,
            //     },
            //   });
        
            //   const data = responseRoute.data;
            //   console.log(data)

            // //   window.open('https://secure.3gdirectpay.com/dpopayment.php?ID=72983CAC-5DB1-4C7F-BD88-352066B71592')
        
            //   setAdverts(data.adverts)
            //   setRoutes(data.routes)
            //   setSlots(data.slots)
        
            // } catch (error) {
            //   console.error('Error fetching data:', error);
            // } finally {
            //   // Do nothing
            // }
      
            
        };

        // const fetchRoutes = async () => {
        //     try {
        
        //       const responseRoute = await axios.get('https://warm-journey-18609535df73.herokuapp.com/api/v1/region/routes/', {
        //         headers: {
        //           Authorization: `Bearer ${userToken}`,
        //         },
        //       });
        
        //       const data = responseRoute.data;
        //       console.log(data)
        
        //       setRoutes(data.message)
        
        //     } catch (error) {
        //       console.error('Error fetching data:', error);
        //     } finally {
        //       // Do nothing
        //     }
      
            
        // };
        
        
        fetchAdvert();
        // fetchRoutes();

    },[])





        
    const schema = yup.object({

    }).required()

    const { handleSubmit, formState: { errors } } = useForm<scheduleInput>({
        resolver: yupResolver(schema),

    })

    console.log(errors)
    const onSubmit: SubmitHandler<scheduleInput> = async(data:scheduleInput) =>{

        console.log(data)
        try {
        
            const responseRoute = await axios.post('https://warm-journey-18609535df73.herokuapp.com/api/v1/wallet/carttest', {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            });
      
            const data = responseRoute.data;
            console.log(responseRoute.data.transToken)
            setToken(data.transToken)

            window.open(`https://secure.3gdirectpay.com/dpopayment.php?ID=${token}`)
      
      
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            // Do nothing
          }
    
       

        const advertData =  {
            pricing_plan :1,
            numberofplayers:Number(numberOfMatatus) * Number(numberOfPlays),
            counter:0

        }

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
                    

      

                            <button type="submit" className="focus:outline-none text-white  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Checkout</button>

                        </form>
                </div>
                <div className="ml-4 mt-4 w-1/3">
                <button onClick={
                    async ()=>{
                        const responseRoute = await axios.post(`https://warm-journey-18609535df73.herokuapp.com/api/v1/wallet/verifypayment/${token}`, {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                        });
                
                        const data = responseRoute.data;
                        console.log(data)
                    
                    }
                } className="focus:outline-none text-white  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Confirm Payment</button>

                </div>
            
            </div>
        </>
    );
}