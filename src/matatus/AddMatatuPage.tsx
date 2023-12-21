/* eslint-disable react-hooks/rules-of-hooks */
// import { MdCloudUpload } from "react-icons/md";
// import { useCreateMatatuMutation } from "./state";
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import Backdrop from "../components/Backdrop";
import axios from 'axios';
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
// import ImageUpload from "./ImageUpload";
import { useEffect, useState } from "react";
import { IMatatuType } from '../types';
// import { Accept, useDropzone } from 'react-dropzone';
import React from 'react';

interface registrationInput {
  name: string
  number_plate: string
  route: number
  number_of_seats: number
  // driver : string
  is_trial?: boolean
}

const schema = yup.object({
  name: yup.string().required(),
  number_plate: yup.string().required(),
  number_of_seats: yup.number().required(),
  route: yup.number().required(),
  is_trial: yup.boolean(),
  
}).required();
  

interface Checkpoint {
  id: number;
  name: string;
}

interface Route {
  id: number;
  name: string;
  grade: string;
  checkpoint: Checkpoint[];
}

function AddMatatuModal({ isOpen, onClose, isRegistrationSuccessFull }: { isOpen: boolean, onClose: () => void, isRegistrationSuccessFull:(matatu:IMatatuType) => void}) {

  if (!isOpen) return null;

  // User bearer token
  const userToken = useAppSelector((state: RootState) => state.persistAuth.auth.access);

  const { handleSubmit, register } = useForm<registrationInput>({
    resolver: yupResolver(schema),
  })



 
  const [displayServerErrorNotification, setDisplayServerErrorNotification] = useState<boolean>(false)
  const [displayErrorNotification, setDisplayErrorNotification] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const [submitting, setSubmitting] = useState<boolean>(false)
  
  const handleServerErrorClosing = () => {
    setDisplayServerErrorNotification(false);
  }

  const handleErrorClosing = () => {
    setDisplayErrorNotification(false);
  }



  const [routes, setRoutes] = useState<Route[]>([]);

  const [selectedRouteId, setSelectedRouteId] = useState<number | ''>('');
  
  const handleRouteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRouteId(Number(event.target.value));
  };

  
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseRoute = await axios.get('https://warm-journey-18609535df73.herokuapp.com/api/v1/region/routes/', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const data = responseRoute.data.message;
        setRoutes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [userToken]);

  useEffect(() => {
    if(displayErrorNotification) {
      setTimeout(()=>{setDisplayErrorNotification(!displayErrorNotification)}, 3000 );
    }
    if(displayServerErrorNotification) {
      setTimeout(() => { setDisplayErrorNotification(!displayErrorNotification) }, 3000);
    }

  }, [displayErrorNotification, displayServerErrorNotification]);

  const onSubmit: SubmitHandler<registrationInput> = async (data: registrationInput)=>{
    console.log("submited")
    const authToken: string = `${userToken}`

    try {

      setSubmitting(true)

      const userDataMain:IMatatuType = {
        name : `${data.name}`,
        number_plate : `${data.number_plate}`,
        route : data.route,
        number_of_seats : data.number_of_seats,
        // driver : `${data.driver}`,
      }

      // Make a POST request using Axios
      await axios.post('https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/create_matatu', userDataMain, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then(response => {
        if(response.status == 201) {
          setSubmitting(false)
          isRegistrationSuccessFull(userDataMain)
          close()
        }
      }
        ).catch( error => {
          setSubmitting(false)

          if (error.response.status == 500) {
            setSubmitting(false)
            setDisplayServerErrorNotification(true)
          } else {
            console.log(error.response.status)

            const errorData: object | unknown = Object.values(error.response.data)[0]
            const typedResponse = errorData as { data?: { error?: { [key: string]: unknown } } };
            for (const [key, value] of Object.entries(typedResponse)) {
              console.log(`Key: ${key}, Value: ${value}`);
              setErrorMessage(`${value}`)
            }
            setDisplayErrorNotification(true)
          }}

          )

    } catch (error: unknown) {
        setSubmitting(false)     
    }
  }

  return (
    <Backdrop>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-container bg-white rounded-md mx-auto">
          {/* Add your modal content here */}
          <div id="staticModal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center">
            <div className="relative w-full max-w-2xl max-h-full">

              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    New Matatu
                  </h3>
                  <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal"
                    >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mr-5 ml-5" action="">
                    <div className="grid grid-cols-2 gap-4 ">
                      <div className="mb-3">
                        <input
                          type="text"
                          id="name"
                          {...register("name")}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Name"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          id="plate"
                          {...register("number_plate")}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Number of Plate"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <select
                          id="route"
                          {...register("route")}
                          value={selectedRouteId}
                          onChange={(e) => {
                            handleRouteChange(e);
                          }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="" label="Select a route" />
                          {Array.isArray(routes) && routes.map((route) => (
                            <option key={route.id} value={route.id} label={route.name} />
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          id="seats"
                          {...register("number_of_seats")}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Number of Seats"
                          required
                        />
                      </div>
                      {/* <div className="mb-3">
                        <input
                          type="text"
                          id="driver_username"
                          {...register("driver")}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Driver UserName"
                          required
                        />
                      </div> */}

                    </div>
                  
           

                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                      {submitting ? (
                        <button disabled data-modal-hide="staticModal" type="button" className="text-white bg-disabled-button-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                          </svg>
                          Submitting...</button>
                      ): (
                          <button data-modal-hide="staticModal" type="submit" className="text-white bg-universal-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                      )}
                      
                      <button data-modal-hide="staticModal" type="button" onClick={onClose} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
                    </div>
                  </form>
                </div>                
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {
        displayServerErrorNotification && 
        <div className="absolute right-10 top-10 z-50">
            <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
                <span className="sr-only">Error icon</span>
              </div>
              <div className="ml-3 text-sm font-normal">Something went wrong, try again later.</div>
              <button type="button" onClick={handleServerErrorClosing} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>
          </div>
      }
      
      {
        displayErrorNotification &&
        <div className="absolute right-10 top-10 z-50">
          <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
              <span className="sr-only">Error icon</span>
            </div>
              <div className="ml-3 text-sm font-normal">{errorMessage}</div>
              <button type="button" onClick={handleErrorClosing} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        </div>
      }

    </Backdrop>
  );
}

// const dropzoneStyle = (isDragActive: boolean) => `
//   border-2 ${isDragActive ? 'border-green-500' : 'border-gray-300'} 
//   border-dashed rounded p-8 text-center cursor-pointer`;

export default AddMatatuModal;
