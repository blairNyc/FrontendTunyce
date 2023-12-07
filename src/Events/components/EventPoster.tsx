// import React, { useEffect, useState } from 'react';
// import Backdrop from '../../components/Backdrop';
// import {  usePayAdvertsMutation} from '../../components/controller/features';




// const EventPoster: React.FC = () => {

  
//   const [openModal,setOpenModal]=useState(false);
//   const [phoneNo,setPhoneNo]=useState('');
//   // const [payForSchedules,{isLoading:isLoadingPay}]  = usePayAdvertsMutation();

//   const toggleModal = ()=>{
//     setOpenModal(!openModal);
// }
    
//   useEffect(() =>{

 

//   })






//   return (
//     <>

//     {
//       openModal && (
//           <Backdrop >
//               <div className="fixed inset-0 flex items-center justify-center z-50">
//                   <div className="modal-container bg-white rounded-md mx-auto">
//                   {/* Add your modal content here */}
//                   <div id="staticModal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center">
//                       <div className="relative w-full mx-2 max-w-2xl max-h-full">

//                       <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

//                           <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
//                           <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                               Checkout
//                           </h3>
//                           <button type="button" onClick={toggleModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal"
//                               >
//                               <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//                               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
//                               </svg>
//                               <span className="sr-only">Close modal</span>
//                           </button>
//                           </div>

//                           <div className="p-6 space-y-6">
//                           {/* <form onSubmit={handlePay}  className="flex flex-col mr-5 ml-5" action="">
//                               <div className="mb-3">
//                                   <label htmlFor="phone" className="text-sm font-bold text-gray-600 dark:text-gray-400">Phone Number</label>
//                                   <div className="flex border-black rounded-lg items-center border mt-2">
//                                       <span className="text-sm p-2.5  font-bold text-gray-600 dark:text-gray-400">+254</span>
//                                       <input
//                                           type="number"
//                                           id="phone"
//                                           name="phone"
//                                           min={9}
//                                           onChange={(e)=>setPhoneNo(e.target.value)}
//                                           // max={9}
//                                           value={phoneNo}
//                                           className=" text-gray-900 border-r-2 rounded-tr-lg rounded-br-lg text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                           placeholder="712345678"
//                                           required
//                                       />
//                                   </div>
//                               </div>
//                               <div className="flex items-center p-2 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
//                               {isLoadingPay ? (
//                                   <button disabled data-modal-hide="staticModal" type="button" className="text-white bg-disabled-button-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">
//                                   <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
//                                       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
//                                   </svg>
//                                   Submitting...</button>
//                               ): (
//                                   <button data-modal-hide="staticModal" type="submit" className="text-white bg-universal-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
//                               )}
                              
//                               <button data-modal-hide="staticModal" type="button" onClick={toggleModal} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
//                               </div>
//                           </form> */}
//                           </div>                
//                       </div>
//                       </div>
//                   </div>
//                   </div>
//               </div>
//           </Backdrop>
//       )
//   }
//     <div className="bg-white p-4 rounded-lg">
//       <h2 className="font-semibold">Cart</h2>
//       <div className="mt-4 w-full flex flex-col gap-2">
//         {/* {schedules?.map((schedule) => ( */}
//           <div key={"fere"} className='w-full flex flex-row space-x-10 p-1 gap-2 border-b justfy-center align-center'>
//             {/* <img
//               src={schedule.advert.link}
//               alt={schedule.advert.link}
//               className="rounded-lg h-10 w-10"
//             /> */}
//             {/* <h3 className="font-semibold mt-2">{schedule.advert.title}</h3> */}
//             <p className='mt-2'>Fere Gola Tickets</p>
//             <p className='mt-2'>2000</p>
//           </div>
//         {/* ))} */}
        
//         <div className=" w-full md:w-4/5 px-2 ">
//           <div className="border-t border-y flex justify-between py-2">
//               <h2 className="text-xl font-bold bg text-universal-primary mb-2">Total</h2>
//               <h2 className="text-lg font-bold bg mb-2">2000 KES/=</h2>
//           </div>
//           </div>
      
       
//       </div>
  
      
//     </div>

//     </>
//   );
// };

// export default EventPoster;
