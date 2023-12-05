
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
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";





export default function PaymentConfirm() {
   
   
 
    // const [switchContent, { isLoading: isLoadingSwitch, isSuccess, isError, error }] = useSwitchContentMutation()
    const userToken: string | null = useAppSelector((state: RootState) => state.persistAuth.auth.access);
    const [paid, setPaid] = useState(false);
    
    let d : number = useAppSelector((state: RootState) => state.persistController.controller.matatu.id);
    if (!d) {
        d = 1;
    }


    useEffect(() => {
        // Get the current URL
        const currentUrl = window.location.href;
    
        // Parse the URL and get the search parameters
        const urlSearchParams = new URLSearchParams(currentUrl);
    
        // Get the value of the 'TransactionToken' parameter
        const transactionToken = urlSearchParams.get('TransactionToken');
    
        // Do something with the transactionToken value
        console.log('TransactionToken:', transactionToken);
        const confirmPaid = async () => 
        {
        const responseRoute = await axios.post(`https://warm-journey-18609535df73.herokuapp.com/api/v1/wallet/verifypayment/${transactionToken}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
            });
    
            const data = responseRoute.data;
            console.log(data)

            if(data.success){
                setPaid(true)
            }else{
                setPaid(false)
            }
        };

        confirmPaid()
        // You can use the transactionToken in your component or dispatch it to your Redux store, etc.
      }, []); // The empty dependency array ensures that this effect runs once when the component mounts
    




    return (
    
        <>
            <div className="overflow-x-hidden relative p-50 overflow-y-scroll flex">
            <div className="bg-white rounded-lg min-h-screen p-8 ml-4 mt-4 w-2/3">
                {/* Rest of your component code */}
                {paid && (
                <div className="text-green-600">
                    <h5 className="sm:text-base md:text-xl lg:2xl">Payment Received!</h5>
                </div>
                )}

            {!paid && (
                <div className="text-green-600">
                    <h5 className="sm:text-base md:text-xl lg:2xl">Payment Unsuccessful!</h5>
                </div>
                )}
            </div>
            {/* Rest of your component code */}
            </div>
        </>
        );
    }