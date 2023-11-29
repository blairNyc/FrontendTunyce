import { useGetTicketReportsQuery} from "../app/api/GlobalApiSlice";
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

interface Report {

    name?: string;  
    email?: string;
    is_paid?: boolean;
    // Other properties...
  }

const Ticket: React.FC<{ report: Report }> = ({ report })  => (
  <div
    //  onClick={() => { onClick(media.id) }}
    className="container bg-white cursor-pointer hover:bg-slate-200 shadow-md w-full rounded-lg p-1 mt-2 p-5 flex items-center justify-between"
    >
   

        <h4 className="sm:text-xs md:text-sm lg:text-md text-gray-600">
            {report.name}
        </h4>
         <h4 className="sm:text-xs md:text-sm lg:text-md text-gray-600">
            {report.email}
        </h4>
        <h4 className="sm:text-xs md:text-sm lg:text-md text-gray-600">
            ksh {2000}
        </h4>
        {/* <h4 className="sm:text-xs md:text-sm lg:text-md text-gray-600">
            {report.schedule.id}
        </h4> */}
        
    {/* <div className="flex items-center ">
        <button className="sm:text-xs md:text-sm lg:text-base sm:mr-8 md:mr-8 lg:mr-10">
            <BiDotsVerticalRounded />
        </button>
    </div> */}
</div>

);


// import { ErrorType } from "../../types";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { AiOutlineClose } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import { LoadingSkeleton } from "../components/LoadingSkeletonList";
export default function TicketReportPage() {
    const { data, isError: isErrorReportFetch, isLoading } = useGetTicketReportsQuery(1);
    const [RetrivedReports,setRetrivedReports] = useState(data)
 
    // const [switchContent, { isLoading: isLoadingSwitch, isSuccess, isError, error }] = useSwitchContentMutation()

    let d : number = useAppSelector((state: RootState) => state.persistController.controller.matatu.id);
    if (!d) {
        d = 1;
    }
   
    useEffect(()=>{
        setRetrivedReports(data)
        console.log(data)
    },[data])
   
    console.log(RetrivedReports);
    return (
        <>
            <div className="overflow-x-hidden relative overflow-y-scroll">
                <div className="flex justify-between">
                    <div className="text-red-600">
                        <h5 className=" sm:text-base md:text-xl lg:2xl">Streaming Tickets Booked</h5>
                    </div>
                    <div className="flex gap-x-5 text-red-600">
                       
                    </div>
                </div>
            
                {
                    isLoading ? (
                        [1, 2, 3].map((id) => (
                            <div className="ml-10 mr-10 mx-auto mt-5 flex flex-col">
                                <LoadingSkeleton key={id} />
                            </div>
                        ))
                    ) :
                     (
                        <div className="ml-10 mr-10 mx-auto mt-5 flex flex-col">
                            <div className="text-red-600">
                                <h5 className=" sm:text-base md:text-xl lg:2xl">Grand Total</h5>
                            </div>
                            <div className="flex gap-x-5 text-red-600">
                               {RetrivedReports?.length > 0 &&  <h5 className=" sm:text-base md:text-xl lg:2xl">ksh {Number(RetrivedReports?.length) * 2000}</h5> }
                               
                            </div>
                            
                        {RetrivedReports && RetrivedReports?.map((report: Report) => (
                            <Ticket
                                report= {report}
                               
                            />
                        ))}
                        {
                            !data && isErrorReportFetch&&(
                                <div>
                                    <h1>No reports yet! If you suspect there is a problem with is please reload or contact us.</h1>
                                </div>
                            )
                        }
                    </div>
                    )
                } 
            </div>
        </>
    );
}