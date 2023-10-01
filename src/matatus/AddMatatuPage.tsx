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
import ImageUpload from "./ImageUpload";
import { useEffect, useState } from "react";

interface registrationInput {
  name: string
  number_plate: string
  route: number
  number_of_seats: number
  driver : string
  is_trial?: boolean
  image_interior?: string
  image_exterior?: string
}

const schema = yup.object({
  name: yup.string().required(),
  number_plate: yup.string().required(),
  number_of_seats: yup.number().required(),
  route: yup.number().required(),
  is_trial: yup.boolean(),
  driver: yup.string().required(),
  image_exterior: yup.string(),
  image_interior: yup.string(),
}).required()

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

function AddMatatuModal({ isOpen, onClose }:{isOpen:boolean, onClose:()=>void}) {

  if (!isOpen) return null;

  // User bearer token
  const userToken = useAppSelector((state: RootState) => state.persistAuth.auth.access);

  const { handleSubmit, register } = useForm<registrationInput>({
    resolver: yupResolver(schema),
  })

  const [interiorImageUrl, setInteriorImageUrl] = useState<string>('');
  const [exteriorImageUrl, setExteriorImageUrl] = useState<string>('');

  const handleInteriorImage = (text: string) => {
    if (text !== null) {
      setInteriorImageUrl(text);
    }

  };

  const handleExteriorImage = (text: string) => {
    if (text !== null) {
      setExteriorImageUrl(text);
    }
  };

  const [displaySuccessNotification, setDisplaySuccessNotification] = useState<boolean>(false);

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
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [userToken]);

  const onSubmit: SubmitHandler<registrationInput> = async (data: registrationInput)=>{
    
    const authToken: string = `${userToken}`

    try {

      const userDataMain = {
        name : `${data.name}`,
        number_plate : `${data.number_plate}`,
        route : data.route,
        capacity : data.number_of_seats,
        driver : `${data.driver}`,
        image_exterior: `${exteriorImageUrl}`,
        image_interior: `${interiorImageUrl}`,
      }

      // Make a POST request using Axios
      const response = await axios.post('https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/create_matatu', userDataMain, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Response")

    } catch (error) {
      // Handle errors
      console.error('Error posting data:', error);
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
                      <div className="mb-3">
                        <input
                          type="text"
                          id="driver_username"
                          {...register("driver")}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Driver UserName"
                          required
                        />
                      </div>

                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <h4>Photo Interior</h4>
                        <ImageUpload onChildText={handleInteriorImage} />
                      </div>
                      <div className="flex flex-col">
                        <h4>Photo Exterior</h4>
                        <ImageUpload onChildText={handleExteriorImage} />
                      </div>
                    </div>
           

                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button data-modal-hide="staticModal" type="submit" className="text-white bg-universal-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
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
        displaySuccessNotification && 
        <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">Item successfully.</div>
          <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
      }
      
    </Backdrop>
  );
}

export default AddMatatuModal;
