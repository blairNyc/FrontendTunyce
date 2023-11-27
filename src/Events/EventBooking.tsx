import { useTicketCheckoutMutation} from "../app/api/GlobalApiSlice";
import * as yup from 'yup'

import { Label } from 'flowbite-react';

export const SuccessPopUp = ({ text, closeModal }: { text: string, closeModal: (val: boolean) => void }) => (
    <div className="w-screen bg-black-rgba overflow-hidden absolute h-screen top-0 left-0 z-50">
        <div className="p-4 relative flex flex-col items-center top-2/2 left-3/3 ml-20 mt-4 mb-4 text-sm w-1/3 text-green-800 rounded-2xl bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <AiOutlineClose onClick={closeModal} className="text-black text-2xl absolute mb-2 right-0 cursor-pointer font-bold" />
            <div className="m-2">
                <FiCheckCircle className="text-green-500 text-9xl" />
                <h5 className="block font-bold ">{text}</h5>
                <h5 className="">Once paid check your email for ticket details!</h5>
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
import {  useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EventPoster from "./components/EventPoster";



interface scheduleInput {
    name:string,
    email:string,
}

export default function EventBooking() {

    // const userToken: string | null = useAppSelector((state: RootState) => state.persistAuth.auth.access);
    const [phoneNo,setPhoneNo]=useState('');
    const [TicketCheckout, { error }] = useTicketCheckoutMutation();
    const [modalOpen,setModalOpen]=useState(false);
    
    const handleCloseModal = () =>{
        setModalOpen(false)
    }
 
    // const [switchContent, { isLoading: isLoadingSwitch, isSuccess, isError, error }] = useSwitchContentMutation()

    let d : number = useAppSelector((state: RootState) => state.persistController.controller.matatu.id);
    if (!d) {
        d = 1;
    }
    useEffect(()=>{




    },[])







        
    const schema = yup.object({
        
        name: yup.string().required(),
        email: yup.string().required(),

    }).required()

    const { handleSubmit, register, formState: { errors } } = useForm<scheduleInput>({
        resolver: yupResolver(schema),

    })

    console.log(errors)
    const onSubmit: SubmitHandler<scheduleInput> = async(data:scheduleInput) =>{

        const ticketData =  {
            name :data.name,
            email:data.email,
            phone:`+254${phoneNo}`,
            amount:2
           
        }

        try{
            const ticket= await TicketCheckout(ticketData).unwrap();
            setModalOpen(true)
            console.log(ticket)
        
        }catch{
            console.log('Error encountered: ', error)
        }

    }

    return (
        <>
            <div className="overflow-x-hidden relative p-50 overflow-y-scroll flex ">
                <div className="bg-white rounded-lg min-h-screen p-8 ml-4 mt-4 w-2/3">
                    <div className="text-red-600">
                        <h5 className=" sm:text-base md:text-xl lg:2xl">Fere Gola Tickets Checkout</h5>
                        
                               
                        
                    </div>
                        <form className="flex flex-col gap-4" 
                        onSubmit={handleSubmit(onSubmit)}
                        >

                          



                            <div>

                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="Name"
                                        value="Name"
                                    />
                                </div>
                                <input  
                                     {...register('name')}
                                     id="password" 
                                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name">
                    
                                </input>
                                <p className='text-red-900'></p>
                            </div>

                            <div>

                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="Email"
                                        value="Email"
                                    />
                                </div>
                                <input  
                                    {...register('email')}

                                    id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email">

                                </input>
                                <p className='text-red-900'></p>
                            </div>

                            <div className="mb-3">
                                  <label htmlFor="phone" className="text-sm font-bold text-gray-600 dark:text-gray-400">Mpesa Phone Number</label>
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


                            <button type="submit" className="focus:outline-none text-white  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Checkout</button>

                        </form>
                </div>
                <div className="ml-4 mt-4 w-1/3">
                    <EventPoster/>
                </div>
                {modalOpen && (
                <SuccessPopUp text="Check your phone for STK push!" closeModal={handleCloseModal} />
                )}
            
            </div>
        </>
    );
}