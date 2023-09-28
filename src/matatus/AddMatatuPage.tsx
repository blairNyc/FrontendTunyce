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
  driver : string,
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
  image_interior: yup.string()
}).required()
function AddMatatuModal({ isOpen, onClose }:{isOpen:boolean, onClose:()=>void}) {

  if (!isOpen) return null;

  // User bearer token
  const userToken = useAppSelector((state: RootState) => state.persistAuth.auth.access);

  const { handleSubmit, register } = useForm<registrationInput>({
    resolver: yupResolver(schema),
  })
  // const [createMat] = useCreateMatatuMutation();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseRoute = await axios.get('https://warm-journey-18609535df73.herokuapp.com/api/v1/region/routes/', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const data = responseRoute.data;
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // return () => {
    //   // Cleanup code here
    // };
  }, [userToken]);

  const onSubmit: SubmitHandler<registrationInput> = async (data: registrationInput)=>{
    
    const authToken: string = `${userToken}`

    try {

      console.log(data);

      // name: string
      // number_plate: string
      // route: number
      // number_of_seats: number
      // driver: string,
      // is_trial ?: boolean
      // image_interior ?: string
      // image_exterior ?: string


      const userDataMain = {
        name : `${data.name}`,
        number_plate : `${data.number_plate}`,
        route : data.route,
        capacity : data.number_of_seats,
        driver : `${data.driver}`,
        image_exterior: `${exteriorImageUrl}`,
        image_interior: `${interiorImageUrl}`,
      }

      console.log(userDataMain)

      // const userData = {
      //   "name": "Everything Fishv1",
      //   "number_plate": "kfmvkfvk",
      //   "number_of_seats": 12,
      //   "image_exterior": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      //   "image_interior": "https://plus.unsplash.com/premium_photo-1661589586735-c5f07b7da1fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      //   "driver": "tester5",
      //   "capacity": "42"
      // }


      // Make a POST request using Axios
      const response = await axios.post('https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/create_matatu', userDataMain, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // const routeResponse = await axios.post('https://warm-journey-18609535df73.herokuapp.com/api/v1/region/routes/', userDataMain, {
      //   headers: {
      //     Authorization: `Bearer ${authToken}`,
      //   },
      // });

      // console.log(routeResponse)
      
      console.log('POST Response:', response);
      console.log(response.data)


    } catch (error) {
      // Handle errors
      console.error('Error posting data:', error);


    }
  }


  
  // const handleClickForCreate = async () => {
  //   console.log("Cliccckede")

  //   const authToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1ODQ2NjI4LCJpYXQiOjE2OTU4NDQ4MjgsImp0aSI6IjRiN2Y2N2M4ZjliMzQyNTM4MTMzY2M5NmNlMTgzNWUzIiwidXNlcl9pZCI6MTN9.4yL6qIHJaID6NideBqTCGeBLYvt6g-NABhXQZOuHmbo"

  //   try {

  //     const userData = {
  //       "name": "Everything Fishv1",
  //       "number_plate": "kfmvkfvk",
  //       "number_of_seats": 12,
  //       "image_exterior": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  //       "image_interior": "https://plus.unsplash.com/premium_photo-1661589586735-c5f07b7da1fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  //       "driver": "tester5",
  //       "capacity": "42"
  //     }
      

  //     // Make a POST request using Axios
  //     const response = await axios.post('https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/create_matatu', userData, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });
  //     // Log the response
  //     console.log('POST Response:', response);
  //     console.log(response.data)

     
  //   } catch (error) {
  //     // Handle errors
  //     console.error('Error posting data:', error);

  //   }
  // };

  // Images
  
  
  


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
                        <input
                          type="text"
                          id="route"
                          {...register("route")}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Route"
                          required
                        />
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
    </Backdrop>
  );
}

export default AddMatatuModal;
